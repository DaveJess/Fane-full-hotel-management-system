import { useState, useEffect } from 'react'
import { bookingsAPI, hotelsAPI } from '@/lib/api'

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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch bookings for stats
        const bookingsData = await bookingsAPI.getAll()
        const hotelsData = await hotelsAPI.getAll()
        
        const totalBookings = bookingsData.length
        const upcomingStays = bookingsData.filter((b: Booking) => 
          b.status === 'confirmed' && new Date(b.checkIn) > new Date()
        ).length
        
        setStats({
          totalBookings,
          upcomingStays,
          favoriteHotels: hotelsData.length,
          reviewsGiven: 0, // TODO: Implement reviews API
          recentBookings: bookingsData.slice(0, 3),
          recommendedHotels: hotelsData.slice(0, 4)
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return { stats, loading, error }
}
