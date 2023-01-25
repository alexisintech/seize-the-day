const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const mainController = require("../controllers/main");

// main Routes

router.get("/", mainController.getIndex);
router.post("/login", authController.postLogin);
// router.post("/logout", authController.postLogout);
router.post("/signup", authController.postSignup);

module.exports = router;
