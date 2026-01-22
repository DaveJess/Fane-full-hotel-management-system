import { useState, useEffect, useCallback } from 'react';
import { hotelsAPI, bookingsAPI } from '@/lib/api-axios';

// Real-time dashboard data hook
export const useRealTimeDashboard = (refreshInterval = 30000) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      const response = await bookingsAPI.get('/stats');
      setStats(response.data);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError(err.message);
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
      const hotel = response.data.find((h: any) => h._id === hotelId);
      setAvailability(hotel ? { available: true, rooms: hotel.rooms || [] } : null);
    } catch (err: any) {
      console.error('Availability check error:', err);
      setError(err.message);
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
      const response = await bookingsAPI.get(`/${bookingId}`);
      setBooking(response.data);
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
      let filtered = response.data || [];
      
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
      setError(err.message);
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
