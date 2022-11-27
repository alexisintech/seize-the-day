const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos");

// main Routes

router.get("/todos", todosController.getTodos)

module.exports = router;