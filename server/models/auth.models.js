/**
 * Imports
 */
// Misc

// Inner
const couch = require("../helpers/couch.serv.js");

const _usersPrefix = "org.couchdb.user";

/**
 * Config
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

exports.signUp = ({ name, email, password }) => {
  const user = {
    private: {
      name,
      password,
      roles: ["member"],
      type: "user",
      email
    },
    public: {
      owner: name
    }
  };

  const userPrivate = {
    db: "_users",
    doc: `${_usersPrefix}:${name}`,
    body: user.private,
    admin: true
  };

  const userPublic = {
    db: "chat_users_public",
    doc: `user_${name}`,
    body: user.public,
    admin: true
  };

  return Promise.all([couch.put(userPrivate), couch.put(userPublic)]);
};

exports.signIn = ({ name, password }) => {};
