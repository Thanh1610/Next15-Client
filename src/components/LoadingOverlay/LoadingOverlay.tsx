import React from "react";
import styles from "./loading-overlay.module.css";

const LoadingOverlay: React.FC = () => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"
      style={{ zIndex: 1050 }}
    >
      <div className={styles.loader} />
    </div>
  );
};

export default LoadingOverlay;
