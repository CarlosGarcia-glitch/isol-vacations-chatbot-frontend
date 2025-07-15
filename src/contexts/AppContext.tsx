import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '../translations/en/global.json';
import es from '../translations/es/global.json';

// Define the shape of the context
interface AppContextType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('es');

  return (
    <AppContext.Provider value={{ isAuth, setIsAuth, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Utility to get translations based on current language
export const useTranslations = () => {
  const { language } = useAppContext();
  if (language === 'es') return es;
  return en;
};
