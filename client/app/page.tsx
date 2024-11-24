import React from 'react';
import styles from '../app/styles/Home.module.scss';
import SPA from './components/SPA';


export default function New() {
  return (
    <>
      <div className={styles.container}>
      <h1>Записная книжка на NEXT.js + MySQL</h1>
        <div className={styles.grid}>
        <SPA/>
        </div>
      </div>
    </>
  );
}