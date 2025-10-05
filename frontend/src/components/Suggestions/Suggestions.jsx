// frontend/src/components/Suggestions/Suggestions.jsx
import React from "react";
import styles from "./Suggestions.module.css";

const Suggestions = ({ event }) => {
  if (!event) return <div>Loading suggestions...</div>;

  const getBackupSuggestions = (risk, eventType = "") => {
    const baseSuggestions = {
      high: [
        "Move event to indoor venue",
        "Reschedule for a clearer date",
        "Arrange for tents or covered areas",
        "Notify attendees about weather contingency",
      ],
      medium: [
        "Have backup indoor location ready",
        "Prepare rain gear for attendees",
        "Adjust event timing if possible",
        "Monitor weather updates closely",
      ],
      low: [
        "Continue with current plans",
        "Have light rain gear available",
        "Identify nearby covered areas",
        "Enjoy your event!",
      ],
    };

    return baseSuggestions[risk] || baseSuggestions.low;
  };

  const suggestions = getBackupSuggestions(event.risk, event.name);

  return (
    <div className={styles.suggestions}>
      <h2>🌧️ DryPlan Suggestions</h2>
      <div className={styles.suggestionList}>
        {suggestions.map((suggestion, index) => (
          <div key={index} className={styles.suggestionItem}>
            <span className={styles.bullet}>💡</span>
            <p>{suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
