import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from './providers/RouteProvider';
import './index.scss';
import { AppProvider } from './contexts/AppContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppProvider>
        <RouterProvider />
      </AppProvider>
    </StrictMode>,
  );
}
