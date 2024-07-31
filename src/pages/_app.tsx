import type { AppProps } from 'next/app';
import '../components/Button/button.scss';
import { ThemeProvider } from '../ContextProvider/ContextProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
