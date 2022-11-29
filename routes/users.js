const express = require("express");
const passport = require("passport");
const { dashboard } = require("../controllers/dashBoardController");
const { downloadCSVReport } = require("../controllers/reportController");

// requiring files
const {
  profile,
  updateUser,
  signIn,
  signUp,
  create,
  createSession,
  destroySession,
} = require("../controllers/userController");
const router = express.Router();

// router for checking up the profile
router.get("/profile", passport.checkAuthentication, profile);

//updating user profile
router.post("/update", passport.checkAuthentication, updateUser);

// route for dashboard
router.get("/dashboard", dashboard);

// router for sign in page
router.get("/", signIn);

// route for sign up page
router.get("/sign-up", signUp);

// route for creating a new User
router.post("/create", create);

// use passport as middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  createSession
);

// route for logout button
router.get("/sign-out", destroySession);

// route for downloading csv reports
router.get("/download", downloadCSVReport);

module.exports = router;
