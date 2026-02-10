"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Search, 
  MapPin, 
  Users, 
  Star, 
  Building2, 
  Shield, 
  Clock,
  Calendar,
  CreditCard,
  Phone,
  Globe,
  Hotel,
  Car,
  Utensils,
  Wifi,
  Coffee,
  Dumbbell,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Award
} from "lucide-react"

export function PerfectTravelHero() {
  const router = useRouter()

  const handleSearch = () => {
    router.push("/dashboard/hotels")
  }

  const features = [
    {
      icon: <Hotel className="h-6 w-6" />,
      title: "1,000+ Hotels",
      description: "Across all 36 Nigerian states"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Properties",
      description: "100% authentic listings"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Secure Payments",
      description: "Multiple payment options"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Always here to help"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Local Expertise",
      description: "Know Nigeria inside out"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Best Price Guarantee",
      description: "Match or beat any price"
    }
  ]

  const services = [
    {
      icon: <Building2 className="h-8 w-8 text-green-600" />,
      title: "Hotel Booking",
      description: "Find and book perfect accommodations"
    },
    {
      icon: <Car className="h-8 w-8 text-blue-600" />,
      title: "Airport Transfers",
      description: "Seamless pickup and drop-off"
    },
    {
      icon: <Utensils className="h-8 w-8 text-orange-600" />,
      title: "Local Dining",
      description: "Discover authentic Nigerian cuisine"
    },
    {
      icon: <MapPin className="h-8 w-8 text-purple-600" />,
      title: "City Tours",
      description: "Explore with expert guides"
    }
  ]

  const amenities = [
    { icon: <Wifi className="h-5 w-5" />, name: "Free WiFi" },
    { icon: <Coffee className="h-5 w-5" />, name: "Breakfast" },
    { icon: <Dumbbell className="h-5 w-5" />, name: "Fitness Center" },
    { icon: <Car className="h-5 w-5" />, name: "Free Parking" }
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-blue-600" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-yellow-400 blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full bg-white blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-6 py-2 text-sm">
              <Sparkles className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
              Everything You Need for Perfect Travel
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight mb-6">
              Fane Provides All Tools for
              <span className="block text-yellow-400">Seamless Hotel Booking</span>
              <span className="block">& Management Across Nigeria</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              From luxury suites in Lagos to budget-friendly stays in Kano, experience the perfect blend of 
              Nigerian hospitality with modern booking technology. Your journey starts here.
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto mb-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Start Your Perfect Journey
              </h3>
              <p className="text-gray-600">
                Search from 1,000+ verified hotels across Nigeria
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
            </div>
            
            <Button onClick={handleSearch} size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg">
              <Search className="mr-2 h-5 w-5" />
              Search Hotels Across Nigeria
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-3 border border-white/20">
                  <div className="text-yellow-400 flex justify-center mb-2">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-white/70 text-xs">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Services Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-16 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Complete Travel Solutions
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Beyond just hotel booking - we provide everything you need for the perfect Nigerian travel experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-white/70 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <div className="inline-flex items-center gap-8 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-medium">Best Price Guarantee</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30" />
              <div className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span className="font-medium">50K+ Happy Customers</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30" />
              <div className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">Award Winning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
