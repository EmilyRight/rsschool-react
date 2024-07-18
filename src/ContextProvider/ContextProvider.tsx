/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, ReactNode } from 'react';

interface ContextValue {
  toggleSingleCard: () => void;
}

const AppContext = createContext<ContextValue | undefined>(undefined);

export const useAppContext = (): ContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const toggleSingleCard = () => {
    console.log('Card toggled');
  };

  return <AppContext.Provider value={{ toggleSingleCard }}>{children}</AppContext.Provider>;
};
