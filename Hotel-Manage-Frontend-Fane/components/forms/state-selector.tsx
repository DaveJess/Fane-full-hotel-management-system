"use client"

import { useState } from "react";
import { useStates, useLGAs, State, LGA } from "@/hooks/useStates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronDown, MapPin } from "lucide-react";

interface StateSelectorProps {
  onStateChange?: (state: State) => void;
  onLGAChange?: (lga: LGA) => void;
  selectedState?: State;
  selectedLGA?: LGA;
  className?: string;
}

export function StateSelector({ 
  onStateChange, 
  onLGAChange, 
  selectedState, 
  selectedLGA,
  className 
}: StateSelectorProps) {
  const { states, loading: statesLoading, error: statesError } = useStates();
  const { lgas, loading: lgasLoading, error: lgasError } = useLGAs(selectedState?.name || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Filter states based on search
  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.alias.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStateSelect = (stateId: string) => {
    const state = states.find(s => s.id === stateId);
    if (state && onStateChange) {
      onStateChange(state);
    }
    // Reset LGA when state changes
    if (onLGAChange) {
      onLGAChange({} as LGA);
    }
  };

  const handleLGASelect = (lgaId: string) => {
    const lga = lgas.find(l => l.id === lgaId);
    if (lga && onLGAChange) {
      onLGAChange(lga);
    }
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* LGA Selection */}
      {selectedState && (
        <div className="space-y-2">
          <Label htmlFor="lga-select">Local Government Area</Label>
          <Select 
            value={selectedLGA?.id || ''} 
            onValueChange={handleLGASelect}
            disabled={lgasLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={lgasLoading ? "Loading LGAs..." : "Select LGA"} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {lgas.map((lga) => (
                <SelectItem key={lga.id} value={lga.id}>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{lga.name}</div>
                      <div className="text-sm text-muted-foreground">{lga.state_name}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {lgasError && (
            <p className="text-sm text-red-600 mt-1">Error loading LGAs: {lgasError}</p>
          )}
        </div>
      )}

      {/* Selected Display */}
      {selectedState && selectedLGA && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium">
            Selected: {selectedLGA.name}, {selectedState.name}
          </p>
        </div>
      )}
    </div>
  );
}
