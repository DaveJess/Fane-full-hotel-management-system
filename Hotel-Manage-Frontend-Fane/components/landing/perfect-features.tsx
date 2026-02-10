import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  CreditCard, 
  Bell, 
  Shield, 
  MapPin, 
  Star, 
  Building2, 
  Clock,
  Users,
  Calendar,
  Phone,
  Globe,
  Hotel,
  Car,
  Utensils,
  Wifi,
  Coffee,
  Dumbbell,
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
  Lock,
  Heart,
  Map,
  Clock3,
  MessageSquare,
  Camera,
  Tv,
  Wind,
  Droplets
} from "lucide-react"

const coreFeatures = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Smart Search",
    description: "Find perfect hotels with AI-powered search across all 36 Nigerian states",
    highlights: ["Location-based", "Price filters", "Real-time availability"],
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Secure Payments",
    description: "Multiple payment options with bank-level security and instant confirmations",
    highlights: ["Stripe integration", "Paystack support", "Wallet system"],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: "Real-time Updates",
    description: "Instant notifications for bookings, payments, and hotel updates",
    highlights: ["WebSocket powered", "Email alerts", "SMS notifications"],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Verified Properties",
    description: "100% verified hotels with genuine reviews and accurate photos",
    highlights: ["Photo verification", "Review authenticity", "Quality checks"],
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  }
]

const travelServices = [
  {
    icon: <Hotel className="h-6 w-6" />,
    title: "Hotel Booking",
    description: "Luxury to budget hotels across Nigeria",
    available: true
  },
  {
    icon: <Car className="h-6 w-6" />,
    title: "Airport Transfer",
    description: "Seamless pickup and drop-off services",
    available: true
  },
  {
    icon: <Utensils className="h-6 w-6" />,
    title: "Local Dining",
    description: "Discover authentic Nigerian cuisine",
    available: true
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "City Tours",
    description: "Expert guided tours and experiences",
    available: true
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Event Booking",
    description: "Conferences and special events",
    available: false
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Travel Insurance",
    description: "Comprehensive coverage options",
    available: false
  }
]

const amenities = [
  { icon: <Wifi className="h-5 w-5" />, name: "Free WiFi", available: true },
  { icon: <Coffee className="h-5 w-5" />, name: "Breakfast Included", available: true },
  { icon: <Dumbbell className="h-5 w-5" />, name: "Fitness Center", available: true },
  { icon: <Car className="h-5 w-5" />, name: "Free Parking", available: true },
  { icon: <Tv className="h-5 w-5" />, name: "Smart TV", available: true },
  { icon: <Wind className="h-5 w-5" />, name: "Air Conditioning", available: true },
  { icon: <Droplets className="h-5 w-5" />, name: "Swimming Pool", available: true },
  { icon: <Camera className="h-5 w-5" />, name: "24/7 Security", available: true }
]

const stats = [
  { number: "1,000+", label: "Hotels Nationwide", icon: <Building2 className="h-5 w-5" /> },
  { number: "36", label: "States Covered", icon: <MapPin className="h-5 w-5" /> },
  { number: "50K+", label: "Happy Customers", icon: <Users className="h-5 w-5" /> },
  { number: "4.8", label: "Average Rating", icon: <Star className="h-5 w-5" /> }
]

export function PerfectFeatures() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800 border-green-200">
            <Zap className="h-4 w-4 mr-2" />
            Complete Travel Ecosystem
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for
            <span className="block text-green-600">Perfect Travel Experience</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From booking to checkout, Fane provides comprehensive tools and services that make travel across Nigeria 
            seamless, secure, and enjoyable.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className={`border-2 ${feature.borderColor} ${feature.bgColor} hover:shadow-lg transition-all duration-300`}>
              <CardContent className="p-8">
                <div className={`${feature.color} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Travel Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Travel Services
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Beyond hotel booking - we offer everything you need for perfect travel
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {travelServices.map((service, index) => (
              <div key={index} className="text-center">
                <div className={`p-4 rounded-xl ${service.available ? 'bg-white border-2 border-green-200' : 'bg-gray-100 border-2 border-gray-200'} mb-3`}>
                  <div className={`${service.available ? 'text-green-600' : 'text-gray-400'} flex justify-center mb-2`}>
                    {service.icon}
                  </div>
                </div>
                <h4 className={`font-semibold text-sm mb-1 ${service.available ? 'text-gray-900' : 'text-gray-500'}`}>
                  {service.title}
                </h4>
                <p className={`text-xs ${service.available ? 'text-gray-600' : 'text-gray-400'}`}>
                  {service.description}
                </p>
                {!service.available && (
                  <Badge variant="outline" className="mt-2 text-xs">
                    Coming Soon
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Amenities */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Standard Hotel Amenities
            </h3>
            <p className="text-lg text-gray-600">
              Expect these and more at our partner hotels
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${amenity.available ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className={amenity.available ? 'text-green-600' : 'text-gray-400'}>
                      {amenity.icon}
                    </div>
                  </div>
                  <span className={`font-medium ${amenity.available ? 'text-gray-900' : 'text-gray-500'}`}>
                    {amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">
              Trusted by Travelers Across Nigeria
            </h3>
            <p className="text-white/90 text-lg">
              Join thousands who trust Fane for their travel needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-1">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
