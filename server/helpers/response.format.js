/**
 * Format success and error properly
 */
// Quickly sanitize msg
const sanitizeMsg = msg => {
  return msg.replace(/\.$/, "").toLocaleLowerCase();
};

exports.response = {
  success: ({ res, status = 200, msg = "", data = null } = {}) => {
    msg = sanitizeMsg(msg);
    return res.status(status).json({ status, msg, data });
  },
  error: (
    { res, status = 500, msg = "", error = null } = {},
    trusted = false
  ) => {
    // Get CouchDB error message & status if they exist
    if (error) {
      if (error.error && error.error.reason) msg = error.error.reason;
      if (error.statusCode) status = error.statusCode;
    }
    // Clear error details if source not trusted
    if (!trusted) error = null;

    msg = sanitizeMsg(msg);
    return res.status(status).json({ status, msg, error });
  }
};
