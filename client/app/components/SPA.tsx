'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NoteForm from './NoteForm';
import Posts from './Posts';
import styles from '../../app/styles/Home.module.scss';

export default function SPA() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      document.cookie = `token=${token}; path=/`;
    }
  }, [router]);

  return (
    <>
      <div className={styles.card}>
        <Posts />
      </div>
      <div className={styles.card}>
        <NoteForm />
      </div>
    </>
  );
}