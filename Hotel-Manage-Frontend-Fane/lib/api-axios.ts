import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8003';

interface ApiConfig extends AxiosRequestConfig {
  retries?: number;
  timeout?: number;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// Create axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Single request interceptor for JWT token
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getToken();
    if (token && isValidToken(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  // Minimal logging
  console.log(`🚀 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  
  return config;
});

// Single response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.message}`);
    
    // Surface real backend errors with detailed information
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      console.error(`🔍 Backend Error Details:`, {
        status,
        message: data?.message,
        errors: data?.errors,
        fullData: data
      });
      
      // If there are validation errors, show them
      if (data?.errors && Array.isArray(data.errors)) {
        const validationErrors = data.errors.map((err: any) => err.message || err.msg).join(', ');
        throw new Error(validationErrors);
      }
      
      const errorMessage = data?.message || data?.error || 'Server error';
      throw new Error(errorMessage);
    }
    
    throw error;
  }
);

// Token management functions
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const isValidToken = (token: string): boolean => {
  try {
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const apiClient = {
  async request<T = any>(endpoint: string, options: ApiConfig = {}): Promise<T> {
    const { retries = 3, ...axiosOptions } = options;
    
    try {
      const response = await axiosInstance.request<T>({
        url: endpoint,
        ...axiosOptions,
      });
      
      return response.data;
    } catch (error: any) {
      // Remove all mock data - surface real backend errors
      console.error(`❌ Request failed: ${endpoint}`, error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Server error';
        throw new Error(errorMessage);
      }
      
      throw error;
    }
  },

  get: <T = any>(endpoint: string, config?: ApiConfig) =>
    apiClient.request<T>(endpoint, { ...config, method: 'GET' }),

  post: <T = any>(endpoint: string, data?: any, config?: ApiConfig) =>
    apiClient.request<T>(endpoint, { ...config, method: 'POST', data }),

  put: <T = any>(endpoint: string, data?: any, config?: ApiConfig) =>
    apiClient.request<T>(endpoint, { ...config, method: 'PUT', data }),

  delete: <T = any>(endpoint: string, config?: ApiConfig) =>
    apiClient.request<T>(endpoint, { ...config, method: 'DELETE' }),

  getToken,
  isValidToken,
  setToken,
};

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/api/auth/login', credentials),
  
  register: (userData: any) =>
    apiClient.post('/api/auth/register', userData),
  
  verifyEmail: (email: string, code: string) =>
    apiClient.post('/api/auth/verify-email', { email, code }),
};

// Hotels API
export const hotelsAPI = {
  getAll: () => apiClient.get('/api/hotels'),
  getById: (id: string) => apiClient.get(`/api/hotels/${id}`),
  create: (hotelData: any) => apiClient.post('/api/hotels', hotelData),
  update: (id: string, hotelData: any) => apiClient.put(`/api/hotels/${id}`, hotelData),
  delete: (id: string) => apiClient.delete(`/api/hotels/${id}`),
};

// Bookings API
export const bookingsAPI = {
  getAll: () => apiClient.get('/api/bookings'),
  getById: (id: string) => apiClient.get(`/api/bookings/${id}`),
  getByUser: (userId: string) => apiClient.get(`/api/bookings/user/${userId}`),
  create: (bookingData: any) => apiClient.post('/api/bookings', bookingData),
  update: (id: string, bookingData: any) => apiClient.put(`/api/bookings/${id}`, bookingData),
  cancel: (id: string) => apiClient.post(`/api/bookings/${id}/cancel`),
  getStats: () => apiClient.get('/api/bookings/stats'),
};

// Users API
export const usersAPI = {
  getProfile: () => apiClient.get('/api/users/profile'),
  updateProfile: (userData: any) => apiClient.put('/api/users/profile', userData),
  deleteAccount: () => apiClient.delete('/api/users/account'),
};

// Wallet API
export const walletAPI = {
  getBalance: () => apiClient.get('/api/wallet/balance'),
  getTransactions: () => apiClient.get('/api/wallet/transactions'),
  fund: (amount: number) => apiClient.post('/api/wallet/fund', { amount }),
  withdraw: (amount: number) => apiClient.post('/api/wallet/withdraw', { amount }),
};

export default apiClient;
