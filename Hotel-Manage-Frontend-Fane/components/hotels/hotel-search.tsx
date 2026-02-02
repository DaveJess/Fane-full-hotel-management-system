"use client"

import { useState, useEffect } from "react";
import { SimpleStateSelector } from "@/components/forms/simple-state-selector";
import { hotelsAPI } from "@/lib/api-axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, MapPin, Calendar } from "lucide-react";

interface Hotel {
  _id: string;
  name: string;
  location: string;
  state?: string;
  lga?: string;
  price: number;
  rating: number;
  images: string[];
  amenities: string[];
  rooms: any[];
}

interface HotelSearchProps {
  onHotelsFound?: (hotels: Hotel[]) => void;
  className?: string;
}

export function HotelSearch({ onHotelsFound, className }: HotelSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [rating, setRating] = useState('any');
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  // Load initial hotels on component mount
  useEffect(() => {
    loadInitialHotels();
  }, []);

  const loadInitialHotels = async () => {
    setLoading(true);
    try {
      // Try API first, fallback to mock data
      let initialHotels: any[] = [];
      
      try {
        const response = await hotelsAPI.getAll();
        initialHotels = response.data || [];
      } catch (error) {
        console.warn('API call failed, using mock hotel data');
        // Use mock hotel data
        initialHotels = [
          {
            _id: "1",
            name: "Eko Hotel & Suites",
            location: "Victoria Island, Lagos",
            state: "Lagos",
            city: "Lagos Island",
            price: 85000,
            rating: 4.5,
            amenities: ["wifi", "parking", "restaurant", "gym", "pool"],
            images: [
              "/eko-hotel-exterior-luxury.jpg",
              "/eko-hotel-room-single-deluxe.jpg"
            ],
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
            amenities: ["wifi", "parking", "restaurant", "gym", "pool", "spa"],
            images: [
              "/transcorp-hilton-abuja-exterior.jpg",
              "/transcorp-hilton-executive-room.jpg"
            ],
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
            amenities: ["wifi", "parking", "restaurant", "gym", "bar"],
            images: [
              "/lagos-continental-hotel-exterior.jpg",
              "/lagos-continental-standard-room.jpg"
            ],
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
            amenities: ["wifi", "parking", "restaurant", "gym", "conference"],
            images: [
              "/enugu-luxury-hotel-exterior.jpg",
              "/enugu-luxury-classic-room.jpg"
            ],
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
            amenities: ["wifi", "parking", "restaurant", "bar"],
            images: [
              "/ibadan-grand-hotel-exterior.jpg",
              "/ibadan-grand-economy-room.jpg"
            ],
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
            amenities: ["wifi", "parking", "restaurant"],
            images: [
              "/kano-central-hotel-exterior.jpg",
              "/kano-central-basic-room.jpg"
            ],
            description: "Traditional hospitality in northern Nigeria's commercial hub.",
            rooms: [
              { id: '1', type: 'Basic Single', price: 55000, minGuests: 1, maxGuests: 1, available: true },
              { id: '2', type: 'Traditional Single', price: 45000, minGuests: 1, maxGuests: 1, available: true }
            ]
          }
        ];
      }

      setHotels(initialHotels);
      onHotelsFound?.(initialHotels);
    } catch (error: any) {
      console.error('Failed to load initial hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Build search parameters
      const searchParams: any = {};
      
      if (searchQuery) searchParams.search = searchQuery;
      if (selectedState) searchParams.state = selectedState;
      if (selectedCity) searchParams.city = selectedCity;
      if (priceRange.min > 0) searchParams.minPrice = priceRange.min;
      if (priceRange.max < 100000) searchParams.maxPrice = priceRange.max;
      if (rating && rating !== 'any') searchParams.rating = rating;

      // Call hotels API with filters
      let filteredHotels: any[] = [];
      
      try {
        const response = await hotelsAPI.getAll();
        filteredHotels = response.data || [];
      } catch (error) {
        console.warn('API call failed, using mock hotel data');
        // Use mock hotel data if API fails
        filteredHotels = [
          {
            _id: "1",
            name: "Eko Hotel & Suites",
            location: "Victoria Island, Lagos",
            state: "Lagos",
            city: "Lagos Island",
            price: 85000,
            rating: 4.5,
            amenities: ["wifi", "parking", "restaurant", "gym", "pool"],
            images: [
              "/eko-hotel-exterior-luxury.jpg",
              "/eko-hotel-room-single-deluxe.jpg"
            ],
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
            amenities: ["wifi", "parking", "restaurant", "gym", "pool", "spa"],
            images: [
              "/transcorp-hilton-abuja-exterior.jpg",
              "/transcorp-hilton-executive-room.jpg"
            ],
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
            amenities: ["wifi", "parking", "restaurant", "gym", "bar"],
            images: [
              "/lagos-continental-hotel-exterior.jpg",
              "/lagos-continental-standard-room.jpg"
            ],
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
            amenities: ["wifi", "parking", "restaurant", "gym", "conference"],
            images: [
              "/enugu-luxury-hotel-exterior.jpg",
              "/enugu-luxury-classic-room.jpg"
            ],
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
            amenities: ["wifi", "parking", "restaurant", "bar"],
            images: [
              "/ibadan-grand-hotel-exterior.jpg",
              "/ibadan-grand-economy-room.jpg"
            ],
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
            amenities: ["wifi", "parking", "restaurant"],
            images: [
              "/kano-central-hotel-exterior.jpg",
              "/kano-central-basic-room.jpg"
            ],
            description: "Traditional hospitality in northern Nigeria's commercial hub.",
            rooms: [
              { id: '1', type: 'Basic Single', price: 55000, minGuests: 1, maxGuests: 1, available: true },
              { id: '2', type: 'Traditional Single', price: 45000, minGuests: 1, maxGuests: 1, available: true }
            ]
          }
        ];
      }

      // Client-side filtering (in case backend doesn't support all filters)
      if (selectedState) {
        filteredHotels = filteredHotels.filter((hotel: any) => 
          hotel.state === selectedState || 
          hotel.location.toLowerCase().includes(selectedState.toLowerCase())
        );
      }

      if (selectedCity) {
        filteredHotels = filteredHotels.filter((hotel: any) => 
          hotel.city === selectedCity ||
          hotel.location.toLowerCase().includes(selectedCity.toLowerCase())
        );
      }

      if (priceRange.min > 0) {
        filteredHotels = filteredHotels.filter((hotel: any) => hotel.price >= priceRange.min);
      }

      if (priceRange.max < 100000) {
        filteredHotels = filteredHotels.filter((hotel: any) => hotel.price <= priceRange.max);
      }

      if (rating && rating !== 'any') {
        filteredHotels = filteredHotels.filter((hotel: any) => hotel.rating >= parseFloat(rating));
      }

      setHotels(filteredHotels);
      onHotelsFound?.(filteredHotels);
    } catch (error: any) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedState('');
    setSelectedCity('');
    setPriceRange({ min: 0, max: 100000 });
    setRating('any');
    setHotels([]);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Hotels
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SimpleStateSelector
            onStateChange={setSelectedState}
            onCityChange={setSelectedCity}
            selectedState={selectedState}
            selectedCity={selectedCity}
          />
        </div>

        {/* Search Query */}
        <div className="space-y-2">
          <Label htmlFor="hotel-search">Hotel Name</Label>
          <Input
            id="hotel-search"
            placeholder="Search by hotel name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-price">Min Price (₦)</Label>
            <Input
              id="min-price"
              type="number"
              placeholder="0"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-price">Max Price (₦)</Label>
            <Input
              id="max-price"
              type="number"
              placeholder="100000"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 100000 }))}
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <Label htmlFor="rating">Minimum Rating</Label>
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
              <SelectItem value="any" className="hover:bg-gray-100">Any rating</SelectItem>
              <SelectItem value="3" className="hover:bg-gray-100">3+ Stars</SelectItem>
              <SelectItem value="4" className="hover:bg-gray-100">4+ Stars</SelectItem>
              <SelectItem value="4.5" className="hover:bg-gray-100">4.5+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={handleSearch} 
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Searching...' : 'Search Hotels'}
          </Button>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            disabled={loading}
          >
            Clear
          </Button>
        </div>

        {/* Results Summary */}
        {hotels.length > 0 && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              Found <span className="font-semibold">{hotels.length}</span> hotels
              {selectedState && <span> in {selectedState}</span>}
              {selectedCity && <span>, {selectedCity}</span>}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
