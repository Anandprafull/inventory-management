// pages/_app.js
import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { CssBaseline } from '@mui/material';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
