import { User } from '@/models/User';
import api from './axiosInstance';

interface LoginUrlResponse {
  auth_url: string;
}
class AuthService {
  static async login(email: string, password: string) {
    const resp = await api.post('/auth/login', { email, password });
    return resp.data;
  }

  static async getLoginUrl(): Promise<LoginUrlResponse> {
    const response = await api.get('/login');
    return response.data
  }

  static async logout() {
    return await api.get('/logout');
  }

  static async register(email: string, password: string) {
    const resp = await api.post('/auth/register', { email, password });
    return resp.data;
  }

  static async getCurrentUser(): Promise<User> {
    const response =  await api.get('/me');
    return response.data
  }
}

export default AuthService;
