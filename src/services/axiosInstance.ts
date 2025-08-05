// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agent-demo-785177279845.us-central1.run.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
