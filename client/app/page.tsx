"use client"


import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Home from './components/Home';

function MyApp({ pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Home {...pageProps} />
    </Provider>
  );
}

export default MyApp;