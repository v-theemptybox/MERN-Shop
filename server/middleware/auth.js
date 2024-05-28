exports.isAuthenticated = async (req, res, next) => {
  // Check if the user is logged in
  if (req.session && req.session.isLoggedIn) {
    next();
  } else {
    // If the user is not logged in, return 401 error (Unauthorized)
    res
      .status(401)
      .json({ message: "You need to log in to access this resource" });
  }
};

exports.checkRole = (role) => {
  return async (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.session.user;
    if (!user) {
      return res.status(403).json({ message: "User not found in session" });
    }

    // check role of user
    if (user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
