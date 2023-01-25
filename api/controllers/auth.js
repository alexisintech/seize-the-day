const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { comparePassword } = require("../utils/auth");

const SECRET = process.env.JWT_SECRET;

const generateToken = (username) => {
  return jwt.sign({ username }, SECRET, { expiresIn: 1800 });
};

const postLogin = (req, res, done) => {
  // get fields from form on frontend
  const { userName, password } = req.body;

  // check if the user is in the database
  User.findOne({ $or: [{ userName }] }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // if user does not exist, return 404
    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist.",
      });
    }

    // if user exists, generate token with username
    const token = generateToken(userName);

    // after token is signed, we want to return the request with a success
    return res.status(200).json({ message: "success", token });
  });
};

const postSignup = (req, res) => {
  // get fields from signup form
  const { userName, email, password, confirmPassword } = req.body;

  const validationErrors = [];

  // Add validator for username

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address.",
    });
  }
  if (!validator.isLength(password, { min: 8 })) {
    return res.status(400).json({
      message: "Password must be atleast 8 characters long.",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  if (validationErrors.length) {
    return res.status(400).json({
      message: "Sign up failed validation ):",
      errors: validationErrors,
    });
  }
  email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName,
    email,
    password,
  });

  User.findOne({ $or: [{ email }, { userName }] }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      res.status(400);
      res.json({
        status: 400,
        message: "User already exists!",
        body: existingUser,
      });
    }
    user.save((err) => {
      if (err) {
        return next(err);
      }

      const token = generateToken(userName);

      return res.status(201).json({
        status: 201,
        message: "User created :)",
        body: user,
        token,
      });
    });
  });
};

module.exports = {
  postLogin,
  postSignup,
};
