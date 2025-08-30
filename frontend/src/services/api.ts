import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Type definitions for API responses
export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },

  // Register a new user
  register: async (userData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  }): Promise<{ user: User; token: string }> => {
    const response = await api.post<{ user: User; token: string }>('/auth/register', userData);
    const { user, token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    return { user, token };
  },

  // Login user
  login: async (credentials: { email: string; password: string }): Promise<{ user: User; token: string }> => {
    const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);
    const { user, token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    return { user, token };
  },

  // Logout user
  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
    await api.post('/auth/logout');
  },
};

export default api;
