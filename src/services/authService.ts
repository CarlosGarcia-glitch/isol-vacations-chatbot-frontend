import api from "./axiosInstance";

class AuthService {
   static async login(email: string, password: string) {
      const resp = await api.post('/auth/login', { email, password });
      return resp.data
   }
}

export default AuthService