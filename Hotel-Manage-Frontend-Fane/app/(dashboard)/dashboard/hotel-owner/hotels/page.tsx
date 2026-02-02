'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Star, MapPin, Bed, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data - replace with actual API calls
const hotelsData = [
  {
    _id: '1',
    name: 'Grand Plaza Hotel',
    description: 'Luxury hotel in the heart of the city with world-class amenities',
    location: {
      address: '123 Victoria Island, Lagos',
      city: 'Lagos',
      state: 'Lagos'
    },
    rating: {
      stars: 5,
      averageRating: 4.5,
      reviews: 234
    },
    category: 'luxury',
    grade: 'premium',
    images: ['/hotels/grand-plaza-1.jpg'],
    status: 'active',
    verification: {
      isVerified: true
    },
    statistics: {
      totalRooms: 25,
      availableRooms: 8,
      totalBookings: 156,
      occupancyRate: 68,
      revenue: 1850000
    },
    amenities: ['wifi', 'parking', 'restaurant', 'gym', 'pool', 'spa'],
    pricing: {
      priceRange: {
        minimum: 75000,
        maximum: 250000
      }
    }
  },
  {
    _id: '2',
    name: 'Seaside Resort',
    description: 'Beautiful beachfront resort with stunning ocean views',
    location: {
      address: '456 Beach Road, Calabar',
      city: 'Calabar',
      state: 'Cross River'
    },
    rating: {
      stars: 4,
      averageRating: 4.1,
      reviews: 189
    },
    category: 'standard',
    grade: 'mid-range',
    images: ['/hotels/seaside-1.jpg'],
    status: 'active',
    verification: {
      isVerified: true
    },
    statistics: {
      totalRooms: 20,
      availableRooms: 12,
      totalBookings: 98,
      occupancyRate: 40,
      revenue: 600000
    },
    amenities: ['wifi', 'parking', 'restaurant', 'pool'],
    pricing: {
      priceRange: {
        minimum: 45000,
        maximum: 120000
      }
    }
  }
];

const categoryColors = {
  budget: 'bg-gray-100 text-gray-800',
  standard: 'bg-blue-100 text-blue-800',
  luxury: 'bg-purple-100 text-purple-800'
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  suspended: 'bg-orange-100 text-orange-800'
};

export default function HotelManagement() {
  const [hotels, setHotels] = useState(hotelsData);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.state.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || hotel.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || hotel.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteHotel = (hotelId: string) => {
    if (confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) {
      setHotels(hotels.filter(hotel => hotel._id !== hotelId));
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Hotels</h1>
            <p className="text-gray-600 mt-2">Manage your hotel properties</p>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Hotels</h1>
          <p className="text-gray-600 mt-2">Manage your hotel properties</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Hotel
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <Card key={hotel._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Hotel Image */}
            <div className="relative h-48 bg-gray-200">
              <img
                src={hotel.images[0] || '/placeholder-hotel.jpg'}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className={statusColors[hotel.status]}>
                  {hotel.status}
                </Badge>
              </div>
              {hotel.verification.isVerified && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-green-100 text-green-800">
                    ✓ Verified
                  </Badge>
                </div>
              )}
            </div>

            {/* Hotel Info */}
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{hotel.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location.city}, {hotel.location.state}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {renderStars(hotel.rating.stars)}
                    <span className="ml-2 text-sm text-gray-600">
                      {hotel.rating.averageRating} ({hotel.rating.reviews})
                    </span>
                  </div>
                  <Badge className={categoryColors[hotel.category]}>
                    {hotel.category}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {hotel.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Bed className="w-4 h-4 mr-1" />
                    {hotel.statistics.totalRooms} rooms
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    ₦{hotel.pricing.priceRange.minimum.toLocaleString()} - 
                    ₦{hotel.pricing.priceRange.maximum.toLocaleString()}
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-600">Occupancy</div>
                    <div className="font-semibold">{hotel.statistics.occupancyRate}%</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-600">Revenue</div>
                    <div className="font-semibold">₦{(hotel.statistics.revenue / 1000000).toFixed(1)}M</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Hotel
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bed className="w-4 h-4 mr-2" />
                        Manage Rooms
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteHotel(hotel._id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Hotel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredHotels.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Hotel className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterCategory !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your filters or search query'
                : 'Get started by adding your first hotel'
              }
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Hotel
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Hotel Modal - Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Hotel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Hotel creation form will be implemented here. For now, this is a placeholder.
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateModal(false)}>
                  Create Hotel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
