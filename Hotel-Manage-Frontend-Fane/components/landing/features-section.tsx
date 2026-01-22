import { Card, CardContent } from "@/components/ui/card"
import { Search, CreditCard, Bell, Shield, MapPin, Star, Building2, Clock } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Filter hotels by location, price, star rating, and amenities across all 36 Nigerian states.",
    color: "text-fane-green",
    bgColor: "bg-fane-green/10",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Pay securely with multiple payment options. Get instant receipts via email.",
    color: "text-fane-blue",
    bgColor: "bg-fane-blue/10",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Receive instant booking confirmations and updates from hotels.",
    color: "text-fane-yellow-dark",
    bgColor: "bg-fane-yellow/10",
  },
  {
    icon: Shield,
    title: "Verified Hotels",
    description: "All hotels are verified with genuine reviews and accurate information.",
    color: "text-fane-green",
    bgColor: "bg-fane-green/10",
  },
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    description: "Book hotels in any of the 36 states and FCT across Nigeria.",
    color: "text-fane-blue",
    bgColor: "bg-fane-blue/10",
  },
  {
    icon: Star,
    title: "Best Prices",
    description: "Compare prices and find the best deals on hotels in your destination.",
    color: "text-fane-yellow-dark",
    bgColor: "bg-fane-yellow/10",
  },
  {
    icon: Building2,
    title: "Hotel Dashboard",
    description: "Hotels can manage rooms, pricing, and view bookings in real-time.",
    color: "text-fane-green",
    bgColor: "bg-fane-green/10",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    description: "Book rooms instantly and receive confirmation within seconds.",
    color: "text-fane-blue",
    bgColor: "bg-fane-blue/10",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Everything You Need for <span className="text-primary">Perfect Travel</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Fane provides all the tools for seamless hotel booking and management across Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
