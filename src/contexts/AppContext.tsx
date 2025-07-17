import { createContext, useContext, useState, ReactNode } from 'react';
import en from '../translations/en/global.json';
import es from '../translations/es/global.json';
import AlertPopup from '@/components/AlertPopup/AlertPopup';
import { AlertColor } from '@mui/material';


// Define interface for Alert state
interface AlertState {
  open: boolean;
  message: string;
  severity: AlertColor;
  autoClose: boolean
}

// Define the shape of the context
interface AppContextType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  alert: AlertState;
  setAlert: (value : AlertState) => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('es');
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    severity: 'success',
    message: 'Funciona',
    autoClose: true
  })

  return (
    <AppContext.Provider value={{ isAuth, setIsAuth, language, setLanguage, alert, setAlert }}>
      {children}
      <AlertPopup {...alert} handleClose={() => setAlert(prevState => ({ ...prevState, open: false }))} />
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

// Utility to show Alerts along the application
export const useAlert = () => {
  const { setAlert } = useAppContext()
  const showAlert = (open: boolean, severity: AlertColor, message: string, autoClose: boolean = true) => {
    setAlert({ open, severity, message, autoClose })
  }
  return { setAlert: showAlert }
}
