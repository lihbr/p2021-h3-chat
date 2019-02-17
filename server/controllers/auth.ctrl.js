/**
 * Imports
 */
// Inner
const { response } = require("../services/response.format");
const couch = require("../services/couch.serv.js");

/**
 * Config
 */
exports.signUp = (req, res) => {
  couch
    .put("/test_express", true)
    .then(data => {
      response.success({ res, data });
    })
    .catch(error => {
      response.error({ res, error });
    });
};
