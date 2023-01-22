const Todo = require("../models/Todo");

const date = new Date();
const dd = String(date.getDate()).padStart(2, "0");
const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
const yyyy = date.getFullYear();
const todaysDate = mm + "/" + dd + "/" + yyyy;
// prefix integers below 10 with 0's
// example: 10:7 will become 10:07
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
const currentTime = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;

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
        subTasks: req.body.subTasks,
        tags: req.body.tags,
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
