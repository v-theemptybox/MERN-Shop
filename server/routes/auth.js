const express = require("express");
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create a new user
router.post("/signUp", authController.postSignUp);

// Login to the website
router.post("/signIn", authController.postSignIn);

// Logout to the website
router.post(
  "/signOut",
  authMiddleware.isAuthenticated,
  authController.postSignOut
);

// Get session information
router.get("/getSession", authController.getSessionInfo);

module.exports = router;
