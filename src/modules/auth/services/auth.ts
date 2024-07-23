import { AxiosError } from 'axios';
import { greenTagApi } from '../../../api/green-tag-api';

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const { data } = await greenTagApi.post<LoginResponse>('/auth/login', {
      email,
      password,
    });

    return data.payload.user;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data);
    }

    throw new Error('Unable to login');
  }
};

export const checkStatus = async (): Promise<User> => {
  try {
    const { data } = await greenTagApi.get<LoginResponse>('/auth/check-status');
    return data.payload.user;
  } catch (error) {
    console.log(error);
    throw new Error('UnAuthorized');
  }
};

export interface LoginResponse {
  success: boolean;
  message: string;
  payload: Payload;
}

export interface Payload {
  user: User;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}
