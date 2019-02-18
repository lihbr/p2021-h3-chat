/**
 * Imports
 */
// Misc
const md5 = require("md5");

// Inner
const couch = require("../helpers/couch.serv.js");

const _usersPrefix = "org.couchdb.user";

/**
 * Config
 */

/**
 * UserExists
 */
exports.userExists = async ({ name, email }) => {
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

  // User doesn't exists
  if (!ok) {
    return { ok, msg: "user doesn't exists" };
  }

  // User exists
  let exist = { mail: false, name: false };

  for (const doc of result) {
    if (doc._id === `${_usersPrefix}:${name}`) exist.name = true;
    if (doc.email === email) exist.email = true;
  }

  let msg = "";
  if (exist.name && exist.email) {
    msg = "name and email already exist";
  } else if (exist.name) {
    msg = "name already exists";
  } else {
    msg = "email already exists";
  }

  return { ok, msg };
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
    doc: `${name}`,
    body: {
      _id: user.name,
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
exports.changePassword = async ({ name, newPassword }) => {
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

  user.password = newPassword;
  options.body = user;

  return couch.put(options);
};
