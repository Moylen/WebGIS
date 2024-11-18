import { IAccessToken, IUser } from '../interfaces';
import api from '../api/api.ts';

class AuthService {
  async login(email: string, password: string): Promise<IAccessToken> {
    const response = await api.post<IAccessToken>('/auth/login', {
      email,
      password,
    });
    return response.data;
  }

  async register(username: string, email: string, password: string): Promise<IUser> {
    const response = await api.post<IUser>('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  }
}

export const authService = new AuthService();
