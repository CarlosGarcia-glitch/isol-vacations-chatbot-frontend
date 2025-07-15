import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.scss';
import { AppProvider } from './contexts/AppContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </StrictMode>,
  );
}
