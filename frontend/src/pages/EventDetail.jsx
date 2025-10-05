// frontend/src/pages/EventDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ← ADD THIS IMPORT
import styles from "./EventDetail.module.css";
import EventHeader from "../components/EventHeader/EventHeader";
import WeatherTimeline from "../components/WeatherTimeline/WeatherTimeline";
import Suggestions from "../components/Suggestions/Suggestions";
import BackButton from "../components/BackButton/BackButton";

export default function EventDetail() {
  const { id } = useParams(); // Now this will work!
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEventData();
  }, [id]);

  const fetchEventData = async () => {
    try {
      console.log("🔄 Fetching event ID:", id);
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/events/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch event: ${response.status}`);
      }

      const eventData = await response.json();
      console.log("✅ Event data received:", eventData);
      setEvent(eventData);
    } catch (err) {
      console.error("❌ Error fetching event:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading event details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!event) {
    return <div className={styles.error}>Event not found</div>;
  }

  return (
    <div className={styles.body}>
      <EventHeader event={event} />
      <WeatherTimeline event={event} />
      <Suggestions event={event} />
      <BackButton />
    </div>
  );
}
