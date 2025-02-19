import Header from './header/Header';
import Footer from './Footer';
import styles from '../styles/Home.module.scss';
import LayoutClient from './LayoutClient';
import { headers } from 'next/headers';

export default async function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <>
      <LayoutClient />
      {!isAuthPage && <Header />}
      <main className={styles.main}>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
} 