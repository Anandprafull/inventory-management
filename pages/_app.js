// pages/_app.js
import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '../context/ThemeContext';
import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  // Define your custom theme here
});

function MyApp({ Component, pageProps }) {
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;