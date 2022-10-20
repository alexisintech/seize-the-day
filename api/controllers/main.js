module.exports = {
  getIndex: async (req, res) => {
    try {
      const todos = await Todo.find()
      
      res.json(todos);
    } catch (err) {
      console.log(err);
    }
  },
}