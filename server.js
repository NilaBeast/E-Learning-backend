const dotenv = require ("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require("./routes/profileRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const progressRoutes = require("./routes/progressRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");


dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-learning-frontend-cyan.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/assignments", assignmentRoutes);

app.get("/", (req, res) => {
  res.send("Server is running"); // ✅ fixed
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
