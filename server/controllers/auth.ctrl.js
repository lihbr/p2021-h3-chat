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
exports.signUp = async (req, res) => {
  const check = checkFields(["name", "email", "password", "confirm"], req.body);

  if (!check.ok) {
    check.res = res;
    return response.error(check);
  }

  // Include user error here

  // Checking if passwords match
  if (req.body.password !== req.body.confirm) {
    return response.error({ res, status: 400, msg: "passwords do not match" });
  }

  // Checking if user already exist
  const userExists = await auth.userExists(req.body);

  // Error if can't check of if mail
  if (userExists.error || userExists.ok) {
    userExists.res = res;
    userExists.status = 400;
    return response.error(userExists);
  }

  auth
    .signUp(req.body)
    .then(data => {
      return response.success({ res, status: 201, msg: "user created", data });
    })
    .catch(error => {
      return response.error({ res, msg: "internal server error", error }, true);
    });
};

exports.signIn = (req, res) => {
  const check = checkFields(["name", "password"], req.body);

  if (!check.ok) {
    check.res = res;
    return response.error(check);
  }

  // Include user error here

  auth
    .signIn(req.body)
    .then(data => {
      return response.success({
        res,
        status: 200,
        msg: "user logged in",
        data
      });
    })
    .catch(error => {
      return response.error({ res, msg: "internal server error", error });
    });
};
