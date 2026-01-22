const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ApiConfig extends RequestInit {
  retries?: number;
  timeout?: number;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export const apiClient = {
  async request<T = any>(endpoint: string, options: ApiConfig = {}): Promise<T> {
    const { retries = 3, timeout = 10000, ...fetchOptions } = options;
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    };

    // Add timeout if supported
    if (timeout && typeof AbortSignal.timeout === 'function') {
      config.signal = AbortSignal.timeout(timeout);
    } else if (timeout) {
      // Fallback timeout implementation
      const controller = new AbortController();
      setTimeout(() => controller.abort(), timeout);
      config.signal = controller.signal;
    }

    // Add validated token to headers
    if (typeof window !== 'undefined') {
      const token = apiClient.getToken();
      if (token && apiClient.isValidToken(token)) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    let lastError: Error | undefined;
    
    // Retry logic with exponential backoff
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          const errorData = await apiClient.parseError(response);
          lastError = new Error(errorData.message || `HTTP error! status: ${response.status}`);
          
          // Don't retry on client errors (4xx)
          if (response.status >= 400 && response.status < 500) {
            break;
          }
          
          // Wait before retry (exponential backoff)
          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            continue;
          }
          
          throw lastError;
        }
        
        const data = await response.json();
        
        // Validate response structure
        return apiClient.validateResponse(data);
        
      } catch (error) {
        lastError = error as Error;
        console.error(`API request failed (attempt ${attempt}/${retries}):`, error);
        
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    if (lastError) {
      throw lastError;
    } else {
      throw new Error('Request failed after all retries');
    }
  },

  async parseError(response: Response): Promise<{ message?: string }> {
    try {
      const data = await response.json();
      return {
        message: data.message || data.error || `HTTP error! status: ${response.status}`
      };
    } catch {
      return {
        message: `HTTP error! status: ${response.status}`
      };
    }
  },

  validateResponse<T>(data: any): T {
    // Basic validation - can be extended per endpoint
    if (data === null || data === undefined) {
      throw new Error('Invalid response: Empty data received');
    }
    
    // Add more validation as needed
    return data;
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      // Basic JWT validation
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      
      if (payload.exp && payload.exp < now) {
        localStorage.removeItem('token');
        return null;
      }
      
      return token;
    } catch {
      localStorage.removeItem('token');
      return null;
    }
  },

  isValidToken(token: string): boolean {
    if (!token || typeof token !== 'string') return false;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      const now = Date.now() / 1000;
      
      return payload.exp && payload.exp > now;
    } catch {
      return false;
    }
  },

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  put(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  },
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

// Hotels API
export const hotelsAPI = {
  getAll: () => apiClient.get('/api/hotels'),
  getById: (id: string) => apiClient.get(`/api/hotels/${id}`),
  create: (hotelData: any) => apiClient.post('/api/hotels', hotelData),
  update: (id: string, hotelData: any) => apiClient.put(`/api/hotels/${id}`, hotelData),
  delete: (id: string) => apiClient.delete(`/api/hotels/${id}`),
};

// Rooms API
export const roomsAPI = {
  getAll: () => apiClient.get('/api/rooms'),
  getById: (id: string) => apiClient.get(`/api/rooms/${id}`),
  create: (roomData: any) => apiClient.post('/api/rooms', roomData),
  update: (id: string, roomData: any) => apiClient.put(`/api/rooms/${id}`, roomData),
  delete: (id: string) => apiClient.delete(`/api/rooms/${id}`),
};

// Bookings API
export const bookingsAPI = {
  getAll: () => apiClient.get('/api/bookings'),
  getById: (id: string) => apiClient.get(`/api/bookings/${id}`),
  get: (endpoint: string) => apiClient.get(`/api/bookings${endpoint}`),
  create: (bookingData: any) => apiClient.post('/api/bookings', bookingData),
  update: (id: string, bookingData: any) => apiClient.put(`/api/bookings/${id}`, bookingData),
  delete: (id: string) => apiClient.delete(`/api/bookings/${id}`),
};
