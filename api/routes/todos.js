const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos");

// /todo Routes
// treat each path as: /post/createTodo  /post/delete/:id  /post/complete/:id

// enables user to create todo
router.post("/createTodo", todosController.createTodo);

// enables user to toggle a todo as complete or uncomplete. In controller, uses POST model to change complete: !complete
router.put("/complete/:id", todosController.completeTodo);

// enables user to delete a todo. In controller, uses POST model to delete post from MongoDB collection
router.delete("/delete/:id", todosController.deleteTodo);

module.exports = router;