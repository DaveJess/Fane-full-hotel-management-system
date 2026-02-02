import { apiClient } from './api-axios';

export interface Room {
  _id: string;
  hotel: string;
  name: string;
  type: string;
  description: string;
  capacity: {
    adults: number;
    children: number;
    total: number;
  };
  size: {
    squareMeters: number;
    squareFeet: number;
  };
  bedConfiguration: {
    type: string;
    count: number;
    extraBed: boolean;
    extraBedCost: number;
  };
  pricing: {
    basePrice: number;
    currency: string;
    weekendSurcharge: number;
    seasonalSurcharge: number;
    extraGuestFee: number;
    taxes: {
      vat: number;
      serviceCharge: number;
      cityTax: number;
    };
  };
  amenities: {
    basic: string[];
    premium: string[];
    services: string[];
  };
  images: string[];
  features: {
    view: string;
    smoking: boolean;
    petsAllowed: boolean;
    accessible: boolean;
    connecting: boolean;
    floor: number;
    roomNumber?: string;
  };
  availability: {
    status: 'available' | 'occupied' | 'maintenance' | 'out_of_order';
    lastCleaned: Date;
    nextCleaning?: Date;
    housekeepingNotes: string;
    maintenanceNotes: string;
  };
  rating: {
    stars: number;
    reviews: number;
    averageRating: number;
  };
  booking: {
    minNights: number;
    maxNights: number;
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
    bookingRules: string[];
  };
  status: 'active' | 'inactive' | 'maintenance' | 'deleted';
  statistics: {
    totalBookings: number;
    occupancyRate: number;
    averageRevenue: number;
    totalRevenue: number;
    averageRating: number;
    lastBooked?: Date;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomData {
  name: string;
  type: string;
  description: string;
  capacity: {
    adults: number;
    children: number;
    total: number;
  };
  size: {
    squareMeters: number;
    squareFeet: number;
  };
  bedConfiguration: {
    type: string;
    count: number;
    extraBed: boolean;
    extraBedCost: number;
  };
  pricing: {
    basePrice: number;
    currency: string;
    weekendSurcharge: number;
    seasonalSurcharge: number;
    extraGuestFee: number;
    taxes: {
      vat: number;
      serviceCharge: number;
      cityTax: number;
    };
  };
  amenities: {
    basic: string[];
    premium: string[];
    services: string[];
  };
  images: string[];
  features: {
    view: string;
    smoking: boolean;
    petsAllowed: boolean;
    accessible: boolean;
    connecting: boolean;
    floor: number;
    roomNumber?: string;
  };
  booking: {
    minNights: number;
    maxNights: number;
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
    bookingRules: string[];
  };
}

export interface UpdateRoomData extends Partial<CreateRoomData> {
  availability?: {
    status: 'available' | 'occupied' | 'maintenance' | 'out_of_order';
    housekeepingNotes?: string;
    maintenanceNotes?: string;
  };
  status?: 'active' | 'inactive' | 'maintenance' | 'deleted';
}

export interface RoomFilters {
  hotelId?: string;
  type?: string;
  status?: string;
  availabilityStatus?: string;
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
  maxCapacity?: number;
  amenities?: string[];
  features?: string[];
  search?: string;
}

export interface RoomSearchResult {
  rooms: Room[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface RoomStatistics {
  room: {
    name: string;
    type: string;
    status: string;
    availability: {
      status: string;
    };
  };
  pricing: {
    basePrice: number;
    currency: string;
  };
  capacity: {
    adults: number;
    children: number;
    total: number;
  };
  statistics: {
    totalBookings: number;
    occupancyRate: number;
    averageRevenue: number;
    totalRevenue: number;
    averageRating: number;
  };
  bookingStats: {
    totalBookings: number;
    currentMonthBookings: number;
    averageStayDuration: number;
    revenue: number;
    occupancyRate: number;
  };
}

export interface RoomType {
  type: string;
  count: number;
  averagePrice: number;
}

export class RoomAPI {
  private baseURL = '/api/room-management';

  async createRoom(hotelId: string, roomData: CreateRoomData): Promise<Room> {
    const response = await apiClient.post<Room>(`${this.baseURL}/hotels/${hotelId}/rooms`, roomData);
    return response.data;
  }

  async updateRoom(roomId: string, updateData: UpdateRoomData): Promise<Room> {
    const response = await apiClient.put<Room>(`${this.baseURL}/rooms/${roomId}`, updateData);
    return response.data;
  }

  async getRoomById(roomId: string): Promise<Room> {
    const response = await apiClient.get<Room>(`${this.baseURL}/rooms/${roomId}`);
    return response.data;
  }

  async getHotelRooms(hotelId: string, page: number = 1, limit: number = 20): Promise<RoomSearchResult> {
    const response = await apiClient.get<RoomSearchResult>(`${this.baseURL}/hotels/${hotelId}/rooms`, {
      params: { page, limit }
    });
    return response.data;
  }

  async searchRooms(filters: RoomFilters, page: number = 1, limit: number = 20): Promise<RoomSearchResult> {
    const response = await apiClient.get<RoomSearchResult>(`${this.baseURL}/rooms/search`, {
      params: { ...filters, page, limit }
    });
    return response.data;
  }

  async deleteRoom(roomId: string): Promise<void> {
    await apiClient.delete(`${this.baseURL}/rooms/${roomId}`);
  }

  async updateRoomAvailability(
    roomId: string, 
    status: 'available' | 'occupied' | 'maintenance' | 'out_of_order', 
    notes?: string
  ): Promise<Room> {
    const response = await apiClient.patch<Room>(`${this.baseURL}/rooms/${roomId}/availability`, { 
      status, 
      notes 
    });
    return response.data;
  }

  async getRoomStatistics(roomId: string): Promise<RoomStatistics> {
    const response = await apiClient.get<RoomStatistics>(`${this.baseURL}/rooms/${roomId}/statistics`);
    return response.data;
  }

  async uploadRoomImages(roomId: string, images: string[]): Promise<Room> {
    const response = await apiClient.post<Room>(`${this.baseURL}/rooms/${roomId}/images`, { images });
    return response.data;
  }

  async removeRoomImage(roomId: string, imageUrl: string): Promise<Room> {
    const response = await apiClient.delete<Room>(`${this.baseURL}/rooms/${roomId}/images`, {
      data: { imageUrl }
    });
    return response.data;
  }

  async getRoomTypes(): Promise<RoomType[]> {
    const response = await apiClient.get<RoomType[]>(`${this.baseURL}/rooms/types`);
    return response.data;
  }

  async getPopularAmenities(limit: number = 10): Promise<{ amenity: string; count: number }[]> {
    const response = await apiClient.get<{ amenity: string; count: number }[]>(`${this.baseURL}/rooms/amenities/popular`, {
      params: { limit }
    });
    return response.data;
  }

  // Helper methods for room management
  async getAvailableRooms(hotelId?: string, page: number = 1, limit: number = 20): Promise<RoomSearchResult> {
    return this.searchRooms({ 
      hotelId, 
      availabilityStatus: 'available' 
    }, page, limit);
  }

  async getRoomsByType(type: string, page: number = 1, limit: number = 20): Promise<RoomSearchResult> {
    return this.searchRooms({ type }, page, limit);
  }

  async getRoomsByPriceRange(
    minPrice: number, 
    maxPrice: number, 
    page: number = 1, 
    limit: number = 20
  ): Promise<RoomSearchResult> {
    return this.searchRooms({ minPrice, maxPrice }, page, limit);
  }

  async getRoomsByCapacity(
    minCapacity: number, 
    maxCapacity?: number, 
    page: number = 1, 
    limit: number = 20
  ): Promise<RoomSearchResult> {
    return this.searchRooms({ minCapacity, maxCapacity }, page, limit);
  }

  async searchRoomsByAmenities(
    amenities: string[], 
    page: number = 1, 
    limit: number = 20
  ): Promise<RoomSearchResult> {
    return this.searchRooms({ amenities }, page, limit);
  }

  async bulkUpdateRoomAvailability(
    updates: Array<{ roomId: string; status: 'available' | 'occupied' | 'maintenance' | 'out_of_order'; notes?: string }>
  ): Promise<Room[]> {
    const promises = updates.map(update => 
      this.updateRoomAvailability(update.roomId, update.status, update.notes)
    );
    return Promise.all(promises);
  }

  async getHotelRoomStatistics(hotelId: string): Promise<{
    totalRooms: number;
    availableRooms: number;
    occupiedRooms: number;
    maintenanceRooms: number;
    averagePrice: number;
    averageRating: number;
    totalRevenue: number;
    averageOccupancyRate: number;
  }> {
    const roomsResult = await this.getHotelRooms(hotelId, 1, 1000); // Get all rooms
    const rooms = roomsResult.rooms;

    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(room => room.availability.status === 'available').length;
    const occupiedRooms = rooms.filter(room => room.availability.status === 'occupied').length;
    const maintenanceRooms = rooms.filter(room => room.availability.status === 'maintenance').length;
    
    const averagePrice = rooms.reduce((sum, room) => sum + room.pricing.basePrice, 0) / totalRooms;
    const averageRating = rooms.reduce((sum, room) => sum + room.rating.averageRating, 0) / totalRooms;
    const totalRevenue = rooms.reduce((sum, room) => sum + room.statistics.totalRevenue, 0);
    const averageOccupancyRate = rooms.reduce((sum, room) => sum + room.statistics.occupancyRate, 0) / totalRooms;

    return {
      totalRooms,
      availableRooms,
      occupiedRooms,
      maintenanceRooms,
      averagePrice: Math.round(averagePrice),
      averageRating: Math.round(averageRating * 10) / 10,
      totalRevenue,
      averageOccupancyRate: Math.round(averageOccupancyRate * 10) / 10
    };
  }
}

export const roomAPI = new RoomAPI();
