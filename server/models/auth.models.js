/**
 * Imports
 */
// Inner
const couch = require("../helpers/couch.serv.js");

/**
 * Config
 */
exports.signUp = (name, password) => {
  const user = {
    name,
    password,
    roles: ["member"],
    type: "user"
  };

  const userPrivate = {
    db: "_users",
    doc: `org.couchdb.user:${user.name}`,
    body: user,
    admin: true
  };

  const userPublic = {
    db: "chat_users_public",
    doc: user.name,
    body: {
      _id: user.name,
      owner: user.name
    },
    admin: true
  };

  return Promise.all([couch.put(userPrivate), couch.put(userPublic)]);
};
