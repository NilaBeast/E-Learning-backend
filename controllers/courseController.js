const Course = require("../models/Course");

/* ============================
   GET COURSES (WITH SEARCH)
============================ */
exports.getCourses = async (req, res) => {
  try {
    const { keyword } = req.query;

    let filter = {};

    if (keyword) {
      filter = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error("GET COURSES ERROR:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

/* ============================
   CREATE COURSE (ADMIN + CLOUDINARY)
============================ */
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.create({
      title,
      description,
      price,
      thumbnail: req.file ? req.file.path : "", // 🔥 Cloudinary URL
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);
    res.status(400).json({ message: "Failed to create course" });
  }
};

/* ============================
   GET COURSE BY ID
============================ */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("GET COURSE BY ID ERROR:", error);
    res.status(400).json({ message: "Invalid course ID" });
  }
};

/* ============================
   UPDATE COURSE (ADMIN)
============================ */
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.price = req.body.price || course.price;

    // 🔥 Update thumbnail if new file uploaded
    if (req.file) {
      course.thumbnail = req.file.path;
    }

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    console.error("UPDATE COURSE ERROR:", error);
    res.status(400).json({ message: "Failed to update course" });
  }
};

/* ============================
   DELETE COURSE (ADMIN)
============================ */
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);
    res.status(500).json({ message: "Failed to delete course" });
  }
};
