const express = require("express");
const router = express.Router();
const subtasksController = require("../controllers/subTasks");

// profile/:id/title
router.put("/:id/:title", subtasksController.completeSubtasks);

module.exports = router;
