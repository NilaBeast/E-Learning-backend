const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    // 🔥 thumbnail should NOT be required at schema level
    thumbnail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
