// backend/routes/weather.js
import express from "express";
import axios from "axios";
import Event from "../models/Event.js"; // adjust if your model filename differs

const router = express.Router();

// Basic risk calculation
const computeRisk = (data) => {
  const main = data.weather?.[0]?.main;
  const temp = data.main?.temp;
  const rain = data.rain;
  const snow = data.snow;

  if (
    rain ||
    snow ||
    ["Rain", "Snow", "Thunderstorm", "Drizzle"].includes(main)
  ) {
    return "high";
  }
  if (temp < 5 || temp > 35) {
    return "medium";
  }
  return "low";
};

router.get("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const city = encodeURIComponent(event.location);
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    const risk = computeRisk(data);

    // optionally update the event in DB
    await Event.findByIdAndUpdate(eventId, { risk });

    res.json({
      event: event.name,
      location: event.location,
      temperature: data.main?.temp,
      condition: data.weather?.[0]?.description,
      humidity: data.main?.humidity,
      wind_speed: data.wind?.speed,
      risk,
    });
  } catch (err) {
    // <-- this is where you log the error
    console.error("Weather fetch error:", err.message);

    // return error message from OpenWeather if available
    if (err.response) {
      return res.status(err.response.status).json({
        message: err.response.data?.message || "Weather API error",
      });
    }

    res
      .status(500)
      .json({ message: "Weather fetch failed", error: err.message });
  }
});

export default router;
