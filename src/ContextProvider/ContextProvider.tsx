import React, { createContext, useContext, ReactNode } from 'react';

interface ContextValue {
  toggleSingleCard: () => void;
  isCardOpened: boolean;
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
  const isCardOpened = false;
  return (
    <AppContext.Provider value={{ toggleSingleCard, isCardOpened }}>{children}</AppContext.Provider>
  );
};
