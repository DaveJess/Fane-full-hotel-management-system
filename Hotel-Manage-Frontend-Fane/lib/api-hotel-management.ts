import { apiClient } from './api-axios';

export interface Hotel {
  _id: string;
  owner: string;
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  rating: {
    stars: number;
    reviews: number;
    averageRating: number;
  };
  category: 'budget' | 'standard' | 'luxury';
  grade: 'economy' | 'mid-range' | 'premium' | 'ultra-luxury';
  amenities: string[];
  images: string[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    paymentMethods: string[];
    petsAllowed: boolean;
    smokingAllowed: boolean;
  };
  facilities: {
    parking: boolean;
    wifi: boolean;
    restaurant: boolean;
    bar: boolean;
    gym: boolean;
    pool: boolean;
    spa: boolean;
    conferenceRooms: number;
    meetingRooms: number;
    banquetHalls: number;
  };
  pricing: {
    currency: string;
    priceRange: {
      minimum: number;
      maximum: number;
    };
    taxes: {
      vat: number;
      serviceCharge: number;
      cityTax: number;
    };
  };
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  verification: {
    isVerified: boolean;
    verifiedAt?: Date;
    verifiedBy?: string;
    documents: string[];
  };
  statistics: {
    totalRooms: number;
    availableRooms: number;
    totalBookings: number;
    occupancyRate: number;
    revenue: number;
    averageRating: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateHotelData {
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  rating: {
    stars: number;
  };
  category: 'budget' | 'standard' | 'luxury';
  grade: 'economy' | 'mid-range' | 'premium' | 'ultra-luxury';
  amenities: string[];
  images: string[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    paymentMethods: string[];
    petsAllowed: boolean;
    smokingAllowed: boolean;
  };
  facilities: {
    parking: boolean;
    wifi: boolean;
    restaurant: boolean;
    bar: boolean;
    gym: boolean;
    pool: boolean;
    spa: boolean;
    conferenceRooms: number;
    meetingRooms: number;
    banquetHalls: number;
  };
  pricing: {
    currency: string;
    priceRange: {
      minimum: number;
      maximum: number;
    };
    taxes: {
      vat: number;
      serviceCharge: number;
      cityTax: number;
    };
  };
}

export interface UpdateHotelData extends Partial<CreateHotelData> {
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
}

export interface HotelFilters {
  city?: string;
  state?: string;
  category?: string;
  grade?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  amenities?: string[];
  search?: string;
  verified?: boolean;
}

export interface HotelSearchResult {
  hotels: Hotel[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface HotelStatistics {
  hotel: {
    name: string;
    category: string;
    grade: string;
    status: string;
    verification: {
      isVerified: boolean;
    };
  };
  rooms: {
    totalRooms: number;
    availableRooms: number;
    occupiedRooms: number;
    maintenanceRooms: number;
    averagePrice: number;
    averageRating: number;
  };
  occupancyRate: number;
  revenue: number;
  totalBookings: number;
}

export class HotelAPI {
  private baseURL = '/api/hotel-management';

  async createHotel(hotelData: CreateHotelData): Promise<Hotel> {
    const response = await apiClient.post<Hotel>(`${this.baseURL}/hotels`, hotelData);
    return response.data;
  }

  async updateHotel(hotelId: string, updateData: UpdateHotelData): Promise<Hotel> {
    const response = await apiClient.put<Hotel>(`${this.baseURL}/hotels/${hotelId}`, updateData);
    return response.data;
  }

  async getHotelById(hotelId: string): Promise<Hotel> {
    const response = await apiClient.get<Hotel>(`${this.baseURL}/hotels/${hotelId}`);
    return response.data;
  }

  async getMyHotels(page: number = 1, limit: number = 10): Promise<HotelSearchResult> {
    const response = await apiClient.get<HotelSearchResult>(`${this.baseURL}/hotels/my`, {
      params: { page, limit }
    });
    return response.data;
  }

  async searchHotels(filters: HotelFilters, page: number = 1, limit: number = 20): Promise<HotelSearchResult> {
    const response = await apiClient.get<HotelSearchResult>(`${this.baseURL}/hotels/search`, {
      params: { ...filters, page, limit }
    });
    return response.data;
  }

  async deleteHotel(hotelId: string): Promise<void> {
    await apiClient.delete(`${this.baseURL}/hotels/${hotelId}`);
  }

  async updateHotelStatus(hotelId: string, status: 'active' | 'inactive' | 'pending' | 'suspended'): Promise<Hotel> {
    const response = await apiClient.patch<Hotel>(`${this.baseURL}/hotels/${hotelId}/status`, { status });
    return response.data;
  }

  async getHotelStatistics(hotelId: string): Promise<HotelStatistics> {
    const response = await apiClient.get<HotelStatistics>(`${this.baseURL}/hotels/${hotelId}/statistics`);
    return response.data;
  }

  async uploadHotelImages(hotelId: string, images: string[]): Promise<Hotel> {
    const response = await apiClient.post<Hotel>(`${this.baseURL}/hotels/${hotelId}/images`, { images });
    return response.data;
  }

  async removeHotelImage(hotelId: string, imageUrl: string): Promise<Hotel> {
    const response = await apiClient.delete<Hotel>(`${this.baseURL}/hotels/${hotelId}/images`, {
      data: { imageUrl }
    });
    return response.data;
  }

  async getHotelCategories(): Promise<{ category: string; count: number }[]> {
    const response = await apiClient.get<{ category: string; count: number }[]>(`${this.baseURL}/hotels/categories`);
    return response.data;
  }

  async getPopularAmenities(limit: number = 10): Promise<{ amenity: string; count: number }[]> {
    const response = await apiClient.get<{ amenity: string; count: number }[]>(`${this.baseURL}/hotels/amenities/popular`, {
      params: { limit }
    });
    return response.data;
  }
}

export const hotelAPI = new HotelAPI();
