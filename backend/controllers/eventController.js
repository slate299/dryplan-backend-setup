import mongoose from "mongoose";
import Event from "../models/Event.js";
import {
  geocodeLocation,
  getWeatherForecast,
  calculateRiskLevel,
} from "../services/weatherService.js";

// Helper function to check if weather data is stale (older than 1 hour)
const isWeatherDataStale = (weatherData) => {
  if (!weatherData || !weatherData.timestamp) return true;
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  return new Date(weatherData.timestamp) < oneHourAgo;
};

/**
 * GET /api/events
 */
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/events/:id
 * ENHANCED for event detail page - returns event with full weather data
 */
export const getEventById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // If event doesn't have fresh weather data, fetch it
    if (!event.weatherData || isWeatherDataStale(event.weatherData)) {
      const freshWeather = await getWeatherForecast(
        { lat: event.coordinates.lat, lon: event.coordinates.lng },
        event.date
      );

      // Update event with fresh weather data
      event.weatherData = freshWeather;
      event.risk = calculateRiskLevel(freshWeather);
      event.rainProbability = freshWeather.rainProbability;
      await event.save();
    }

    res.json(event);
  } catch (err) {
    console.error("Get event by ID error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/events
 * ENHANCED with geocoding and weather integration
 * body: { name, date, location }
 */
export const createEvent = async (req, res) => {
  const { name, date, location } = req.body;

  if (!name || !date || !location) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    console.log(`📍 Geocoding location: ${location}`);

    // Step 1: Geocode the location to get coordinates
    const coordinates = await geocodeLocation(location);
    if (!coordinates) {
      return res.status(400).json({
        message:
          "Location not found. Please try a different location like 'Nairobi' or 'Mombasa'.",
      });
    }

    console.log(`✅ Geocoded to: ${coordinates.lat}, ${coordinates.lon}`);
    console.log(`🌤️ Fetching weather for date: ${date}`);

    // Step 2: Get weather forecast for the event date
    const weatherData = await getWeatherForecast(coordinates, date);

    // Step 3: Calculate risk level based on weather
    const risk = calculateRiskLevel(weatherData);

    console.log(
      `📊 Weather result: ${weatherData.rainProbability}% rain, Risk: ${risk}`
    );

    // Step 4: Create event with all data
    const newEvent = new Event({
      name,
      date,
      location,
      coordinates: {
        lat: coordinates.lat,
        lng: coordinates.lon,
      },
      risk,
      rainProbability: weatherData.rainProbability,
      weatherData: weatherData,
    });

    await newEvent.save();

    console.log(`✅ Event created successfully: ${newEvent._id}`);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Create event error:", err);

    // Provide user-friendly error messages
    if (err.message.includes("Location not found")) {
      return res.status(400).json({
        message:
          "Location not found. Try: 'Nairobi', 'Mombasa', 'Kisumu', etc.",
      });
    }

    if (err.message.includes("Weather API")) {
      return res.status(502).json({
        message: "Weather service temporarily unavailable. Please try again.",
      });
    }

    res.status(500).json({
      message: "Failed to create event",
      error: err.message,
    });
  }
};
