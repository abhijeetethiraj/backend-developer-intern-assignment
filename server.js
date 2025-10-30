const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("path");

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));


dotenv.config();

ConnectDB();

// Middleware
app.use(express.json());
app.use(errorHandler);

// Routes
app.get("/", (req, res) => {
  res.send("✅ API is running successfully...");
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Server listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
