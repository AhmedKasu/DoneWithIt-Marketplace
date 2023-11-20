import React, { createContext, useContext, useState } from 'react';

interface AuthContext {
  currentUser: { name: string; id: number } | undefined | null;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<{ name: string; id: number } | undefined | null>
  >;
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const useAuthContext = (): AuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<
    { name: string; id: number } | undefined | null
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        error,
        setError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
