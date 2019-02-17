/**
 * Check required field from body
 */
exports.checkFields = (required, body) => {
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
  return { ok, extra, miss };
};
