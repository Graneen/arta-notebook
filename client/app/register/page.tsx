'use client';

import { useState } from 'react';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { registerUser } from '@/redux/features/authSlice';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ email, password, name })).unwrap();
      router.push('/');
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Регистрация</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.area}
              disabled={isLoading}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.area}
              disabled={isLoading}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.area}
              disabled={isLoading}
            />
          </div>
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
        <p className={styles.link}>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
} 