// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
  risk: { type: String, enum: ["high", "medium", "low"], default: "low" },
  rainProbability: { type: Number, default: 0 },
  weatherData: { type: Object }, // Store full weather response for details
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
