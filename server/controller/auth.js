const User = require("../models/User");
const bcrypt = require("bcrypt");

// Create a new user (Sign Up)
exports.postSignUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt();

    // if user already exists in db
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // if the user does not exist in the database, create a new one
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
  }
};

// Login to the website
exports.postSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // if username is not in user db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // if username and password is valid
    // save user into session
    req.session.user = user;
    req.session.chatLog = [];
    req.session.isLoggedIn = true;

    req.session.save();

    res.status(200).json(req.session.user);
  } catch (error) {
    console.error("Error in sign in:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Logout to the website
exports.postSignOut = async (req, res, next) => {
  try {
    // delete(destroy session)
    if (req.session.isLoggedIn) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).send("Internal Server Error");
        }

        res.status(200).send("Sign out successful");
      });
    }
  } catch (error) {
    console.error("Error in sign out:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get session information
exports.getSessionInfo = async (req, res, next) => {
  try {
    if (req.session.isLoggedIn) {
      res.status(200).json(req.session.user);
    } else {
      res.status(401).end();
    }
  } catch (error) {
    console.log(error);
  }
};
