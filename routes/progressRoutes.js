const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  markLessonCompleted,
} = require("../controllers/progressController");

const router = express.Router();

/* ============================
   MARK LESSON COMPLETED
   POST /api/progress/complete
============================ */
router.post("/complete", protect, markLessonCompleted);

module.exports = router;
