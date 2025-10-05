// frontend/src/components/EventHeader/EventHeader.jsx
import React from "react";
import styles from "./EventHeader.module.css";

const EventHeader = ({ event }) => {
  if (!event) return <div>Loading event...</div>;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case "high":
        return styles.riskHigh;
      case "medium":
        return styles.riskMedium;
      default:
        return styles.riskLow;
    }
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.eventName}>{event.name}</h1>
      <div className={styles.eventDetails}>
        <p className={styles.date}>📅 {formatDate(event.date)}</p>
        <p className={styles.location}>📍 {event.location}</p>
        <span
          className={`${styles.riskBadge} ${getRiskBadgeClass(event.risk)}`}
        >
          {event.risk.toUpperCase()} RISK
        </span>
      </div>
    </div>
  );
};

export default EventHeader;
