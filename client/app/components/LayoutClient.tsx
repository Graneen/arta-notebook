'use client';

import { useAppDispatch } from '@/redux/hooks';
import { fetchUserData } from '@/redux/features/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LayoutClient() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      document.cookie = `token=${token}; path=/`;
      dispatch(fetchUserData(token));
    }
  }, [router, dispatch]);

  return null;
} 