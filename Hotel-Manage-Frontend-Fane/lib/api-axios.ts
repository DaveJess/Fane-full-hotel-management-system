import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ApiConfig extends AxiosRequestConfig {
  retries?: number;
  timeout?: number;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

interface ApiConfig {
  retries?: number;
  [key: string]: any;
}

// Create axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for token
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getToken();
    if (token && isValidToken(token)) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as any; // Type assertion to fix header type issue
    }
  }
  return config;
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const errorData = error.response?.data;
      
      // Handle validation errors array
      if (Array.isArray(errorData?.errors)) {
        const errorMessages = errorData.errors.map((err: any) => err.msg || err.message).join(', ');
        throw new Error(errorMessages || 'Validation failed');
      }
      
      // Handle single error message
      if (typeof errorData === 'string') {
        throw new Error(errorData);
      }
      
      // Handle error object with message property
      if (errorData?.message) {
        throw new Error(errorData.message);
      }
      
      // Handle error object with error property
      if (errorData?.error) {
        throw new Error(errorData.error);
      }
      
      // Fallback to status text
      throw new Error(error.response.statusText || 'Request failed');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error - no response from server');
    } else {
      // Something else happened
      throw new Error(error.message || 'Request setup failed');
    }
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
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp && payload.exp > Date.now() / 1000;
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
      console.error('API request failed:', error.message);
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
  
  verify: (token: string) =>
    apiClient.get(`/api/auth/verify/${token}`),
};

// Users API
export const usersAPI = {
  getAll: () => apiClient.get('/api/users'),
  getById: (id: string) => apiClient.get(`/api/users/${id}`),
  create: (userData: any) => apiClient.post('/api/users', userData),
  update: (id: string, userData: any) => apiClient.put(`/api/users/${id}`, userData),
  delete: (id: string) => apiClient.delete(`/api/users/${id}`),
  getProfile: () => apiClient.get('/api/users/profile'),
  updateProfile: (userData: any) => apiClient.put('/api/users/profile', userData),
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
  create: (bookingData: any) => apiClient.post('/api/bookings', bookingData),
  update: (id: string, bookingData: any) => apiClient.put(`/api/bookings/${id}`, bookingData),
  delete: (id: string) => apiClient.delete(`/api/bookings/${id}`),
  get: (endpoint: string) => apiClient.get(endpoint), // Custom endpoint support
};
