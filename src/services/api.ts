import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Type definitions for API responses
export interface LivestockData {
  total: number;
  vaccinated: number;
}

export interface FarmData {
  totalAcres: number;
  livestock: {
    pigs: LivestockData;
    poultry: LivestockData;
    cattle: LivestockData;
    goats: LivestockData;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  aadhaarNumber: string;
  village: string;
  farmData?: FarmData;
  role?: string;
  token?: string;
  createdAt?: string;
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
    console.log('API - Getting profile...');
    const response = await api.get<{ user: User }>('/auth/profile');
    console.log('API - Profile response:', response.data);
    return response.data.user;
  },

  // Register a new user
  register: async (userData: {
    name: string;
    email: string;
    phone: string;
    flatNo: string;
    street: string;
    district: string;
    state: string;
    aadhaarNumber: string;
    village: string;
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

  // Forgot password - verify email, old password and update with new password
  forgotPassword: async (data: { email: string; oldPassword: string; newPassword: string }): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/forgot-password', data);
    return response.data;
  },

  // Reset password with token
  resetPassword: async (data: { token: string; email: string; password: string }): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/reset-password', data);
    return response.data;
  },

  // Update farm data
  updateFarmData: async (farmData: FarmData): Promise<User> => {
    const response = await api.put<{ user: User }>('/auth/farm-data', { farmData });
    return response.data.user;
  },
};

export default api;
