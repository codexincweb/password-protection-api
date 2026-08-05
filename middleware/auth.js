const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided"
    });
  }

  try {
    const verified = jwt.verify(
      token,
      "mysecretkey"
    );

    req.user = verified;
    next();

  } catch (error) {
    res.status(400).json({
      message: "Invalid token"
    });
  }
}

module.exports = auth;
