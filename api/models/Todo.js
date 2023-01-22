const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
  subTasks: {
    type: Array,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
