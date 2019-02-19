/**
 * Imports
 */
// Misc
const md5 = require("md5");

// Inner
const couch = require("../helpers/couch.serv.js");
const { _usersPrefix } = require("../helpers/misc.var");

/**
 * Config
 */

/**
 * Exists
 */
exports.exists = async ({ name, email }) => {
  let ok = false,
    result;

  const options = {
    db: "_users",
    doc: "_find",
    body: {
      selector: {
        $or: [{ _id: `${_usersPrefix}:${name}` }, { email: email }]
      },
      fields: ["_id", "email"],
      limit: 2
    },
    admin: true
  };

  try {
    result = await couch.post(options);
    result = result.docs;
  } catch (error) {
    return { ok, error };
  }

  ok = result.length > 0;

  let msg, status;
  // User does not exists
  if (!ok) {
    status = 404;
    msg = "user does not exists";
  } else {
    // User exists
    let exist = { mail: false, name: false };

    for (const doc of result) {
      if (doc._id === `${_usersPrefix}:${name}`) exist.name = true;
      if (doc.email === email) exist.email = true;
    }

    status = 409;
    if (exist.name && exist.email) {
      msg = "name and email already exist";
    } else if (exist.name) {
      msg = "name already exists";
    } else {
      msg = "email already exists";
    }
  }

  return { ok, status, msg };
};

/**
 * GetWithCookie
 */
exports.getWithCookie = async ({ cookies }) => {
  let ok = false,
    result,
    status = 422,
    msg = "auth cookie not provided";

  if (cookies.AuthSession) {
    const options = {
      db: "_session",
      authCookie: cookies.AuthSession
    };

    try {
      result = await couch.get(options);
    } catch (error) {
      return { ok, error };
    }

    if (result.ok && result.userCtx.name) {
      ok = true;
      status = 200;
      msg = "user found";
    } else {
      status = 404;
      msg = "user not found";
    }
  }

  return { ok, status, msg, name: ok ? result.userCtx.name : null };
};

/**
 * SignUp
 */
exports.signUp = ({ name, email, password }) => {
  const user = {
    name,
    password,
    roles: ["member"],
    type: "user",
    email
  };

  const privateUser = {
    db: "_users",
    doc: `${_usersPrefix}:${name}`,
    body: user,
    admin: true
  };

  const publicUser = {
    db: "chat_users_public",
    doc: name,
    body: {
      owner: user.name,
      pp: null,
      md5: md5(user.email),
      desc: null
    },
    admin: true
  };

  return new Promise((resolve, reject) => {
    couch
      .put(privateUser)
      .then(() => {
        return couch.put(publicUser);
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * SignIn
 */
exports.signIn = ({ name, password }) => {
  const options = {
    db: "_session",
    body: { name, password },
    includeHeader: true
  };

  return couch.post(options);
};

/**
 * ChangePassword
 */
exports.changePassword = async ({ name, new_password }) => {
  let user;

  const options = {
    db: "_users",
    doc: `${_usersPrefix}:${name}`
  };

  try {
    user = await couch.get(options);
  } catch (error) {
    return error;
  }

  user.password = new_password;
  options.body = user;

  return couch.put(options);
};
