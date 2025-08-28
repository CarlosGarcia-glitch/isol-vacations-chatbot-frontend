import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import theme from './assets/theme';
import { AppProvider } from './contexts/AppContext';
import { RouterProvider } from './providers/RouteProvider';

describe('App', () => {
  it('renders the App component', () => {
    render(
      <ThemeProvider theme={theme}>
        <AppProvider>
          <RouterProvider />
        </AppProvider>
      </ThemeProvider>,
    );
    
    expect(
      screen.getByRole('heading', { level: 3, name: 'Bienvenido a ISOL' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Iniciar sesión con google/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('© 2025 by ISOL. All rights reserved'),
    ).toBeInTheDocument();
  });
});
