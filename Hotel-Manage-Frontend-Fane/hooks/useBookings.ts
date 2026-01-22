import { useState, useEffect } from 'react'
import { authAPI, bookingsAPI, hotelsAPI } from "@/lib/api-axios"

export interface Booking {
  _id: string
  hotel: string | { name: string; location: string }
  room: string | { type: string; price: number }
  checkIn: string
  checkOut: string
  status: 'confirmed' | 'pending' | 'cancelled'
  totalPrice: number
  createdAt: string
}

export interface Hotel {
  _id: string
  name: string
  location: string
  description: string
  images: string[]
  rating: number
  price: number
  amenities: string[]
  rooms: any[]
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = async () => {
    try {
      const data = await bookingsAPI.getAll()
      setBookings(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return { bookings, loading, error, refetch: fetchBookings }
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingStays: 0,
    favoriteHotels: 0,
    reviewsGiven: 0,
    recentBookings: [],
    recommendedHotels: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      const response = await bookingsAPI.get('/stats')
      setStats(response.data)
    } catch (err: any) {
      console.log('Stats API failed, using fallback...')
      try {
        const hotelsData = await hotelsAPI.getAll()
        const fallbackStats = {
          totalBookings: 0,
          upcomingStays: 0,
          favoriteHotels: hotelsData.length,
          reviewsGiven: 0,
          recentBookings: [],
          recommendedHotels: hotelsData.slice(0, 5)
        }
        setStats(fallbackStats)
      } catch (fallbackErr: any) {
        setError(fallbackErr.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return { stats, loading, error, refetch: fetchDashboardData }
}

export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHotels = async () => {
    try {
      const data = await hotelsAPI.getAll()
      setHotels(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  return { hotels, loading, error, refetch: fetchHotels }
}










