const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos");

// /todo Routes
// treat each path as: /post/createTodo  /post/delete/:id  /post/complete/:id

router.post("/createTodo", todosController.createTodo);

router.put("/complete/:id", todosController.completeTodo);

router.delete("/delete/:id", todosController.deleteTodo);

module.exports = router;