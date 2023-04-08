const Todo = require("../models/Todo");

module.exports = {
  completeSubtasks: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      console.log("This is from subtasks, change request", todo)
      console.log(todo.subTasks.find(x => x.title === req.params.title))
      const currentSubtask = todo.subTasks.find(x => x.title === req.params.title)

      currentSubtask.completed = !currentSubtask.completed;
      console.log(todo.subTasks)
      await todo.save();
  
      const todos = await Todo.find({ user: req.user.id });
  
      res.json(todos);
    } catch (err) {
      console.log(err);
    }
  }  
};
