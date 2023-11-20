import React, { createContext, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface BreakpointsBooleans {
  isSmallScreen: boolean;
  isExtraSmallScreen: boolean;
}

const ScreenBreakPoints = createContext<BreakpointsBooleans | null>(null);

export const useScreenBreakingPoints = () => {
  const context = useContext(ScreenBreakPoints);
  if (context === null) {
    throw new Error(
      'useScreenBreakingPoints must be used within a IsSmallScreenProvider'
    );
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const ScreenBreakpointsProvider: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ScreenBreakPoints.Provider value={{ isSmallScreen, isExtraSmallScreen }}>
      {children}
    </ScreenBreakPoints.Provider>
  );
};
