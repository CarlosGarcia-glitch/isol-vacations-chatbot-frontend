import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingPage from '@/components/LoadingPage/LoadingPage';
import AuthService from '@/services/authService';
import { useAppContext } from '@/contexts/AppContext';

export const ProtectedRoute = () => {
  const { user, setUser } = useAppContext();
  const [authState, setAuthState] = useState<{
    isValidating: boolean;
    isAuthenticated: boolean
  }>({ isValidating: !user, isAuthenticated: Boolean(user) });

  useEffect(() => {
    if (!authState.isAuthenticated) {
      const getAuth = async () => {
        try {
          const resp = await AuthService.getCurrentUser();
          setUser(resp);
          setAuthState({ isValidating: false, isAuthenticated: true });
        } catch (error) {
          setAuthState(prevState => ({ ...prevState, isValidating: false }))
        }
      }
  
      getAuth();
    }
  }, [authState.isAuthenticated, setUser]);

  if (authState.isValidating) {
    return <LoadingPage />;
  }

  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
