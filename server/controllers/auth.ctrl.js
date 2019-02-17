/**
 * Imports
 */
// Inner
// Models
const auth = require("../models/auth.models");

// Helpers
const { checkFields } = require("../helpers/request.checker");
const { response } = require("../helpers/response.format");

/**
 * Config
 */
exports.signUp = (req, res) => {
  const check = checkFields(["name", "pass"], req.body);

  if (!check.ok) {
    check.res = res;
    return response.error(check);
  }

  const { name, pass } = req.body;

  auth
    .signUp(name, pass)
    .then(data => {
      return response.success({ res, status: 201, msg: "User created", data });
    })
    .catch(error => {
      return response.error({ res, msg: "internal server error", error });
    });
};
