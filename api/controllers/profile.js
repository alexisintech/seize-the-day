const Todo = require("../models/Todo");

module.exports = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find({ user: req.user.id });

      res.json(todos);
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (req, res) => {
    try {
      const todo = await Todo.create({
        title: req.body.title,
        user: req.user.id,
      });
      console.log("New todo was created!");

      todo.save();

      res.json(todo);
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const result = await Todo.findByIdAndDelete(req.params.id);

      res.json({ result });
    } catch (err) {
      console.log(err);
    }
  },
  completeTodo: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);

      todo.complete = !todo.complete;
      todo.save();

      res.json(todo);
    } catch (err) {
      console.log(err);
    }
  },
};
