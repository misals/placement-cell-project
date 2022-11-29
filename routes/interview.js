const express = require("express");
const {
  addInterview,
  create,
  enrollInInterview,
  deallocate,
} = require("../controllers/interviewController");
const router = express.Router();

// redering add interview page
router.get("/add-interview", addInterview);

// creating a new interview
router.post("/create", create);

// enrolling student in an interview
router.post("/enroll-in-interview/:id", enrollInInterview);

// deallocate the student from the interview
router.get("/deallocate/:studentId/:interviewId", deallocate);

// exporting the router
module.exports = router;
