import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1895,
    },
  },
  palette: {
    appBg: {
      main: '#F0F3F4',
      navbar: '#ffffff',
      sidebar: '#ffffff',
    },
  },
});

export default theme;
