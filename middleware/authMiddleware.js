import passport from "passport";

export const requireUserAuth = passport.authenticate(
  "jwt",
  { session: false },
  null
);

export const isAdminMiddleware = (req, res, next) => {
  try {
    // Check if the user object exists and has a role
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ message: "Access denied. No user role found." });
    }

    // Check if the user's role is 'admin'
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // If the role is 'admin', proceed to the next middleware or route handler
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
