// Creating router
const express = require("express");
const router = express.Router();

// Importing controllers
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/authController");

const {protect} = require("../middlewares/protect")

// Creating routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", protect, getUserProfile); // this is an protected route means login hona zaruri h to use this route

module.exports = router;
