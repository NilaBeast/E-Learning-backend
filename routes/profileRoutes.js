const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, upload.single("profileImage"), updateProfile);

module.exports = router;
