const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const pdfUpload = require("../middleware/pdfUpload");
const  { adminOnly }= require("../middleware/adminMiddleware");
const {
  submitAssignment,
  getSubmissionsByCourse,
} = require("../controllers/submissionController");

const router = express.Router();

/* ============================
   STUDENT: SUBMIT ASSIGNMENT
   POST /api/submissions/:assignmentId
============================ */
router.post(
  "/:assignmentId",
  protect,
  pdfUpload.single("file"),
  submitAssignment
);

/* ADMIN */
router.get(
  "/course/:courseId",
  protect,
  adminOnly,
  getSubmissionsByCourse
);

module.exports = router;
