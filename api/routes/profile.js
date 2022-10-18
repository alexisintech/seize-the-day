const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");

// /todo Routes
// treat each path as: /profile  /profile/createTodo  /profile/delete/:id  /profile/complete/:id

router.get("/", profileController.getTodos)

router.post("/createTodo", profileController.createTodo);

router.put("/complete/:id", profileController.completeTodo);

router.delete("/delete/:id", profileController.deleteTodo);

module.exports = router;