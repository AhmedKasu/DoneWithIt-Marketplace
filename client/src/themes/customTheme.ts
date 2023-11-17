import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      ml: 1000,
      lg: 1230,
      xl: 1436,
      xxl: 1700,
      xxxl: 2100,
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
