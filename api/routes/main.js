const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const mainController = require("../controllers/main");
const authenticateToken = require("../middleware/auth");

// main Routes

router.get("/", mainController.getIndex);
router.post("/login", authController.postLogin);
router.get("/getUser", authenticateToken, authController.getUser);
// router.post("/logout", authController.postLogout);
router.post("/signup", authController.postSignup);

module.exports = router;
