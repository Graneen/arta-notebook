import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './components/Providers';
import LayoutWrapper from './components/LayoutWrapper';
import './styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Записная книжка',
  description: 'Тестовое приложение на Next.js',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}

