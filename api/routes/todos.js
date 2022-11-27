const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos");

// /todo Routes
// treat each path as: /todos/createTodo  /todos/delete/:id  /todos/complete/:id

router.post("/createTodo", todosController.createTodo);

router.put("/complete/:id", todosController.completeTodo);

router.delete("/delete/:id", todosController.deleteTodo);

module.exports = router;