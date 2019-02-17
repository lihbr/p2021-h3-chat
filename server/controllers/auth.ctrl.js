/**
 * Imports
 */
// Express
const rp = require("request-promise-native");

// Inner
// Models
const auth = require("../models/auth.models");

// Helpers
const { checkFields } = require("../helpers/request.checker");
const { response } = require("../helpers/response.format");

/**
 * Config
 */

/**
 * SignUp
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
      return auth.signIn(req.body);
    })
    .then(data => {
      res.set("set-cookie", data.headers["set-cookie"]);
      response.success({
        res,
        status: 201,
        msg: "user created and logged in",
        data: data.body
      });
    })
    .catch(error => {
      return response.error({ res, msg: "internal server error", error }, true);
    });
};

/**
 * SignIn
 */
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
      res.set("set-cookie", data.headers["set-cookie"]);
      return response.success({ res, msg: "user logged in", data: data.body });
    })
    .catch(error => {
      return response.error({ res, msg: "internal server error", error });
    });
};

/**
 * ChangePassword
 */
exports.changePassword = (req, res) => {
  const check = checkFields(
    ["name", "password", "newPassword", "confirm"],
    req.body
  );

  if (!check.ok) {
    check.res = res;
    return response.error(check);
  }

  if (req.body.newPassword !== req.body.confirm) {
    return response.error({
      res,
      status: 400,
      msg: "new passwords do not match"
    });
  }

  auth
    .signIn(req.body)
    .then(data => {
      return auth.changePassword(req.body);
    })
    .then(data => {
      return response.success({
        res,
        msg: "password changed",
        data: data.body
      });
    })
    .catch(error => {
      console.log(error);
      return response.error({ res, msg: "internal server error", error });
    });
};
