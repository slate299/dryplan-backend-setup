// frontend/src/components/EventCard/EventCard.jsx
import styles from "./EventCard.module.css";

const EventCard = ({ event, onClick }) => {
  const getRiskStyles = (risk) => {
    switch (risk) {
      case "high":
        return { badge: styles.badgeHigh, card: styles.riskHigh };
      case "medium":
        return { badge: styles.badgeMedium, card: styles.riskMedium };
      default:
        return { badge: styles.badgeLow, card: styles.riskLow };
    }
  };

  const { badge: badgeStyle, card: cardStyle } = getRiskStyles(event.risk);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`${styles.card} ${cardStyle}`}
      onClick={() => onClick(event)}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.eventName}>{event.name}</h3>
        <span className={`${styles.riskBadge} ${badgeStyle}`}>
          {event.risk.toUpperCase()}
        </span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.date}>📅 {formatDate(event.date)}</p>
        <p className={styles.location}>📍 {event.location}</p>
      </div>

      <div className={styles.cardFooter}>
        <button className={styles.viewDetailsBtn}>View Details →</button>
      </div>
    </div>
  );
};

export default EventCard;
