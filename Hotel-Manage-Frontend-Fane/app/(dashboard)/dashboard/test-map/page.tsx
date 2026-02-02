"use client";

import { useState, useEffect } from "react";
import HotelMap from "@/components/maps/hotel-map";

// Sample hotel data for testing
const sampleHotels = [
  {
    id: "1",
    name: "Grand Hotel Lagos",
    location: "Victoria Island, Lagos",
    state: "Lagos",
    city: "Ikeja",
    price: 50000,
    rating: 4.5,
    coordinates: { lat: 6.5244, lng: 3.3792 }
  },
  {
    id: "2", 
    name: "Transcorp Hilton Abuja",
    location: "Central Business District, Abuja",
    state: "FCT",
    city: "Abuja",
    price: 75000,
    rating: 4.8,
    coordinates: { lat: 9.0765, lng: 7.3986 }
  },
  {
    id: "3",
    name: "Le Meridien Port Harcourt",
    location: "Old GRA, Port Harcourt", 
    state: "Rivers",
    city: "Port Harcourt",
    price: 45000,
    rating: 4.2,
    coordinates: { lat: 4.8156, lng: 7.0498 }
  }
];

export default function TestMapPage() {
  const [hotels, setHotels] = useState(sampleHotels);
  const [mapStatus, setMapStatus] = useState("loading");

  useEffect(() => {
    // Check if Google Maps API is loaded
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapStatus("loaded");
        setHotels(sampleHotels);
      } else {
        setMapStatus("error");
      }
    };

    // Check every 2 seconds
    const interval = setInterval(checkGoogleMaps, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Google Maps Test</h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Map Status</h2>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                mapStatus === "loaded" ? "bg-green-100 text-green-800" :
                mapStatus === "error" ? "bg-red-100 text-red-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {mapStatus === "loaded" ? "✅ Google Maps Loaded" :
                 mapStatus === "error" ? "❌ Google Maps Error" :
                 "🔄 Loading..."}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Sample Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-gray-600">{hotel.location}</p>
                  <p className="text-sm">💰 ₦{hotel.price.toLocaleString()}/night</p>
                  <p className="text-sm">⭐ {hotel.rating}</p>
                  <p className="text-xs text-gray-500">
                    📍 {hotel.coordinates.lat}, {hotel.coordinates.lng}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <HotelMap 
          hotels={hotels}
          center={{ lat: 9.0765, lng: 7.3986 }}
          zoom={6}
        />
      </div>
    </div>
  );
}
