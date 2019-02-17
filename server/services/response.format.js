/**
 * Format success and error properly
 */
exports.response = {
  success: ({ res, status = 200, msg = "", data = null } = {}) => {
    return res.status(status).json({ status, msg, data });
  },
  error: ({ res, status = 500, msg = "", error = null } = {}) => {
    return res.status(status).json({ status, msg, error });
  }
};
