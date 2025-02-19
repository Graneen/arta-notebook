'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/features/authSlice';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Home.module.scss';

export default function HeaderClientBlock() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };
  
  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className={styles.headerContent}>
      <p>Привет, {user?.name || 'Гость'}</p>
      {user ? (
        <button onClick={handleLogout} className={styles.button}>
          Выйти
        </button>
      ) : (
        <button onClick={handleLogin} className={styles.button}>
          Войти
        </button>
      )}
    </div>
  );
} 