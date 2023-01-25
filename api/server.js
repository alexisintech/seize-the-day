const express = require("express");
const app = express();
const cors = require("cors");
const methodOverride = require("method-override");
const logger = require("morgan");
const connectDB = require("./config/database");
const authenticateToken = require("./middleware/auth");

const mainRoutes = require("./routes/main");
const profileRoutes = require("./routes/profile");

require("dotenv").config({ path: "./config/.env" });

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(methodOverride("_method"));

app.use("/", mainRoutes);
app.use("/profile", authenticateToken, profileRoutes);

app.listen(process.env.PORT, () => {
  console.log("server is running 🤪💅💋👛👏🏻💄✨❤️‍🔥");
});
