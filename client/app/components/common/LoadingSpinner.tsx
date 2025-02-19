import React from 'react';
import styles from '../../styles/Home.module.scss';

export default function LoadingSpinner() {
  return (
    <div className={styles.loading_container}>
      <div className={styles.spinner}></div>
      <span className={styles.loading_text}>Загрузка...</span>
    </div>
  );
} 