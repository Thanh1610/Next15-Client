import React from 'react';
import styles from './loading-overlay.module.css';

const LoadingOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-[1050] flex items-center justify-center bg-white/70 dark:bg-white/20 backdrop-blur-sm"
      style={{ zIndex: 1050 }}
    >
      <div className={styles.loader} />
    </div>
  );
};

export default LoadingOverlay;
