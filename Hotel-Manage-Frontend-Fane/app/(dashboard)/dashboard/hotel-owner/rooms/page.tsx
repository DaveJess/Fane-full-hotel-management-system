'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Bed, Users, DollarSign, Wifi, Car, Utensils, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import { Switch } from '@/components/ui/switch';

// Mock data - replace with actual API calls
const roomsData = [
  {
    _id: '1',
    name: 'Deluxe Ocean View Suite',
    type: 'deluxe_double',
    description: 'Spacious suite with stunning ocean views and premium amenities',
    hotel: {
      _id: '1',
      name: 'Grand Plaza Hotel'
    },
    capacity: {
      adults: 2,
      children: 1,
      total: 3
    },
    size: {
      squareMeters: 45,
      squareFeet: 484
    },
    bedConfiguration: {
      type: 'king',
      count: 1,
      extraBed: true,
      extraBedCost: 15000
    },
    pricing: {
      basePrice: 95000,
      currency: 'NGN',
      weekendSurcharge: 20,
      seasonalSurcharge: 15,
      extraGuestFee: 25000
    },
    amenities: {
      basic: ['wifi', 'ac', 'tv', 'minibar', 'safe'],
      premium: ['balcony', 'jacuzzi', 'coffee_machine'],
      services: ['room_service', 'housekeeping', 'concierge']
    },
    images: ['/rooms/deluxe-ocean-1.jpg'],
    features: {
      view: 'ocean',
      smoking: false,
      petsAllowed: false,
      accessible: true,
      connecting: true,
      floor: 5,
      roomNumber: '501'
    },
    availability: {
      status: 'available',
      lastCleaned: new Date('2024-01-22'),
      housekeepingNotes: 'Room cleaned and inspected'
    },
    rating: {
      stars: 5,
      averageRating: 4.7,
      reviews: 89
    },
    status: 'active',
    statistics: {
      totalBookings: 45,
      occupancyRate: 78,
      averageRevenue: 95000,
      totalRevenue: 4275000
    }
  },
  {
    _id: '2',
    name: 'Standard City Room',
    type: 'standard_double',
    description: 'Comfortable room with city views and essential amenities',
    hotel: {
      _id: '1',
      name: 'Grand Plaza Hotel'
    },
    capacity: {
      adults: 2,
      children: 0,
      total: 2
    },
    size: {
      squareMeters: 28,
      squareFeet: 301
    },
    bedConfiguration: {
      type: 'queen',
      count: 1,
      extraBed: false,
      extraBedCost: 0
    },
    pricing: {
      basePrice: 55000,
      currency: 'NGN',
      weekendSurcharge: 15,
      seasonalSurcharge: 10,
      extraGuestFee: 15000
    },
    amenities: {
      basic: ['wifi', 'ac', 'tv', 'minibar'],
      premium: [],
      services: ['housekeeping']
    },
    images: ['/rooms/standard-city-1.jpg'],
    features: {
      view: 'city',
      smoking: false,
      petsAllowed: false,
      accessible: false,
      connecting: false,
      floor: 3,
      roomNumber: '305'
    },
    availability: {
      status: 'occupied',
      lastCleaned: new Date('2024-01-20'),
      housekeepingNotes: 'Guest checked in today'
    },
    rating: {
      stars: 3,
      averageRating: 4.2,
      reviews: 156
    },
    status: 'active',
    statistics: {
      totalBookings: 89,
      occupancyRate: 85,
      averageRevenue: 55000,
      totalRevenue: 4895000
    }
  },
  {
    _id: '3',
    name: 'Family Suite',
    type: 'family_room',
    description: 'Spacious family-friendly suite with separate living area',
    hotel: {
      _id: '2',
      name: 'Seaside Resort'
    },
    capacity: {
      adults: 4,
      children: 2,
      total: 6
    },
    size: {
      squareMeters: 65,
      squareFeet: 699
    },
    bedConfiguration: {
      type: 'king',
      count: 2,
      extraBed: true,
      extraBedCost: 10000
    },
    pricing: {
      basePrice: 125000,
      currency: 'NGN',
      weekendSurcharge: 25,
      seasonalSurcharge: 20,
      extraGuestFee: 20000
    },
    amenities: {
      basic: ['wifi', 'ac', 'tv', 'minibar', 'safe', 'desk'],
      premium: ['living_area', 'kitchenette', 'balcony'],
      services: ['room_service', 'housekeeping', 'laundry']
    },
    images: ['/rooms/family-suite-1.jpg'],
    features: {
      view: 'garden',
      smoking: false,
      petsAllowed: true,
      accessible: true,
      connecting: true,
      floor: 2,
      roomNumber: '201'
    },
    availability: {
      status: 'maintenance',
      lastCleaned: new Date('2024-01-18'),
      housekeepingNotes: 'AC repair in progress',
      maintenanceNotes: 'AC unit needs replacement'
    },
    rating: {
      stars: 4,
      averageRating: 4.5,
      reviews: 67
    },
    status: 'active',
    statistics: {
      totalBookings: 34,
      occupancyRate: 62,
      averageRevenue: 125000,
      totalRevenue: 4250000
    }
  }
];

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  restaurant: Utensils,
  gym: Dumbbell
};

const statusColors = {
  available: 'bg-green-100 text-green-800',
  occupied: 'bg-blue-100 text-blue-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  out_of_order: 'bg-red-100 text-red-800'
};

const availabilityStatusColors = {
  available: 'bg-green-500',
  occupied: 'bg-blue-500',
  maintenance: 'bg-yellow-500',
  out_of_order: 'bg-red-500'
};

export default function RoomManagement() {
  const [rooms, setRooms] = useState(roomsData);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState('all');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.hotel.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || room.type === filterType;
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    const matchesAvailability = filterAvailability === 'all' || room.availability.status === filterAvailability;
    const matchesHotel = selectedHotel === 'all' || room.hotel._id === selectedHotel;

    return matchesSearch && matchesType && matchesStatus && matchesAvailability && matchesHotel;
  });

  const handleDeleteRoom = (roomId: string) => {
    if (confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
      setRooms(rooms.filter(room => room._id !== roomId));
    }
  };

  const handleUpdateAvailability = (roomId: string, newStatus: string) => {
    setRooms(rooms.map(room => 
      room._id === roomId 
        ? { ...room, availability: { ...room.availability, status: newStatus } }
        : room
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      >
        ★
      </div>
    ));
  };

  const getRoomTypeDisplay = (type: string) => {
    const typeMap: Record<string, string> = {
      standard_single: 'Standard Single',
      standard_double: 'Standard Double',
      deluxe_single: 'Deluxe Single',
      deluxe_double: 'Deluxe Double',
      suite: 'Suite',
      executive_suite: 'Executive Suite',
      presidential_suite: 'Presidential Suite',
      family_room: 'Family Room',
      studio: 'Studio',
      apartment: 'Apartment',
      penthouse: 'Penthouse',
      villa: 'Villa'
    };
    return typeMap[type] || type;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
            <p className="text-gray-600 mt-2">Manage your hotel rooms</p>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
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
          <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600 mt-2">Manage your hotel rooms</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Room
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedHotel} onValueChange={setSelectedHotel}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Hotel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hotels</SelectItem>
                <SelectItem value="1">Grand Plaza Hotel</SelectItem>
                <SelectItem value="2">Seaside Resort</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard_single">Standard Single</SelectItem>
                <SelectItem value="standard_double">Standard Double</SelectItem>
                <SelectItem value="deluxe_double">Deluxe Double</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="family_room">Family Room</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterAvailability} onValueChange={setFilterAvailability}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="out_of_order">Out of Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{room.name}</h3>
                    <p className="text-sm text-gray-600">{room.hotel.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{getRoomTypeDisplay(room.type)}</Badge>
                      <Badge className={statusColors[room.availability.status]}>
                        {room.availability.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(room.rating.stars)}
                    <span className="text-sm text-gray-600 ml-1">
                      {room.rating.averageRating}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {room.description}
                </p>

                {/* Key Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {room.capacity.adults} adults, {room.capacity.children} children
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bed className="w-4 h-4 mr-1" />
                    {room.size.squareMeters}m²
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    ₦{room.pricing.basePrice.toLocaleString()}/night
                  </div>
                  <div className="flex items-center text-gray-600">
                    Room {room.features.roomNumber} • Floor {room.features.floor}
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Amenities</p>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.basic.slice(0, 4).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.basic.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{room.amenities.basic.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Availability Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Availability</p>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${availabilityStatusColors[room.availability.status]}`}></div>
                      <span className="text-sm text-gray-600 capitalize">{room.availability.status}</span>
                    </div>
                  </div>
                  {room.availability.status === 'maintenance' && (
                    <div className="bg-yellow-50 p-2 rounded text-sm">
                      <p className="text-yellow-800">{room.availability.maintenanceNotes}</p>
                    </div>
                  )}
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-gray-600">Bookings</div>
                    <div className="font-semibold">{room.statistics.totalBookings}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-gray-600">Occupancy</div>
                    <div className="font-semibold">{room.statistics.occupancyRate}%</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-gray-600">Revenue</div>
                    <div className="font-semibold">₦{(room.statistics.totalRevenue / 1000000).toFixed(1)}M</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
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
                  <div className="flex items-center space-x-2">
                    {room.availability.status === 'available' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateAvailability(room._id, 'occupied')}
                      >
                        Mark Occupied
                      </Button>
                    )}
                    {room.availability.status === 'occupied' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateAvailability(room._id, 'available')}
                      >
                        Mark Available
                      </Button>
                    )}
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
                          Edit Room
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bed className="w-4 h-4 mr-2" />
                          Update Availability
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteRoom(room._id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Room
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bed className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterType !== 'all' || filterAvailability !== 'all'
                ? 'Try adjusting your filters or search query'
                : 'Get started by adding your first room'
              }
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Room
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Room Modal - Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Room</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Room creation form will be implemented here. For now, this is a placeholder.
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateModal(false)}>
                  Create Room
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
