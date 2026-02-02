import { apiClient } from './api-axios';

export interface Booking {
  _id: string;
  userId: string;
  hotelId: string;
  roomId?: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalAmount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'wallet' | 'card' | 'bank_transfer';
  paymentDetails?: {
    transactionId?: string;
    walletTransactionId?: string;
    paidAt?: string;
    refundedAt?: string;
  };
  roomDetails?: {
    roomType: string;
    roomNumber?: string;
    pricePerNight: number;
  };
  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  bookingReference: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  hotelId: string;
  roomId?: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalAmount: number;
  paymentMethod: 'wallet' | 'card' | 'bank_transfer';
  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  roomDetails?: {
    roomType: string;
    pricePerNight: number;
  };
}

export interface BookingListResponse {
  bookings: Booking[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface BookingApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const bookingAPI = {
  // Create a new booking
  async createBooking(data: CreateBookingRequest): Promise<Booking> {
    const response = await apiClient.post<BookingApiResponse<Booking>>('/api/bookings', data);
    return response.data;
  },

  // Get user's bookings
  async getUserBookings(page: number = 1, limit: number = 10, status?: string): Promise<BookingListResponse> {
    const params: any = { page, limit };
    if (status) params.status = status;
    
    const response = await apiClient.get<BookingApiResponse<BookingListResponse>>('/api/bookings/user', { params });
    return response.data;
  },

  // Get booking by ID
  async getBookingById(id: string): Promise<Booking> {
    const response = await apiClient.get<BookingApiResponse<Booking>>(`/api/bookings/${id}`);
    return response.data;
  },

  // Update booking
  async updateBooking(id: string, data: Partial<Booking>): Promise<Booking> {
    const response = await apiClient.put<BookingApiResponse<Booking>>(`/api/bookings/${id}`, data);
    return response.data;
  },

  // Cancel booking
  async cancelBooking(id: string): Promise<Booking> {
    const response = await apiClient.delete<BookingApiResponse<Booking>>(`/api/bookings/${id}`);
    return response.data;
  },

  // Check availability
  async checkAvailability(params: {
    hotelId: string;
    roomId?: string;
    checkIn: string;
    checkOut: string;
  }): Promise<any> {
    const response = await apiClient.get<BookingApiResponse<any>>('/api/bookings/availability', { params });
    return response.data;
  },

  // Get hotel bookings
  async getHotelBookings(hotelId: string): Promise<Booking[]> {
    const response = await apiClient.get<BookingApiResponse<Booking[]>>(`/api/bookings/hotel/${hotelId}`);
    return response.data;
  }
};
