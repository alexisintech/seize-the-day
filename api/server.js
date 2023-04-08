const express = require("express");
const app = express();
const cors = require("cors");
const methodOverride = require("method-override");
const logger = require("morgan");
const connectDB = require("./config/database");
const authenticateToken = require("./middleware/auth");

const mainRoutes = require("./routes/main");
const profileRoutes = require("./routes/profile");
const subTasksRoutes = require("./routes/subTasks");

require("dotenv").config({ path: "./config/.env" });

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(methodOverride("_method"));

app.use("/", mainRoutes);
app.use("/profile", authenticateToken, profileRoutes);
app.use("/profile", authenticateToken, subTasksRoutes);

app.listen(process.env.PORT || "2222", () => {
  console.log("server is running 🤪💅💋👛👏🏻💄✨❤️‍🔥");
});
