"use client"

import { useState } from "react";
import { StateCitySelector } from "@/components/forms/state-city-selector";
import { State, City } from "@/hooks/useStates";
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
  const [selectedState, setSelectedState] = useState<State>();
  const [selectedCity, setSelectedCity] = useState<City>();
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [rating, setRating] = useState('any');
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Build search parameters
      const searchParams: any = {};
      
      if (searchQuery) searchParams.search = searchQuery;
      if (selectedState) searchParams.state = selectedState.name;
      if (selectedCity) searchParams.city = selectedCity.name;
      if (priceRange.min > 0) searchParams.minPrice = priceRange.min;
      if (priceRange.max < 100000) searchParams.maxPrice = priceRange.max;
      if (rating && rating !== 'any') searchParams.rating = rating;

      // Call hotels API with filters
      const response = await hotelsAPI.getAll();
      let filteredHotels = response.data || [];

      // Client-side filtering (in case backend doesn't support all filters)
      if (selectedState) {
        filteredHotels = filteredHotels.filter((hotel: any) => 
          hotel.state === selectedState.name || 
          hotel.location.toLowerCase().includes(selectedState.name.toLowerCase())
        );
      }

      if (selectedCity) {
        filteredHotels = filteredHotels.filter((hotel: any) => 
          hotel.city === selectedCity.name ||
          hotel.location.toLowerCase().includes(selectedCity.name.toLowerCase())
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
    setSelectedState(undefined);
    setSelectedCity(undefined);
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
          <StateCitySelector
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
            <SelectContent>
              <SelectItem value="any">Any rating</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={handleSearch} 
            disabled={loading}
            className="flex-1"
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
              {selectedState && <span> in {selectedState.name}</span>}
              {selectedCity && <span>, {selectedCity.name}</span>}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
