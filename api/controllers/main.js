module.exports = {
  getIndex: (_, res) => {
    try {
      res.json("yo i'm alive");
    } catch (err) {
      console.log(err);
    }
  },
}