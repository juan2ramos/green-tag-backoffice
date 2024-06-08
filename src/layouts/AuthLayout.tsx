import { Navigate } from 'react-router-dom';
import { Background } from './components/BackgroundLogin';
import { useAuthStore } from '../stores/auth.store';

export const AuthLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  return authStatus !== 'authorized' ? <Background /> : <Navigate to="/" />;
};
