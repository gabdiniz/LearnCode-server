const jwt = require("jsonwebtoken");

const generateToken = (user, expiresIn = '30d') => {
  const token = jwt.sign(
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  }
  catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };