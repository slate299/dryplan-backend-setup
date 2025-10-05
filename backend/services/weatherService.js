// services/weatherService.js
import axios from "axios";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export const geocodeLocation = async (location) => {
  try {
    // Try OpenWeatherMap Geocoding first
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      location
    )}&limit=1&appid=${OPENWEATHER_API_KEY}`;

    console.log(`Geocoding: ${location}`);
    const response = await axios.get(url);

    if (response.data.length === 0) {
      throw new Error("Location not found");
    }

    const result = response.data[0];
    console.log(
      `Found: ${result.name}, ${result.country} at ${result.lat}, ${result.lon}`
    );

    return {
      lat: result.lat,
      lon: result.lon,
    };
  } catch (error) {
    console.log("OpenWeatherMap geocoding failed, trying fallback...");

    // Fallback: Use a simple location database for common Kenyan locations
    return fallbackGeocoding(location);
  }
};

// Fallback geocoding for common Kenyan locations
const fallbackGeocoding = (location) => {
  const kenyaLocations = {
    nairobi: { lat: -1.286389, lon: 36.817223 },
    mombasa: { lat: -4.0435, lon: 39.6682 },
    kisumu: { lat: -0.1022, lon: 34.7617 },
    nakuru: { lat: -0.3031, lon: 36.08 },
    eldoret: { lat: 0.5143, lon: 35.2698 },
    thika: { lat: -1.0392, lon: 37.0714 },
    malindi: { lat: -3.2176, lon: 40.1191 },
    kitale: { lat: 1.0157, lon: 35.0062 },
    lamu: { lat: -2.2696, lon: 40.9006 },
    garissa: { lat: -0.4532, lon: 39.6461 },
    kiambu: { lat: -1.1714, lon: 36.8356 },
    naivasha: { lat: -0.7176, lon: 36.431 },
    nyeri: { lat: -0.4201, lon: 36.9476 },
    machakos: { lat: -1.5177, lon: 37.2634 },
    meru: { lat: 0.0515, lon: 37.6456 },
    kakamega: { lat: 0.2827, lon: 34.7519 },
    isiolo: { lat: 0.3556, lon: 37.5833 },
    nyahururu: { lat: 0.0381, lon: 36.3634 },
    karatina: { lat: -0.4833, lon: 37.1333 },
    kitui: { lat: -1.3675, lon: 38.0106 },
  };

  const normalizedLocation = location.toLowerCase().trim();

  // Try exact match first
  if (kenyaLocations[normalizedLocation]) {
    console.log(
      `Fallback geocoding found: ${location} -> ${kenyaLocations[normalizedLocation].lat}, ${kenyaLocations[normalizedLocation].lon}`
    );
    return kenyaLocations[normalizedLocation];
  }

  // Try partial match
  for (const [key, coords] of Object.entries(kenyaLocations)) {
    if (normalizedLocation.includes(key)) {
      console.log(
        `Fallback partial match: ${location} -> ${key} at ${coords.lat}, ${coords.lon}`
      );
      return coords;
    }
  }

  throw new Error("Location not found in fallback database");
};

export const getWeatherForecast = async (coordinates, date) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    let rainProbability = 0;
    const condition = data.weather[0].main.toLowerCase();

    if (condition.includes("rain")) rainProbability = 80;
    else if (condition.includes("drizzle")) rainProbability = 50;
    else if (condition.includes("thunderstorm")) rainProbability = 90;
    else if (condition.includes("cloud")) rainProbability = 30;
    else if (condition.includes("clear")) rainProbability = 10;

    return {
      rainProbability,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind?.speed || 0,
      timestamp: new Date(),
    };
  } catch (error) {
    console.log("Weather API failed, using demo data");

    let rainProbability = 30;
    const conditions = [
      "clear sky",
      "few clouds",
      "scattered clouds",
      "broken clouds",
      "shower rain",
      "rain",
      "thunderstorm",
    ];
    const randomCondition =
      conditions[Math.floor(Math.random() * conditions.length)];

    if (randomCondition.includes("rain")) rainProbability = 80;
    else if (randomCondition.includes("thunderstorm")) rainProbability = 90;
    else if (randomCondition.includes("cloud")) rainProbability = 40;

    return {
      rainProbability,
      temperature: 20 + Math.random() * 15,
      condition: randomCondition,
      humidity: 40 + Math.random() * 40,
      windSpeed: 1 + Math.random() * 5,
      timestamp: new Date(),
    };
  }
};

export const calculateRiskLevel = (weatherData) => {
  const rainProb = weatherData.rainProbability || 0;
  if (rainProb >= 60) return "high";
  if (rainProb >= 30) return "medium";
  return "low";
};
