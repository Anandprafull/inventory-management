import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import '../app/globals.css'; // Ensure Tailwind CSS is imported

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;