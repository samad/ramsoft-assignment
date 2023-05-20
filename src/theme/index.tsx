import React, { useMemo } from 'react';
import { ThemeProvider, useMediaQuery, createTheme, CssBaseline } from '@mui/material';

const Index = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const customTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: { main: '#FFC107' },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              '*::-webkit-scrollbar': {
                backgroundColor: prefersDarkMode ? '#373737' : '#edecec',
                border: 'none',
              },
              '*::-webkit-scrollbar-thumb': {
                backgroundColor: '#FFC107',
                borderRadius: 6,
              },
            },
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Index;
