import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../services/firebase';
import { CircularProgress } from '@mui/material';

export const ProtectedRoute = () => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    loading: boolean;
  }>({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setAuthState({ user, loading: false });
    });

    return () => unsubscribe();
  }, []);

  if (authState.loading) {
    return <CircularProgress />;
  }

  return authState.user ? <Outlet /> : <Navigate to="/" replace />;
};
