const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "course_videos",
    resource_type: "video", // 🔥 VERY IMPORTANT
    allowed_formats: ["mp4", "mov", "webm"],
  },
});

module.exports = multer({ storage });
