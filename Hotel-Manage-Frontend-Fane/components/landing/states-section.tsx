"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, MapPin, Building2 } from "lucide-react"
import { nigeriaStates } from "@/lib/nigeria-states"

const popularStates = [
  { name: "Lagos", hotels: 450, image: "/lagos-nigeria-cityscape-victoria-island.jpg" },
  { name: "Abuja", hotels: 280, image: "/abuja-nigeria-city-center-modern-buildings.jpg" },
  { name: "Rivers", hotels: 120, image: "/port-harcourt-rivers-state-nigeria.jpg" },
  { name: "Oyo", hotels: 95, image: "/ibadan-oyo-state-nigeria.jpg" },
  { name: "Kano", hotels: 85, image: "/kano-city-nigeria.jpg" },
  { name: "Enugu", hotels: 65, image: "/enugu-city-nigeria.jpg" },
]

export function StatesSection() {
  const [showAll, setShowAll] = useState(false)

  return (
    <section id="states" className="py-20 md:py-28">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <Badge variant="outline" className="mb-4">
              <MapPin className="h-3 w-3 mr-1" />
              36 States + FCT
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-balance">
              Explore Hotels Across <span className="text-primary">Nigeria</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              From Lagos to Kano, find the perfect hotel in any Nigerian state.
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "View All States"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Popular States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {popularStates.map((state) => (
            <Link key={state.name} href={`/dashboard/hotels?state=${state.name}`}>
              <Card className="overflow-hidden group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={state.image || "/placeholder.svg"}
                    alt={state.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{state.name}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <Building2 className="h-4 w-4" />
                      <span>{state.hotels} hotels</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* All States Grid */}
        {showAll && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-8 animate-in fade-in duration-300">
            {nigeriaStates.map((state) => (
              <Link key={state.code} href={`/dashboard/hotels?state=${state.name}`}>
                <Card className="hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <p className="font-medium text-sm truncate">{state.name}</p>
                    <p className="text-xs text-muted-foreground">{state.capital}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
