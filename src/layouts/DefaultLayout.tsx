import { Navigate } from 'react-router-dom';
import { ContentDefaultLayout } from './components/ContentDefaultLayout';
import { useAuthStore } from '../stores/auth.store';

export const DefaultLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  //const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  if (authStatus === 'authorized') {
    return <ContentDefaultLayout isLoading={false} />;
  }
  return <Navigate to="/auth/login" />;
};
