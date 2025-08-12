import api from "./axiosInstance";

class AuthService {
   static async login(email: string, password: string) {
      const resp = await api.post('/auth/login', { email, password });
      return resp.data
   }

   static async logout() {
      const resp = await api.post('/auth/logout');
      return resp.data
   }

   static async register(email: string, password: string) {
      const resp = await api.post('/auth/register', { email, password });
      return resp.data
   }

   static async getCurrentUser() {
      const resp = await api.get('/auth/me');
      return resp.data
   }
}

export default AuthService