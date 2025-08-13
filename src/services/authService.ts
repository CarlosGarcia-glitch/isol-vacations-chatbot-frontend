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
    return await api.get('/login');
  }

  static async logout() {
    return await api.get('/logout');
  }

  static async register(email: string, password: string) {
    const resp = await api.post('/auth/register', { email, password });
    return resp.data;
  }

  static async getCurrentUser() {
    const resp = await api.get('/me');
    return resp.data;
  }
}

export default AuthService;
