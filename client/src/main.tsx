import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App';

import theme from './themes/customTheme';
const queryClient = new QueryClient();

import { AuthProvider } from './context/authContext';
import { ScreenBreakpointsProvider } from './context/screenBreakpoints';
import { FiltersProvider } from './context/FiltersContext';
import { SocketProvider } from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <ScreenBreakpointsProvider>
            <FiltersProvider>
              <SocketProvider>
                <App />
              </SocketProvider>
            </FiltersProvider>
          </ScreenBreakpointsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
