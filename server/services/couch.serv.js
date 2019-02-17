/**
 * Imports
 */
// Misc
const btoa = require("btoa");
const querystring = require("querystring");

// Express
const rp = require("request-promise-native");

/**
 * Config
 */
// CouchDB url
const serv = process.env.COUCH_SERV || "127.0.0.1:5984";

// CouchDB auth token
const auth = {
  Authorization: `Basic ${btoa(
    `${process.env.COUCH_USER || "admin"}:${process.env.COUCH_PASS || "admin"}`
  )}`
};

// Talk to couch
const talk = ({
  db,
  doc,
  params,
  admin = false,
  method = "GET",
  json = true
} = {}) => {
  // Default options object
  const options = {
    uri: `${serv}/${db}`,
    method,
    json
  };

  // Add doc or requested method if needed
  if (doc) options.uri += `/${doc}`;

  // Add params to url if needed
  if (params) options.uri += `?${querystring.stringify(params)}`;

  // Execute as admin if needed
  if (admin) options.headers = auth;

  // Return promise
  return rp(options);
};

// 4-ways talk shorthands
exports.get = opt => {
  opt.method = "GET";
  talk(opt);
};
exports.post = opt => {
  opt.method = "POST";
  talk(opt);
};
exports.put = opt => {
  opt.method = "PUT";
  talk(opt);
};
exports.delete = opt => {
  opt.method = "DELETE";
  talk(opt);
};
