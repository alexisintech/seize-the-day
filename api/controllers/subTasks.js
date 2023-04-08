const Todo = require("../models/Todo");

module.exports = {
  completeSubtasks: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      const currentSubtask = todo.subTasks.find(x => x.title === req.params.title)

      currentSubtask.completed = !currentSubtask.completed;
      
      await todo.save();
  
      const todos = await Todo.find({ user: req.user.id });
  
      res.json(todos);
    } catch (err) {
      console.log(err);
    }
  }  
};
