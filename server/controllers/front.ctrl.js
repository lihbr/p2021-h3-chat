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
 * Redirect if not logged in
 */
exports.redirect = async (req, res, next) => {
  const currentUser = await user.getWithCookie(req);

  if (!currentUser.ok) {
    return res.redirect(302, "/connect");
  }

  return next();
};
