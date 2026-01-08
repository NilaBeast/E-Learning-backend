const Progress = require("../models/Progress");

exports.markLessonCompleted = async (req, res) => {
  const { courseId, lessonId } = req.body;

  let progress = await Progress.findOne({
    user: req.user.id,
    course: courseId,
  });

  if (!progress) {
    progress = await Progress.create({
      user: req.user.id,
      course: courseId,
      completedLessons: [lessonId],
    });
  } else if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    await progress.save();
  }

  res.json(progress);
};
