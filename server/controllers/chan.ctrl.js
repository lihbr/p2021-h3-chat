/**
 * Imports
 */
// Misc
const bcrypt = require("bcrypt");

// Inner
// Models
const chan = require("../models/chan.model");
const user = require("../models/user.model");

// Helpers
const { checkFields } = require("../helpers/request.checker");
const { response } = require("../helpers/response.format");

/**
 * Config
 */

/**
 * Create
 */
exports.create = async (req, res, next) => {
  const check = checkFields(["name"], req.body);

  if (!check.ok) {
    check.res = res;
    return response.error(check, true);
  }

  // Include user error here

  // Checking if passwords match
  if (req.body.password && req.body.password !== req.body.confirm) {
    return response.error({ res, status: 422, msg: "passwords do not match" });
  }

  // Checking if chan already exist
  const chanExists = await chan.exists(req.body);

  // Error if can't check of if chan exists
  if (chanExists.error || chanExists.ok) {
    chanExists.res = res;
    return response.error(chanExists);
  }

  const currentUser = await user.getWithCookie(req);

  // If can't resolve user
  if (!currentUser.ok) {
    currentUser.res = res;
    return response.error(currentUser);
  }

  chan
    .create(req.body, !req.body.password, currentUser.name)
    .then(() => {
      return next();
    })
    .catch(error => {
      return response.error({ res, msg: "internal server error", error });
    });
};

/**
 * Join
 */
exports.join = async (req, res) => {
  let check = checkFields(["name"], req.body);

  if (!check.ok) {
    check.res = res;
    return response.error(check, true);
  }

  // Include user error here

  const channel = await chan.get(req.body);

  // If not found or error
  if (!channel.ok) {
    channel.res = res;
    return response.error(channel);
  }

  // Validate password if private chan
  if (!channel.data.public) {
    check = checkFields(["password"], req.body);

    if (!check.ok) {
      check.res = res;
      return response.error(check, true);
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      channel.data.hash
    );

    if (!validPassword) {
      return response.error({ res, status: 401, msg: "incorrect password" });
    }
  }

  const currentUser = await user.getWithCookie(req);

  // If can't resolve user
  if (!currentUser.ok) {
    currentUser.res = res;
    return response.error(currentUser);
  }

  chan
    .join(currentUser.user.name, channel.data.slug)
    .then(data => {
      return response.success({ res, msg: "joined channel", data: data[0] });
    })
    .catch(error => {
      return response.error({ res, msg: "internal server error", error }, true);
    });
};
