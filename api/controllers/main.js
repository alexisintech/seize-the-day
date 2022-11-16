module.exports = {
  getIndex: async (req, res) => {
    try {
      res.status(200).json({ message: "getIndex at '/' was successful! " });
    } catch (err) {
      console.log(err);
    }
  },
};
