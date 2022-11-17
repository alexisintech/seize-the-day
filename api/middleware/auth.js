const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null)
    return res.status(401).json({
      message:
        "You cannot complete this action because you aren't authenticated.",
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "User was not authenticated." });

    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
