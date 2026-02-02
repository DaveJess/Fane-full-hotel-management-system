"use client"

import { useState } from "react";
import { useStates, useCities, State, LGA } from "@/hooks/useStates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronDown, MapPin, Building2 } from "lucide-react";

interface StateCitySelectorProps {
  onStateChange?: (state: State) => void;
  onCityChange?: (city: LGA) => void;
  selectedState?: State;
  selectedCity?: LGA;
  className?: string;
  showCitySearch?: boolean;
}

export function StateCitySelector({ 
  onStateChange, 
  onCityChange, 
  selectedState, 
  selectedCity,
  className,
  showCitySearch = true
}: StateCitySelectorProps) {
  const { states, loading: statesLoading, error: statesError } = useStates();
  const { cities, loading: citiesLoading } = useCities(selectedState?.name);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const { searchResults, loading: searchLoading } = useCitySearch(citySearchQuery, selectedState?.name);

  // Filter states based on search
  const [stateSearchQuery, setStateSearchQuery] = useState('');
  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(stateSearchQuery.toLowerCase()) ||
    state.alias.toLowerCase().includes(stateSearchQuery.toLowerCase())
  );

  const handleStateSelect = (stateId: string) => {
    const state = states.find(s => s.id === stateId);
    if (state && onStateChange) {
      onStateChange(state);
    }
    // Reset city when state changes
    if (onCityChange) {
      onCityChange({} as City);
    }
    setCitySearchQuery('');
  };

  const handleCitySelect = (cityId: string) => {
    const city = cities.find(c => c.id === cityId) || searchResults.find(c => c.id === cityId);
    if (city && onCityChange) {
      onCityChange(city);
    }
  };

  const displayCities = citySearchQuery ? searchResults : cities;

  if (statesError) {
    return (
      <div className={`p-4 border border-red-200 bg-red-50 rounded-lg ${className}`}>
        <p className="text-red-600">Error loading states: {statesError}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* State Selection */}
      <div className="space-y-2">
        <Label htmlFor="state-select">State</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="state-search"
            placeholder="Search states..."
            value={stateSearchQuery}
            onChange={(e) => setStateSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select 
          value={selectedState?.id || ''} 
          onValueChange={handleStateSelect}
          disabled={statesLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={statesLoading ? "Loading states..." : "Select a state"} />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {filteredStates.map((state) => (
              <SelectItem key={state.id} value={state.id}>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <div>
                    <div className="font-medium">{state.name}</div>
                    <div className="text-sm text-muted-foreground">{state.alias}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Selection */}
      {selectedState && showCitySearch && (
        <div className="space-y-2">
          <Label htmlFor="city-select">City/Town</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="city-search"
              placeholder="Search cities..."
              value={citySearchQuery}
              onChange={(e) => setCitySearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select 
            value={selectedCity?.id || ''} 
            onValueChange={handleCitySelect}
            disabled={citiesLoading || searchLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={
                citiesLoading || searchLoading 
                  ? "Loading cities..." 
                  : "Select a city"
              } />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {displayCities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{city.name}</div>
                      <div className="text-sm text-muted-foreground">{city.state_name}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {displayCities.length === 0 && !citiesLoading && !searchLoading && (
            <p className="text-sm text-muted-foreground">
              {citySearchQuery ? 'No cities found matching your search' : 'No cities available'}
            </p>
          )}
        </div>
      )}

      {/* Selected Display */}
      {selectedState && selectedCity && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium">
            Selected: {selectedCity.name}, {selectedState.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Type: {selectedCity.type || 'LGA'}
          </p>
        </div>
      )}
    </div>
  );
}
