"use client";

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SimpleStateSelectorProps {
  onStateChange?: (state: string) => void;
  onCityChange?: (city: string) => void;
  selectedState?: string;
  selectedCity?: string;
  className?: string;
}

// Complete list of all 36 Nigerian states with major cities
const NIGERIAN_STATES = [
  { name: "Abia", cities: ["Umuahia", "Aba", "Arochukwu", "Ohafia", "Bende"] },
  { name: "Adamawa", cities: ["Yola", "Mubi", "Numan", "Jimeta", "Ganye"] },
  { name: "Akwa Ibom", cities: ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak"] },
  { name: "Anambra", cities: ["Awka", "Onitsha", "Nnewi", "Aguata", "Ekwulobia"] },
  { name: "Bauchi", cities: ["Bauchi", "Azare", "Misau", "Jama'are", "Katagum"] },
  { name: "Bayelsa", cities: ["Yenagoa", "Brass", "Nembe", "Ogbia", "Sagbama"] },
  { name: "Benue", cities: ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala", "Vandeikya"] },
  { name: "Borno", cities: ["Maiduguri", "Bama", "Gwoza", "Dikwa", "Monguno"] },
  { name: "Cross River", cities: ["Calabar", "Ikom", "Ogoja", "Obudu", "Akamkpa"] },
  { name: "Delta", cities: ["Asaba", "Warri", "Sapele", "Ughelli", "Agbor"] },
  { name: "Ebonyi", cities: ["Abakaliki", "Afikpo", "Onueke", "Ezza", "Ishielu"] },
  { name: "Edo", cities: ["Benin City", "Auchi", "Uromi", "Ekpoma", "Irrua"] },
  { name: "Ekiti", cities: ["Ado Ekiti", "Ikere Ekiti", "Ijero", "Oye", "Emure"] },
  { name: "Enugu", cities: ["Enugu", "Nsukka", "Awgu", "Udi", "Oji River"] },
  { name: "FCT", cities: ["Abuja", "Gwagwalada", "Kubwa", "Bwari", "Karu"] },
  { name: "Gombe", cities: ["Gombe", "Kaltungo", "Bajoga", "Dukku", "Nafada"] },
  { name: "Imo", cities: ["Owerri", "Orlu", "Okigwe", "Mbaise", "Aboh Mbaise"] },
  { name: "Jigawa", cities: ["Dutse", "Hadejia", "Kazaure", "Ringim", "Birnin Kudu"] },
  { name: "Kaduna", cities: ["Kaduna", "Zaria", "Kafanchan", "Kagoro", "Ikara"] },
  { name: "Kano", cities: ["Kano", "Kura", "Bichi", "Gwarzo", "Dawakin Kudu"] },
  { name: "Katsina", cities: ["Katsina", "Daura", "Funtua", "Malumfashi", "Kankara"] },
  { name: "Kebbi", cities: ["Birnin Kebbi", "Argungu", "Yauri", "Zuru", "Bunza"] },
  { name: "Kogi", cities: ["Lokoja", "Okene", "Kabba", "Idah", "Okehi"] },
  { name: "Kwara", cities: ["Ilorin", "Offa", "Oyun", "Jebba", "Patigi"] },
  { name: "Lagos", cities: ["Ikeja", "Victoria Island", "Lagos Island", "Surulere", "Apapa"] },
  { name: "Nasarawa", cities: ["Keffi", "Lafia", "Akwanga", "Karu", "Wamba"] },
  { name: "Niger", cities: ["Minna", "Bida", "Suleja", "Kontagora", "Lapai"] },
  { name: "Ogun", cities: ["Abeokuta", "Ijebu-Ode", "Sagamu", "Ilaro", "Ota"] },
  { name: "Ondo", cities: ["Akure", "Ondo", "Owo", "Ikare", "Idanre"] },
  { name: "Osun", cities: ["Osogbo", "Ile-Ife", "Ilesha", "Ede", "Ikirun"] },
  { name: "Oyo", cities: ["Ibadan", "Oyo", "Iseyin", "Ogbomoso", "Saki"] },
  { name: "Plateau", cities: ["Jos", "Barkin Ladi", "Pankshin", "Shendam", "Langtang"] },
  { name: "Rivers", cities: ["Port Harcourt", "Obio-Akpor", "Eleme", "Okrika", "Oyigbo"] },
  { name: "Sokoto", cities: ["Sokoto", "Wurno", "Bodinga", "Tambuwal", "Goronyo"] },
  { name: "Taraba", cities: ["Jalingo", "Wukari", "Takum", "Bali", "Sardauna"] },
  { name: "Yobe", cities: ["Damaturu", "Potiskum", "Gashua", "Nguru", "Geidam"] },
  { name: "Zamfara", cities: ["Gusau", "Kaura Namoda", "Talata Mafara", "Bakura", "Shinkafi"] },
];

export function SimpleStateSelector({ 
  onStateChange, 
  onCityChange, 
  selectedState,
  selectedCity,
  className
}: SimpleStateSelectorProps) {
  const [selectedStateName, setSelectedStateName] = useState(selectedState || "");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    if (selectedStateName) {
      const state = NIGERIAN_STATES.find(s => s.name === selectedStateName);
      if (state) {
        setAvailableCities(state.cities);
      }
    }
  }, [selectedStateName]);

  const handleStateSelect = (stateName: string) => {
    setSelectedStateName(stateName);
    if (onStateChange) {
      onStateChange(stateName);
    }
    // Reset city when state changes
    if (onCityChange) {
      onCityChange("");
    }
  };

  const handleCitySelect = (cityName: string) => {
    if (onCityChange) {
      onCityChange(cityName);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* State Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">State</label>
        <Select 
          value={selectedStateName} 
          onValueChange={handleStateSelect}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent className="max-h-60 bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
            {NIGERIAN_STATES.map((state) => (
              <SelectItem key={state.name} value={state.name} className="hover:bg-gray-100">
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Selection */}
      {selectedStateName && (
        <div className="space-y-2">
          <label className="text-sm font-medium">City</label>
          <Select 
            value={selectedCity || ""} 
            onValueChange={handleCitySelect}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent className="max-h-60 bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
              {availableCities.map((city) => (
                <SelectItem key={city} value={city} className="hover:bg-gray-100">
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Selected Display */}
      {selectedStateName && selectedCity && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium">
            Selected: {selectedCity}, {selectedStateName}
          </p>
        </div>
      )}
    </div>
  );
}
