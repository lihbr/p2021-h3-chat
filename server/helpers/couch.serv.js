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
const auth = `Basic ${btoa(
  `${process.env.COUCH_USER || "admin"}:${process.env.COUCH_PASS || "admin"}`
)}`;

// Talk to couch
const talk = ({
  db,
  doc,
  params,
  headers = {},
  body = null,
  admin = false,
  method = "GET",
  json = true,
  includeHeader = false
} = {}) => {
  // Default options object
  const options = {
    uri: `${serv}/${db}`,
    headers,
    body,
    method,
    json: true
  };

  // Add doc or requested method if needed
  if (doc) options.uri += `/${doc}`;

  // Add params to url if needed
  if (params) options.uri += `?${querystring.stringify(params)}`;

  // Execute as admin if needed
  if (admin) options.headers.Authorization = auth;

  // Include header if requested
  if (includeHeader) {
    options.transform = (body, res) => ({ headers: res.headers, body });
  }

  // If sending something
  if (body) {
    // Then it's json or form
    options.headers["Content-Type"] = json
      ? "application/json"
      : "application/x-www-form-urlencoded";
  }

  // Return promise
  return rp(options);
};

// Get talk shorthand
exports.get = opt => {
  opt.method = "GET";
  return talk(opt);
};

// Post talk shorthand
exports.post = opt => {
  opt.method = "POST";
  return talk(opt);
};

// Put talk shorthand
exports.put = opt => {
  opt.method = "PUT";
  return talk(opt);
};

// Delete talk shorthand
exports.delete = opt => {
  opt.method = "DELETE";
  return talk(opt);
};

// List talk shorthand to achieve an _all_docs on CouchDB
exports.list = opt => {
  opt.method = "GET";
  opt.doc = "_all_docs";
  return talk(opt);
};

/**
 * List param "params" reminder :
 * const params = {
 * include_docs, // boolean
 * descending, // boolean
 * skip, // int
 * limit, // int
 * key, // string
 * startkey, // string
 * endkey // string
 * };
 */
