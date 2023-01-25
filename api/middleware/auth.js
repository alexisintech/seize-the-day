const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.status(401).json({
      message:
        "You cannot complete this action because you aren't authenticate",
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "something interesting message for this" });
    }

    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
