const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
// const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");

// Routes
const todoRoutes = require("./routes/todos");

// Telling express to use our environment variables - use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
// require("./config/passport")(passport);

// Connect To Database
connectDB();

// Using EJS for views
// app.set("view engine", "ejs");

// Static Folder
// app.use(express.static("public"));

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// Logging
app.use(logger("dev"));

// Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    //storing the session in our DB
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Use flash messages for errors, info, ect...
app.use(flash());

// Setup routes for which the server is listening
app.use("/todos", todoRoutes);


//The 404 Route (ALWAYS Keep this as the last route)
// app.get('*', function(req, res){
//   res.render("404.ejs");
// });

// Server Running
app.listen(process.env.PORT, () => {
  console.log("server is running 🤪💅💋👛👏🏻💄✨❤️‍🔥");
});
