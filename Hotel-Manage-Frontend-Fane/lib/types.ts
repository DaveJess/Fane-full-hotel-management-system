export type UserRole = "user" | "hotel" | "admin" | "superadmin"

export interface User {
  id: string
  fullName: string
  email: string
  nin: string
  role: UserRole
  isVerified: boolean
  createdAt: string
  avatar?: string
  phone?: string
}

export interface Hotel {
  id: string
  name: string
  description: string
  address: string
  city: string
  state: string
  starRating: number
  images: string[]
  amenities: string[]
  priceRange: {
    min: number
    max: number
  }
  ownerId: string
  isVerified: boolean
  createdAt: string
  totalRooms: number
  availableRooms: number
}

export interface Room {
  id: string
  hotelId: string
  type: "single" | "double" | "suite" | "deluxe" | "presidential"
  name: string
  description: string
  price: number
  images: string[]
  amenities: string[]
  capacity: number
  isAvailable: boolean
}

export interface Booking {
  id: string
  userId: string
  hotelId: string
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  paymentStatus: "pending" | "paid" | "refunded"
  createdAt: string
}

export interface Reservation {
  id: string
  bookingId: string
  user: User
  hotel: Hotel
  room: Room
  checkIn: string
  checkOut: string
  status: "active" | "upcoming" | "completed" | "cancelled"
}
