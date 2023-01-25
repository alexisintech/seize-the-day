module.exports = {
  getIndex: (req, res) => {
    try {
      res.status(200).json({ message: "success" });
    } catch (err) {
      console.log(err);
    }
  },
};
