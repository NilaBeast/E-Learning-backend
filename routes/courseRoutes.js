const express = require("express");
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);

router.post("/", protect, adminOnly, upload.single("thumbnail"), createCourse);
router.put("/:id", protect, adminOnly, upload.single("thumbnail"), updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

module.exports = router;
