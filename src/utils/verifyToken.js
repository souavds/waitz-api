const jwt = require('jsonwebtoken');

module.exports = async (token, user) => {
  const isValid = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return false;
    if (decoded.exp < Date.now() / 1000) return false;
    if (decoded.username === user) return true;
    return false;
  });
  return isValid;
};
