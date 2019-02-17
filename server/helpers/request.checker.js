/**
 * Check required field from body
 */
exports.checkFields = (required, body) => {
  if (typeof body === "undefined" || body === null) {
    return { ok: false, status: 400, msg: "no body data provided" };
  }
  const miss = [];
  const extra = [];

  // Check missing fields
  required.forEach(prop => {
    if (!(prop in body)) miss.push(prop);
  });

  // Check extra fields
  for (prop in body) {
    if (required.indexOf(prop) === -1) extra.push(prop);
  }

  // Set service state
  const ok = extra.length === 0 && miss.length === 0;

  // Return service state
  return {
    ok,
    status: 400,
    msg: "failed to check fields",
    error: { miss: miss, extra: extra }
  };
};
