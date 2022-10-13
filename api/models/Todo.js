const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

module.exports = mongoose.model("Todo", TodoSchema);