/**
 * Imports
 */
// Inner
// Models
const user = require("../models/user.model");

// Helpers
const { checkFields } = require("../helpers/request.checker");
const { response } = require("../helpers/response.format");

/**
 * Config
 */

/**
 * SignUp
 */
exports.signUp = async (req, res, next) => {
  const check = checkFields(["name", "email", "password", "confirm"], req.body);

  if (!check.ok) {
    check.res = res;
    return response.error(check, true);
  }

  // Include user error here

  // Checking if passwords match
  if (req.body.password !== req.body.confirm) {
    return response.error({ res, status: 422, msg: "passwords do not match" });
  }

  // Checking if user already exist
  const userExists = await user.exists(req.body);

  // Error if can't check or if user exists
  if (userExists.error || userExists.ok) {
    userExists.res = res;
    return response.error(userExists);
  }

  user
    .signUp(req.body)
    .then(() => {
      return next();
    })
    .catch(error => {
      return response.error({ res, msg: "internal server error", error });
    });
};

/**
 * SignIn
 */
exports.signIn = (req, res) => {
  const check = checkFields(["name", "password"], req.body);

  if (!check.ok) {
    check.res = res;
    return response.error(check, true);
  }

  // Include user error here

  user
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
    ["name", "password", "new_password", "confirm"],
    req.body
  );

  if (!check.ok) {
    check.res = res;
    return response.error(check, true);
  }

  // Include user error here

  if (req.body.new_password !== req.body.confirm) {
    return response.error({
      res,
      status: 422,
      msg: "new passwords do not match"
    });
  }

  user
    .signIn(req.body)
    .then(data => {
      return user.changePassword(req.body);
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
