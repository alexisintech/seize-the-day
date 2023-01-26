const bcrypt = require("bcrypt");

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  comparePassword,
};
