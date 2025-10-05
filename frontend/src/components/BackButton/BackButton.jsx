// frontend/src/components/BackButton/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
    // Alternatively, you can use: navigate('/'); to always go to dashboard
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        className={styles.backButton}
        onClick={handleBackClick}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default BackButton;
