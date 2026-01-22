import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Adebayo Johnson",
    role: "Business Traveler",
    image: "/nigerian-business-man-portrait.jpg",
    content:
      "Fane made my business trips so much easier. I can now book hotels in any state within minutes. The verification system gives me confidence in my choices.",
    rating: 5,
  },
  {
    name: "Chioma Okafor",
    role: "Hotel Owner - Lagos",
    image: "/nigerian-business-woman-portrait.jpg",
    content:
      "As a hotel owner, Fane's dashboard is incredibly intuitive. Managing rooms, prices, and bookings has never been easier. Our occupancy rate increased by 40%!",
    rating: 5,
  },
  {
    name: "Mohammed Bello",
    role: "Family Vacationer",
    image: "/nigerian-man-smiling-portrait.jpg",
    content:
      "Planning our family vacation across Nigeria was seamless with Fane. From Abuja to Calabar, we found perfect family rooms at great prices.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Loved by <span className="text-primary">Thousands</span> of Travelers
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our users and hotel partners say about their Fane experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-fane-yellow text-fane-yellow" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
