import '@mui/material';
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
  interface PaletteOptions {
    appBg: {
      main: string;
      navbar: string;
      sidebar: string;
    };
  }
}
