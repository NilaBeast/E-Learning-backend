const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "assignments",
    resource_type: "raw",          // 🔥 REQUIRED FOR PDFs
    allowed_formats: "pdf",
     use_filename: true,
    unique_filename: true,
    flags: "attachment",
  },
});

const pdfUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"), false);
    } else {
      cb(null, true);
    }
  },
});

module.exports = pdfUpload;
