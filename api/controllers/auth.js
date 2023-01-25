const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) {
    res.status(400);
    res.json({
      status: 400,
      message: "Please enter a valid email address",
    });
  }
  if (validator.isEmpty(req.body.password)) {
    res.status(400);
    res.json({
      status: 400,
      message: "Password cannot be blank",
    });
  }

  if (validationErrors.length) {
    res.status(400);
    res.json({
      status: 400,
      message: "Log in failed validation ):",
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.postLogout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];

  // Add validator for username

  if (!validator.isEmail(req.body.email)) {
    res.status(400);
    res.json({
      status: 400,
      message: "Please enter a valid email address.",
    });
  }
  if (!validator.isLength(req.body.password, { min: 8 })) {
    res.status(400);
    res.json({
      status: 400,
      message: "Password must be atleast 8 characters long.",
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400);
    res.json({
      status: 400,
      message: "Passwords do not match.",
    });
  }

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    console.log(validationErrors);
    res.status(400);
    res.json({
      status: 400,
      message: "Sign up failed validation ):",
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        res.status(200);
        res.json({
          status: 200,
          message: "User already exists!",
          body: existingUser,
        });
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(201);
        res.json({
          status: 201,
          message: "User created :)",
          body: JSON.stringify(user),
        });
        // req.logIn(user, (err) => {
        //   if (err) {
        //     return next(err);
        //   }

        // });
      });
    }
  );
};
