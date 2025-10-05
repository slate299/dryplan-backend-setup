// frontend/src/components/WeatherTimeline/WeatherTimeline.jsx
import React from "react";
import styles from "./WeatherTimeline.module.css";

const WeatherTimeline = ({ event }) => {
  if (!event || !event.weatherData) return <div>Loading weather...</div>;

  const weatherIcon = (condition) => {
    const c = condition.toLowerCase();
    if (c.includes("cloud")) return "☁️";
    if (c.includes("rain")) return "🌧️";
    if (c.includes("storm")) return "⛈️";
    if (c.includes("clear")) return "☀️";
    return "🌡️";
  };

  // Create table rows for each weather metric
  const weatherMetrics = [
    {
      label: "Condition",
      value: event.weatherData.condition,
      icon: weatherIcon(event.weatherData.condition),
    },
    {
      label: "Temperature",
      value: `${event.weatherData.temperature?.toFixed(1)}°C`,
      icon: "🌡️",
    },
    {
      label: "Rain Probability",
      value: `${event.rainProbability}%`,
      icon: "☔",
    },
    { label: "Humidity", value: `${event.weatherData.humidity}%`, icon: "💧" },
    {
      label: "Wind Speed",
      value: `${event.weatherData.windSpeed} m/s`,
      icon: "💨",
    },
  ];

  return (
    <div className={styles.timeline}>
      <h2>Weather Overview</h2>

      <table className={styles.weatherForecast}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {weatherMetrics.map((metric, index) => (
            <tr key={index}>
              <td>
                <div className={styles.metricCell}>
                  <span className={styles.metricIcon}>{metric.icon}</span>
                  <span className={styles.metricLabel}>{metric.label}</span>
                </div>
              </td>
              <td>
                <p className={styles.metricValue}>{metric.value}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTimeline;
