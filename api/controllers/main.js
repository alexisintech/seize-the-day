module.exports = {
  getIndex: async (req, res) => {
    try {
      res.json(todos);
    } catch (err) {
      console.log(err);
    }
  },
}