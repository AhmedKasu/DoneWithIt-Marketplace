import React, { createContext, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface BreakpointsBooleans {
  isMediumScreen: boolean;
  isSmallScreen: boolean;
  isExtraSmallScreen: boolean;
  isLargerScreen: boolean;
  isSmallerScreen: boolean;
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

  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const isLargerScreen = !isExtraSmallScreen && !isSmallScreen;
  const isSmallerScreen = isExtraSmallScreen || isSmallScreen;

  return (
    <ScreenBreakPoints.Provider
      value={{
        isMediumScreen,
        isSmallScreen,
        isExtraSmallScreen,
        isLargerScreen,
        isSmallerScreen,
      }}>
      {children}
    </ScreenBreakPoints.Provider>
  );
};
