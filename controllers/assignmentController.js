const Assignment = require("../models/Assignment");

/* ============================
   STUDENT: GET ASSIGNMENTS BY COURSE
   (Only if course is purchased)
============================ */
exports.getAssignmentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // 🔐 check purchase
    if (!req.user.purchasedCourses.includes(courseId)) {
      return res
        .status(403)
        .json({ message: "You have not purchased this course" });
    }

    const assignments = await Assignment.find({ course: courseId })
      .sort({ createdAt: -1 });

    res.json(assignments);
  } catch (error) {
    console.error("GET ASSIGNMENTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};

/* ============================
   ADMIN: CREATE ASSIGNMENT (PDF)
============================ */
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, courseId } = req.body;

    if (!title || !description || !courseId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Assignment PDF required" });
    }

    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      course: courseId,
      pdfUrl: req.file.path, // 🔥 CLOUDINARY URL
    });

    res.status(201).json(assignment);
  } catch (error) {
    console.error("CREATE ASSIGNMENT ERROR:", error);
    res.status(400).json({ message: "Failed to create assignment" });
  }
};


/* ============================
   ADMIN: UPDATE ASSIGNMENT
============================ */
exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    assignment.title = req.body.title || assignment.title;
    assignment.description =
      req.body.description || assignment.description;
    assignment.dueDate = req.body.dueDate || assignment.dueDate;

    // 🔥 replace PDF if new uploaded
    if (req.file) {
      assignment.pdfUrl = req.file.path;
    }

    const updated = await assignment.save();
    res.json(updated);
  } catch (error) {
    console.error("UPDATE ASSIGNMENT ERROR:", error);
    res.status(400).json({ message: "Failed to update assignment" });
  }
};

/* ============================
   ADMIN: DELETE ASSIGNMENT
============================ */
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await assignment.deleteOne();
    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error("DELETE ASSIGNMENT ERROR:", error);
    res.status(500).json({ message: "Failed to delete assignment" });
  }
};
