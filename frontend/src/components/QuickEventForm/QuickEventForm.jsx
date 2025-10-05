// frontend/src/components/QuickEventForm/QuickEventForm.jsx
import { useState } from "react";
import styles from "./QuickEventForm.module.css";

const QuickEventForm = ({ onEventCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newEvent = await response.json();
        onEventCreated(newEvent);
        setFormData({ name: "", date: "", location: "" });
      }
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>➕ Add New Event</h3>
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
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? "Adding..." : "Add Event"}
      </button>
    </form>
  );
};

export default QuickEventForm;
