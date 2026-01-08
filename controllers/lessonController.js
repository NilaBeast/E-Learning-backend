const Lesson = require("../models/Lesson");
const Progress = require("../models/Progress");

/* ADMIN: UPLOAD LESSON */
exports.addLesson = async (req, res) => {
  const { title, order, courseId } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Video required" });
  }

  const lesson = await Lesson.create({
    course: courseId,
    title,
    order,
    videoUrl: req.file.path,
  });

  res.status(201).json(lesson);
};

/* STUDENT: GET LESSONS */
exports.getLessons = async (req, res) => {
  const lessons = await Lesson.find({ course: req.params.courseId }).sort({
    order: 1,
  });
  res.json(lessons);
};
