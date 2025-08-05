// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_CHAT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
