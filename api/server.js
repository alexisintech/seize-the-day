const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
// const { ensureAuth } = require("./middleware/auth");

// Routes
const mainRoutes = require("./routes/main");
const profileRoutes = require("./routes/profile");

// Telling express to use our environment variables - use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Connect To Database
connectDB();

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// Logging
app.use(logger("dev"));

// Use forms for put / delete
app.use(methodOverride("_method"));

// // Setup Sessions - stored in MongoDB
// app.use(
//   session({
//     secret: "hehehe meow",
//     resave: false,
//     saveUninitialized: false,
//     maxAge: 3600000,
//     //storing the session in our DB
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   })
// );

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());
// require("./config/passport")(passport);

// Use flash messages for errors, info, ect...
app.use(flash());

// Setup routes for which the server is listening
app.use("/", mainRoutes);
app.use("/profile", profileRoutes);

// Server Running
app.listen(process.env.PORT, () => {
  console.log("server is running 🤪💅💋👛👏🏻💄✨❤️‍🔥");
});
