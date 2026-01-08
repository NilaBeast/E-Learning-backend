const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const pdfUpload = require("../middleware/pdfUpload");

const {
  getAssignmentsByCourse,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

const router = express.Router();

/* ============================
   STUDENT: GET ASSIGNMENTS
   GET /api/assignments/:courseId
============================ */
router.get("/:courseId", protect, getAssignmentsByCourse);

/* ============================
   ADMIN ROUTES
============================ */
router.post(
  "/",
  protect,
  adminOnly,
  pdfUpload.single("pdf"),
  createAssignment
);

router.put(
  "/:id",
  protect,
  adminOnly,
  pdfUpload.single("pdf"),
  updateAssignment
);

router.delete("/:id", protect, adminOnly, deleteAssignment);

module.exports = router;
