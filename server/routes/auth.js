const express = require("express");
const authController = require("../controller/auth");

const router = express.Router();

// Create a new user
router.post("/signUp", authController.postSignUp);

// Login to the website
router.post("/signIn", authController.postSignIn);

// Logout to the website
router.post("/signOut", authController.postSignOut);

module.exports = router;
