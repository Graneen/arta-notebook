import styles from '../../styles/Home.module.scss';
import HeaderClientBlock from './HeaderClientBlock';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1>Записная книжка</h1>
        <HeaderClientBlock />
      </div>
    </header>
  );
} 