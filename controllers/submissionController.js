const Submission = require("../models/Submission");
const Assignment = require("../models/Assignment");

/* ============================
   STUDENT: SUBMIT ASSIGNMENT PDF
============================ */
exports.submitAssignment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const submission = await Submission.create({
      assignment: req.params.assignmentId,
      student: req.user.id,
      fileUrl: req.file.path, // Cloudinary URL
    });

    res.status(201).json(submission);
  } catch (error) {
    console.error("SUBMISSION ERROR:", error);
    res.status(500).json({ message: "Assignment submission failed" });
  }
};

exports.getSubmissionsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const submissions = await Submission.find()
      .populate({
        path: "assignment",
        match: { course: courseId },
        select: "title",
      })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    // remove submissions whose assignment doesn't match course
    const filtered = submissions.filter(s => s.assignment);

    res.json(filtered);
  } catch (error) {
    console.error("GET SUBMISSIONS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};