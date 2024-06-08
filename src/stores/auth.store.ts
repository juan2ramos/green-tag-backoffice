import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  AuthStatus,
  User,
} from '@/components/auth/interfaces/user.interface';
import { login, checkStatus } from '@/components/auth/services/auth';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'unauthorized',
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    set({ status: 'pending', token: undefined, user: undefined });
    try {
      const { token, ...user } = await login(email, password);
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw 'Unauthorized';
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await checkStatus();
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
    }
  },

  logoutUser: () => {
    set({ status: 'unauthorized', token: undefined, user: undefined });
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'auth-storage' })),
);
