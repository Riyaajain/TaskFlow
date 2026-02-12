const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect, authorize } = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

db.getConnection()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

app.use("/api/v1/auth", authRoutes);
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/v1/tasks", taskRoutes);

app.get("/api/v1/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});

app.get("/api/v1/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;
