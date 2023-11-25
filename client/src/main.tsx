import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './themes/customTheme';
import router from './Routing/Routes';
const queryClient = new QueryClient();

import { AuthProvider } from './context/authContext';
import { ScreenBreakpointsProvider } from './context/screenBreakpoints';
import { FiltersProvider } from './context/FiltersContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <ScreenBreakpointsProvider>
            <FiltersProvider>
              <RouterProvider router={router} />
            </FiltersProvider>
          </ScreenBreakpointsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
