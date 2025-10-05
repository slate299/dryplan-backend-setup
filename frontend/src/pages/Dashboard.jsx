// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

const weatherIcon = (condition) => {
  const c = condition.toLowerCase();
  if (c.includes("cloud")) return "☁️";
  if (c.includes("rain")) return "🌧️";
  if (c.includes("storm")) return "⛈️";
  if (c.includes("snow")) return "❄️";
  if (c.includes("clear")) return "☀️";
  if (c.includes("mist") || c.includes("fog")) return "🌫️";
  return "🌡️";
};

const KENYAN_LOCATIONS = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi",
  "Kitale",
  "Lamu",
  "Garissa",
  "Kiambu",
  "Naivasha",
  "Nyeri",
  "Machakos",
  "Meru",
  "Kakamega",
  "Isiolo",
  "Nyahururu",
  "Karatina",
  "Kitui",
];

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
    testBackendConnection();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setEvents(data);
    } catch {
      setError("Failed to load events. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.location) {
      setError("Please fill in all fields");
      return;
    }
    setCreating(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseText = await res.text();
      if (res.ok) {
        const newEvent = JSON.parse(responseText);
        setEvents((prev) => [...prev, newEvent]);
        setFormData({ name: "", date: "", location: "" });
      } else {
        try {
          const errData = JSON.parse(responseText);
          setError(errData.message || `Server error: ${res.status}`);
        } catch {
          setError(`Server error: ${responseText || res.status}`);
        }
      }
    } catch {
      setError("Network error. Check if backend is running.");
    } finally {
      setCreating(false);
    }
  };

  const testBackendConnection = async () => {
    try {
      await fetch("http://localhost:5000/");
    } catch {
      setError("Backend not running.");
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case "high":
        return styles.riskBadgeHigh;
      case "medium":
        return styles.riskBadgeMedium;
      default:
        return styles.riskBadgeLow;
    }
  };

  const getCardColorClass = (risk) => {
    switch (risk) {
      case "high":
        return styles.cardHigh;
      case "medium":
        return styles.cardMedium;
      default:
        return styles.cardLow;
    }
  };

  if (loading) return <div className={styles.loading}>Loading events...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>🌧️ DryPlan</h1>
        <p>
          Your weather-proof event guardian. Never get caught in the rain again.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>➕ Add New Event</h3>

        {error && <div className={styles.errorMessage}>❌ {error}</div>}

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
          />
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={styles.locationSelect}
            required
          >
            <option value="">Select a location</option>
            {KENYAN_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={creating}>
          {creating ? "Adding..." : "Add Event"}
        </button>
      </form>

      <div className={styles.eventsSection}>
        <h2>Your Events ({events.length})</h2>
        {events.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No events yet. Create your first event above! 🎉</p>
          </div>
        ) : (
          <div className={styles.eventsGrid}>
            {events.map((event) => (
              <div
                key={event._id}
                className={`${styles.card} ${getCardColorClass(event.risk)}`}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.eventName}>{event.name}</h3>
                  <span
                    className={`${styles.riskBadge} ${getRiskBadgeClass(
                      event.risk
                    )}`}
                  >
                    {event.risk.toUpperCase()}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.date}>📅 {formatDate(event.date)}</p>
                  <p className={styles.location}>📍 {event.location}</p>
                  {event.weatherData && (
                    <>
                      <p>
                        {weatherIcon(event.weatherData.condition)} Temp:{" "}
                        {event.weatherData.temperature?.toFixed(1)}°C
                      </p>
                      <p>☔ Rain Probability: {event.rainProbability}%</p>
                      <p>☁️ Condition: {event.weatherData.condition}</p>
                      <p>💧 Humidity: {event.weatherData.humidity}%</p>
                      <p>💨 Wind: {event.weatherData.windSpeed} m/s</p>
                    </>
                  )}
                </div>
                <div className={styles.cardFooter}>
                  <Link
                    to={`/events/${event._id}`}
                    className={styles.viewDetailsBtn}
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
