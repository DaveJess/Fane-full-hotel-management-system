"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  state: string;
  city: string;
  price: number;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface HotelMapProps {
  hotels: Hotel[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

export default function HotelMap({ hotels, center, zoom = 12 }: HotelMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      
      window.initGoogleMaps = () => {
        setMapLoaded(true);
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (mapLoaded && hotels.length > 0) {
      initializeMap();
    }
  }, [mapLoaded, hotels]);

  const initializeMap = () => {
    if (!window.google || !window.google.maps) return;

    const mapCenter = center || {
      lat: hotels[0]?.coordinates?.lat || 6.5244, // Lagos default
      lng: hotels[0]?.coordinates?.lng || 3.3792,
    };

    const map = new window.google.maps.Map(
      document.getElementById('hotel-map') as HTMLElement,
      {
        center: mapCenter,
        zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      }
    );

    // Add markers for each hotel
    hotels.forEach((hotel) => {
      if (hotel.coordinates) {
        const marker = new window.google.maps.Marker({
          position: hotel.coordinates,
          map,
          title: hotel.name,
          animation: window.google.maps.Animation.DROP,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="margin: 0 0 5px 0; color: #333;">${hotel.name}</h3>
              <p style="margin: 0 0 5px 0; color: #666;">${hotel.location}</p>
              <p style="margin: 0 0 5px 0; color: #666;">
                <strong>Price:</strong> ₦${hotel.price.toLocaleString()}/night
              </p>
              <p style="margin: 0 0 5px 0; color: #666;">
                <strong>Rating:</strong> ⭐ ${hotel.rating || 'N/A'}
              </p>
              <button 
                onclick="window.open('/dashboard/hotels/${hotel.id}', '_blank')"
                style="
                  background: #3b82f6; 
                  color: white; 
                  border: none; 
                  padding: 8px 12px; 
                  border-radius: 4px; 
                  cursor: pointer;
                  margin-top: 5px;
                "
              >
                View Details
              </button>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          setSelectedHotel(hotel);
        });
      }
    });

    // Auto-fit map to show all markers
    if (hotels.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      hotels.forEach((hotel) => {
        if (hotel.coordinates) {
          bounds.extend(hotel.coordinates);
        }
      });
      map.fitBounds(bounds);
    }
  };

  if (!mapLoaded) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Hotel Locations Map</h2>
        <div 
          id="hotel-map" 
          className="w-full h-96 rounded-lg border border-gray-200"
          style={{ minHeight: '400px' }}
        />
      </div>
      
      {selectedHotel && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Selected Hotel</h3>
          <div className="space-y-1 text-sm">
            <p><strong>Name:</strong> {selectedHotel.name}</p>
            <p><strong>Location:</strong> {selectedHotel.location}</p>
            <p><strong>Price:</strong> ₦{selectedHotel.price.toLocaleString()}/night</p>
            <p><strong>Rating:</strong> ⭐ {selectedHotel.rating || 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Add TypeScript declarations for Google Maps
declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}
