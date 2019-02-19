/**
 * Imports
 */
// Inner
// Models
const user = require("../models/user.model");

/**
 * Config
 */

/**
 * Redirect if logged in
 */
exports.isLoggedIn = async (req, res, next) => {
  const currentUser = await user.getWithCookie(req);

  if (currentUser.ok) {
    return res.redirect(302, "/");
  }

  return next();
};

/**
 * Redirect if not logged in
 */
exports.isLoggedOut = async (req, res, next) => {
  const currentUser = await user.getWithCookie(req);

  if (!currentUser.ok) {
    return res.redirect(302, "/connect");
  }

  return next();
};
