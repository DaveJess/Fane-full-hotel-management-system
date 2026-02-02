'use client';

import React, { useState, useEffect } from 'react';
import { 
  Hotel, 
  Bed, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign,
  Star,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Mock data - replace with actual API calls
const dashboardStats = {
  totalHotels: 2,
  totalRooms: 45,
  occupiedRooms: 32,
  totalBookings: 128,
  revenue: 2450000,
  occupancyRate: 71.1,
  averageRating: 4.3,
  pendingBookings: 8
};

const recentBookings = [
  {
    id: 'BK001',
    guestName: 'Sarah Johnson',
    hotelName: 'Grand Plaza Hotel',
    roomType: 'Deluxe Suite',
    checkIn: '2024-01-23',
    checkOut: '2024-01-25',
    status: 'confirmed',
    amount: 85000
  },
  {
    id: 'BK002',
    guestName: 'Michael Chen',
    hotelName: 'Seaside Resort',
    roomType: 'Ocean View Room',
    checkIn: '2024-01-24',
    checkOut: '2024-01-26',
    status: 'pending',
    amount: 65000
  },
  {
    id: 'BK003',
    guestName: 'Emily Davis',
    hotelName: 'Grand Plaza Hotel',
    roomType: 'Standard Room',
    checkIn: '2024-01-25',
    checkOut: '2024-01-27',
    status: 'confirmed',
    amount: 45000
  }
];

const hotelPerformance = [
  {
    name: 'Grand Plaza Hotel',
    occupancy: 85,
    revenue: 1850000,
    rating: 4.5,
    rooms: 25,
    status: 'active'
  },
  {
    name: 'Seaside Resort',
    occupancy: 62,
    revenue: 600000,
    rating: 4.1,
    rooms: 20,
    status: 'active'
  }
];

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color = 'blue' 
}: {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: any;
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
}) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500'
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center mt-1 text-sm ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'increase' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {change}%
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${colorClasses[color].replace('bg-', 'text-')}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function HotelOwnerDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your hotels.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Hotels"
          value={dashboardStats.totalHotels}
          change={12}
          changeType="increase"
          icon={Hotel}
          color="blue"
        />
        <StatCard
          title="Total Rooms"
          value={dashboardStats.totalRooms}
          change={5}
          changeType="increase"
          icon={Bed}
          color="green"
        />
        <StatCard
          title="Occupancy Rate"
          value={`${dashboardStats.occupancyRate}%`}
          change={3.2}
          changeType="increase"
          icon={TrendingUp}
          color="yellow"
        />
        <StatCard
          title="Total Revenue"
          value={`₦${dashboardStats.revenue.toLocaleString()}`}
          change={18}
          changeType="increase"
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hotel Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Hotel Performance</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotelPerformance.map((hotel, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{hotel.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {hotel.rating}
                        </span>
                        <span>{hotel.rooms} rooms</span>
                        <Badge variant={hotel.status === 'active' ? 'default' : 'secondary'}>
                          {hotel.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₦{hotel.revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{hotel.occupancy}% occupied</p>
                    </div>
                  </div>
                  <Progress value={hotel.occupancy} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Bookings</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{booking.guestName}</h4>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <Hotel className="w-4 h-4 mr-1" />
                        {booking.hotelName} - {booking.roomType}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {booking.checkIn} → {booking.checkOut}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-medium text-gray-900">₦{booking.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">{booking.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Calendar className="w-6 h-6" />
              <span>View Calendar</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Users className="w-6 h-6" />
              <span>Manage Guests</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <DollarSign className="w-6 h-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-gray-900">8 pending bookings to confirm</p>
                  <p className="text-sm text-gray-600">Requires your attention</p>
                </div>
              </div>
              <Button size="sm">Review</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bed className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">3 rooms need maintenance</p>
                  <p className="text-sm text-gray-600">Schedule maintenance</p>
                </div>
              </div>
              <Button size="sm">Schedule</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
