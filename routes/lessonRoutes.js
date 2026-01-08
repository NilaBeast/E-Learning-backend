const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const videoUpload = require("../middleware/videoUpload");

const {
  addLesson,
  getLessons,
} = require("../controllers/lessonController");

const router = express.Router();

/* ============================
   ADMIN: ADD LESSON (VIDEO UPLOAD)
   POST /api/lessons
============================ */
router.post(
  "/",
  protect,
  adminOnly,
  videoUpload.single("video"),
  addLesson
);

/* ============================
   STUDENT: GET LESSONS BY COURSE
   GET /api/lessons/:courseId
============================ */
router.get("/:courseId", protect, getLessons);

module.exports = router;
