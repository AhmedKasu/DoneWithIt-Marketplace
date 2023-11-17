import React, { createContext, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const IsSmallScreenContext = createContext<boolean | null>(null);

export const useIsSmallScreen = () => {
  const context = useContext(IsSmallScreenContext);
  if (context === null) {
    throw new Error(
      'useIsSmallScreen must be used within a IsSmallScreenProvider'
    );
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const IsSmallScreenProvider: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <IsSmallScreenContext.Provider value={isSmallScreen}>
      {children}
    </IsSmallScreenContext.Provider>
  );
};
