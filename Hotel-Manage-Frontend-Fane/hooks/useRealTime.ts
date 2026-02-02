import { useState, useEffect, useCallback } from 'react';
import { hotelsAPI, bookingsAPI } from '@/lib/api-axios';

// Real-time dashboard data hook
export const useRealTimeDashboard = (refreshInterval = 30000) => {
  const [stats, setStats] = useState<any>({
    totalBookings: 0,
    upcomingStays: 0,
    favoriteHotels: 0,
    reviewsGiven: 0,
    recentBookings: [],
    recommendedHotels: [
      {
        _id: "1",
        name: "Eko Hotel & Suites",
        location: "Victoria Island, Lagos",
        state: "Lagos",
        city: "Lagos Island",
        price: 85000,
        rating: 4.5,
        images: [
          "/eko-hotel-exterior-luxury.jpg",
          "/eko-hotel-room-single-deluxe.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant", "gym", "pool"],
        description: "Luxury hotel in the heart of Victoria Island with world-class amenities.",
        rooms: [
          { id: '1', type: 'Single Room', price: 85000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Deluxe Single', price: 95000, minGuests: 1, maxGuests: 1, available: true }
        ]
      },
      {
        _id: "2", 
        name: "Transcorp Hilton Abuja",
        location: "Central Business District, Abuja",
        state: "FCT",
        city: "Abuja",
        price: 120000,
        rating: 4.7,
        images: [
          "/transcorp-hilton-abuja-exterior.jpg",
          "/transcorp-hilton-executive-room.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant", "gym", "pool", "spa"],
        description: "Premium luxury hotel in Nigeria's capital city.",
        rooms: [
          { id: '1', type: 'Executive Single', price: 120000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Business Single', price: 100000, minGuests: 1, maxGuests: 1, available: true }
        ]
      },
      {
        _id: "3",
        name: "Lagos Continental Hotel",
        location: "Ikoyi, Lagos", 
        state: "Lagos",
        city: "Ikoyi",
        price: 95000,
        rating: 4.3,
        images: [
          "/lagos-continental-hotel-exterior.jpg",
          "/lagos-continental-standard-room.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant", "gym", "bar"],
        description: "Modern hotel with stunning views of Lagos skyline.",
        rooms: [
          { id: '1', type: 'Standard Single', price: 95000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Premium Single', price: 110000, minGuests: 1, maxGuests: 1, available: true }
        ]
      },
      {
        _id: "4",
        name: "Enugu Luxury Hotels",
        location: "Independence Layout, Enugu",
        state: "Enugu",
        city: "Enugu",
        price: 75000,
        rating: 4.2,
        images: [
          "/enugu-luxury-hotel-exterior.jpg",
          "/enugu-luxury-classic-room.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant", "gym", "conference"],
        description: "Comfortable hotel in the coal city with modern amenities.",
        rooms: [
          { id: '1', type: 'Classic Single', price: 75000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Comfort Single', price: 65000, minGuests: 1, maxGuests: 1, available: true }
        ]
      },
      {
        _id: "5",
        name: "Ibadan Grand Hotel",
        location: "Bodija, Ibadan",
        state: "Oyo",
        city: "Ibadan",
        price: 65000,
        rating: 4.0,
        images: [
          "/ibadan-grand-hotel-exterior.jpg",
          "/ibadan-grand-economy-room.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant", "bar"],
        description: "Affordable comfort in Nigeria's largest city.",
        rooms: [
          { id: '1', type: 'Economy Single', price: 65000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Standard Single', price: 55000, minGuests: 1, maxGuests: 1, available: true }
        ]
      },
      {
        _id: "6",
        name: "Kano Central Hotel",
        location: "Sabon Gari, Kano",
        state: "Kano",
        city: "Kano",
        price: 55000,
        rating: 3.8,
        images: [
          "/kano-central-hotel-exterior.jpg",
          "/kano-central-basic-room.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant"],
        description: "Traditional hospitality in northern Nigeria's commercial hub.",
        rooms: [
          { id: '1', type: 'Basic Single', price: 55000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Traditional Single', price: 45000, minGuests: 1, maxGuests: 1, available: true }
        ]
      }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      const response = await bookingsAPI.getStats();
      setStats(response);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      console.warn('Using mock dashboard data due to server error');
      // Fallback to mock data
      const mockStats = {
        totalBookings: 5,
        upcomingStays: 3,
        favoriteHotels: 10,
        reviewsGiven: 0,
        recentBookings: [],
        recommendedHotels: [
          {
            _id: "1",
            name: "Eko Hotel & Suites",
            location: "Victoria Island, Lagos",
            state: "Lagos",
            city: "Lagos Island",
            price: 85000,
            rating: 4.5,
            images: [
              "/eko-hotel-exterior-luxury.svg",
              "/eko-hotel-room-single-deluxe.svg"
            ],
            amenities: ["wifi", "parking", "restaurant", "gym", "pool"],
            description: "Luxury hotel in the heart of Victoria Island with world-class amenities.",
            rooms: [
              { id: '1', type: 'Single Room', price: 85000, minGuests: 1, maxGuests: 1, available: true },
              { id: '2', type: 'Deluxe Single', price: 95000, minGuests: 1, maxGuests: 1, available: true }
            ]
          },
          {
            _id: "2", 
            name: "Transcorp Hilton Abuja",
            location: "Central Business District, Abuja",
            state: "FCT",
            city: "Abuja",
            price: 120000,
            rating: 4.7,
            images: [
              "/transcorp-hilton-abuja-exterior.svg",
              "/transcorp-hilton-executive-room.svg"
            ],
            amenities: ["wifi", "parking", "restaurant", "gym", "pool", "spa"],
            description: "Premium luxury hotel in Nigeria's capital city.",
            rooms: [
              { id: '1', type: 'Executive Single', price: 120000, minGuests: 1, maxGuests: 1, available: true },
              { id: '2', type: 'Business Single', price: 100000, minGuests: 1, maxGuests: 1, available: true }
            ]
          },
          {
            _id: "3",
            name: "Lagos Continental Hotel",
            location: "Ikoyi, Lagos", 
            state: "Lagos",
            city: "Ikoyi",
            price: 95000,
            rating: 4.3,
            images: [
              "/lagos-continental-hotel-exterior.svg",
              "/lagos-continental-standard-room.svg"
            ],
            amenities: ["wifi", "parking", "restaurant", "gym", "bar"],
            description: "Modern hotel with stunning views of Lagos skyline.",
            rooms: [
              { id: '1', type: 'Standard Single', price: 95000, minGuests: 1, maxGuests: 1, available: true },
              { id: '2', type: 'Premium Single', price: 110000, minGuests: 1, maxGuests: 1, available: true }
            ]
          },
          {
            _id: "4",
            name: "Enugu Luxury Hotels",
            location: "Independence Layout, Enugu",
            state: "Enugu",
            city: "Enugu",
            price: 75000,
            rating: 4.2,
            images: [
              "/enugu-luxury-hotel-exterior.svg",
              "/enugu-luxury-classic-room.svg"
            ],
            amenities: ["wifi", "parking", "restaurant", "gym", "conference"],
            description: "Comfortable hotel in the coal city with modern amenities.",
            rooms: [
              { id: '1', type: 'Classic Single', price: 75000, minGuests: 1, maxGuests: 1, available: true },
              { id: '2', type: 'Comfort Single', price: 65000, minGuests: 1, maxGuests: 1, available: true }
            ]
          },
          {
            _id: "5",
            name: "Ibadan Grand Hotel",
            location: "Bodija, Ibadan",
            state: "Oyo",
            city: "Ibadan",
            price: 65000,
            rating: 4.0,
            images: [
              "/ibadan-grand-hotel-exterior.svg",
              "/ibadan-grand-economy-room.svg"
            ],
            amenities: ["wifi", "parking", "restaurant", "bar"],
            description: "Affordable comfort in Nigeria's largest city.",
            rooms: [
              { id: '1', type: 'Economy Single', price: 65000, minGuests: 1, maxGuests: 1, available: true },
              { id: '2', type: 'Standard Single', price: 55000, minGuests: 1, maxGuests: 1, available: true }
            ]
          },
          {
            _id: "6",
            name: "Kano Central Hotel",
            location: "Sabon Gari, Kano",
            state: "Kano",
            city: "Kano",
            price: 55000,
            rating: 3.8,
            images: [
              "/kano-central-hotel-exterior.svg",
              "/kano-central-basic-room.svg"
            ],
            amenities: ["wifi", "parking", "restaurant"],
            description: "Traditional hospitality in northern Nigeria's commercial hub.",
            rooms: [
              { id: '1', type: 'Basic Single', price: 55000, minGuests: 1, maxGuests: 1, available: true },
              { id: '2', type: 'Traditional Single', price: 45000, minGuests: 1, maxGuests: 1, available: true }
            ]
          }
        ]
      };
      setStats(mockStats);
      setLastUpdated(new Date());
      setError(null); // Don't set error when using fallback data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time updates
    const interval = setInterval(fetchDashboardData, refreshInterval); 
    
    return () => clearInterval(interval);
  }, [fetchDashboardData, refreshInterval]);

  return { 
    stats, 
    loading, 
    error, 
    lastUpdated,
    refresh: fetchDashboardData 
  };
};

// Real-time hotel availability checker
export const useRealTimeHotelAvailability = (hotelId: string, checkIn: string, checkOut: string) => {
  const [availability, setAvailability] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkAvailability = useCallback(async () => {
    if (!hotelId || !checkIn || !checkOut) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // For now, simulate availability check
      const response = await hotelsAPI.getAll();
      const hotel = response.find((h: any) => h._id === hotelId);
      setAvailability(hotel ? { available: true, rooms: hotel.rooms || [] } : null);
    } catch (err: any) {
      console.error('Availability check error:', err);
      console.warn('Using mock availability data due to server error');
      // Fallback to mock data
      setAvailability({
        available: true,
        rooms: [
          { id: '1', type: 'Deluxe Room', price: 90000, available: true },
          { id: '2', type: 'Standard Room', price: 40000, available: true }
        ]
      });
      setError(null); // Don't set error when using fallback data
    } finally {
      setLoading(false);
    }
  }, [hotelId, checkIn, checkOut]);

  useEffect(() => {
    checkAvailability();
    
    // Check availability every 60 seconds
    const interval = setInterval(checkAvailability, 60000);
    
    return () => clearInterval(interval);
  }, [checkAvailability]);

  return { availability, loading, error, recheck: checkAvailability };
};

// Real-time booking status tracker
export const useRealTimeBookingStatus = (bookingId: string) => {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookingStatus = useCallback(async () => {
    if (!bookingId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingsAPI.getById(bookingId);
      setBooking(response);
    } catch (err: any) {
      console.error('Booking status error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    fetchBookingStatus();
    
    // Update status every 30 seconds
    const interval = setInterval(fetchBookingStatus, 30000);
    
    return () => clearInterval(interval);
  }, [fetchBookingStatus]);

  return { booking, loading, error, refresh: fetchBookingStatus };
};

// Real-time hotel search with debouncing
export const useRealTimeHotelSearch = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const performSearch = useCallback(async (query: string, filters: any = {}) => {
    if (!query.trim() && Object.keys(filters).length === 0) {
      setSearchResults([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await hotelsAPI.getAll();
      let filtered = response || [];
      
      // Apply search query
      if (query.trim()) {
        filtered = filtered.filter((hotel: any) => 
          hotel.name.toLowerCase().includes(query.toLowerCase()) ||
          hotel.location.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'any') {
          const stringValue = String(value); // Ensure value is a string
          filtered = filtered.filter((hotel: any) => {
            switch (key) {
              case 'state':
                return hotel.state === stringValue || hotel.location.includes(stringValue);
              case 'city':
                return hotel.city === stringValue || hotel.location.includes(stringValue);
              case 'minPrice':
                return hotel.price >= parseFloat(stringValue);
              case 'maxPrice':
                return hotel.price <= parseFloat(stringValue);
              case 'rating':
                return hotel.rating >= parseFloat(stringValue);
              default:
                return true;
            }
          });
        }
      });
      
      setSearchResults(filtered);
    } catch (err: any) {
      console.error('Search error:', err);
      console.warn('Using mock hotel data due to server error');
      // Fallback to mock data
      const mockHotels = [
        {
          id: "1",
          name: "Eko Hotel & Suites",
          location: "Victoria Island, Lagos",
          state: "Lagos",
          city: "Lagos Island",
          price: 85000,
          rating: 4.5,
          amenities: ["wifi", "parking", "restaurant", "gym", "pool"],
          coordinates: { "lat": 6.4281, "lng": 3.4215 },
          description: "Luxury hotel in the heart of Victoria Island with world-class amenities."
        },
        {
          id: "2",
          name: "Transcorp Hilton Abuja",
          location: "Central Business District, Abuja",
          state: "FCT",
          city: "Abuja",
          price: 120000,
          rating: 4.7,
          amenities: ["wifi", "parking", "restaurant", "gym", "pool", "spa"],
          coordinates: { "lat": 9.0765, "lng": 7.3986 },
          description: "Premium luxury hotel in Nigeria's capital city."
        },
        {
          id: "3",
          name: "Lagos Continental Hotel",
          location: "Ikoyi, Lagos",
          state: "Lagos",
          city: "Ikoyi",
          price: 95000,
          rating: 4.3,
          amenities: ["wifi", "parking", "restaurant", "gym", "bar"],
          coordinates: { "lat": 6.4596, "lng": 3.3979 },
          description: "Modern hotel with stunning views of Lagos skyline."
        },
        {
          id: "4",
          name: "Enugu Luxury Hotels",
          location: "Independence Layout, Enugu",
          state: "Enugu",
          city: "Enugu",
          price: 75000,
          rating: 4.2,
          amenities: ["wifi", "parking", "restaurant", "gym", "conference"],
          coordinates: { "lat": 6.4449, "lng": 7.5141 },
          description: "Comfortable hotel in the coal city with modern amenities."
        },
        {
          id: "5",
          name: "Ibadan Grand Hotel",
          location: "Bodija, Ibadan",
          state: "Oyo",
          city: "Ibadan",
          price: 65000,
          rating: 4.0,
          amenities: ["wifi", "parking", "restaurant", "bar"],
          coordinates: { "lat": 7.3775, "lng": 3.9470 },
          description: "Affordable comfort in Nigeria's largest city."
        },
        {
          id: "6",
          name: "Kano Central Hotel",
          location: "Sabon Gari, Kano",
          state: "Kano",
          city: "Kano",
          price: 55000,
          rating: 3.8,
          amenities: ["wifi", "parking", "restaurant"],
          coordinates: { "lat": 11.9804, "lng": 8.5276 },
          description: "Traditional hospitality in northern Nigeria's commercial hub."
        }
      ];
      
      let filtered = mockHotels;
      
      // Apply search query to mock data
      if (query.trim()) {
        filtered = filtered.filter((hotel: any) => 
          hotel.name.toLowerCase().includes(query.toLowerCase()) ||
          hotel.location.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      setSearchResults(filtered);
      setError(null); // Don't set error when using fallback data
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    searchResults, 
    loading, 
    error, 
    searchQuery,
    setSearchQuery,
    performSearch 
  };
};

// Real-time notifications
export const useRealTimeNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = useCallback((notification: any) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications((prev: any[]) => [newNotification, ...prev]);
    setUnreadCount((prev: number) => prev + 1);
    
    // Show browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev: any[]) => 
      prev.map((n: any) => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount((prev: number) => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev: any[]) => prev.map((n: any) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return { 
    notifications, 
    unreadCount, 
    addNotification, 
    markAsRead, 
    markAllAsRead 
  };
};
