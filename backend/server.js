import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db.js";
import eventRoutes from "./routes/events.js";
import weatherRoutes from "./routes/weather.js";

const app = express();

// connect to mongo
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// health route
app.get("/", (req, res) => {
  res.send("DryPlan API is running 🚀");
});

// API routes
app.use("/api/events", eventRoutes);
app.use("/api/weather", weatherRoutes);

// global error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
