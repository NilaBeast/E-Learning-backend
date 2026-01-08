const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");

/* ============================
   GET PROFILE
============================ */
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

/* ============================
   UPDATE PROFILE (FIXED)
============================ */
exports.updateProfile = async (req, res) => {
  try {
    const user = req.user;

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    user.education = {
      institution: req.body.institution || user.education?.institution,
      level: req.body.level || user.education?.level,
    };

    user.subjects = req.body.subjects
      ? req.body.subjects.split(",").map(s => s.trim())
      : user.subjects;

    if (req.file) {
      user.profileImage = req.file.path;
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    res.status(500).json({ message: "Profile update failed" });
  }
};

