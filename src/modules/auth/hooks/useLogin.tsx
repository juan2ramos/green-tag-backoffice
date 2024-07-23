import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/auth.store';
import { useState } from 'react';
interface Form {
  email: { value: string };
  password: { value: string };
}
export const useLogin = () => {
  const loginUser = useAuthStore((state) => state.loginUser);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>('');
  const status = useAuthStore((state) => state.status);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & Form;
    try {
      await loginUser(email.value, password.value);
      setError(null);
      console.log('Login success');

      navigate('/');
    } catch (error) {
      console.log('Login failed');
      setError(
        'Las credenciales son incorrectas. Por favor, inténtalo de nuevo.',
      );
    }
  };

  return {
    onSubmit,
    status,
    error,
  };
};
