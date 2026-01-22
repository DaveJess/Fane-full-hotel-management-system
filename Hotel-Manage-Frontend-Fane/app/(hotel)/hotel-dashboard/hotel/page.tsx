"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, MapPin, Star, Camera, Save, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { nigeriaStates } from "@/lib/nigeria-states"

const amenitiesList = [
  "Free WiFi",
  "Swimming Pool",
  "Fitness Center",
  "Restaurant",
  "Room Service",
  "Free Parking",
  "Air Conditioning",
  "Smart TV",
  "Spa",
  "Business Center",
  "Airport Shuttle",
  "Laundry Service",
  "Bar/Lounge",
  "Conference Rooms",
  "Concierge",
  "24/7 Front Desk",
]

export default function HotelProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hotelData, setHotelData] = useState({
    name: "Eko Hotels & Suites",
    description:
      "Experience luxury at its finest at Eko Hotels & Suites, Lagos' premier 5-star hotel located on the scenic Victoria Island. With stunning ocean views, world-class amenities, and exceptional service, we offer an unforgettable stay for both business and leisure travelers.",
    address: "Plot 1415 Adetokunbo Ademola Street",
    city: "Victoria Island",
    state: "Lagos",
    phone: "+234 1 277 0000",
    email: "reservations@ekohotels.com",
    website: "www.ekohotels.com",
    checkIn: "14:00",
    checkOut: "12:00",
    stars: "5",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Fitness Center",
      "Restaurant",
      "Room Service",
      "Free Parking",
      "Spa",
      "Bar/Lounge",
    ],
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success("Hotel profile updated successfully!")
    setIsSaving(false)
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Hotel Profile</h2>
          <p className="text-muted-foreground">Manage your hotel information and settings</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "secondary" : "outline"}
          className="bg-transparent"
        >
          <Edit2 className="mr-2 h-4 w-4" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Hotel Preview Card */}
      <Card className="overflow-hidden">
        <div className="relative h-48 md:h-64">
          <Image src="/eko-hotel-lagos-exterior.jpg" alt="Hotel" fill className="object-cover" />
          {isEditing && (
            <Button size="sm" className="absolute bottom-4 right-4">
              <Camera className="mr-2 h-4 w-4" />
              Change Cover
            </Button>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(Number.parseInt(hotelData.stars))].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-fane-yellow text-fane-yellow" />
                ))}
                <Badge className="bg-fane-green/10 text-fane-green ml-2">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <h1 className="text-2xl font-bold">{hotelData.name}</h1>
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {hotelData.address}, {hotelData.city}, {hotelData.state}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Overall Rating</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">4.8</span>
                <div>
                  <p className="text-sm font-medium">Excellent</p>
                  <p className="text-xs text-muted-foreground">2,456 reviews</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact & Location</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your hotel&apos;s basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Hotel Name</Label>
                <Input
                  id="name"
                  value={hotelData.name}
                  onChange={(e) => setHotelData({ ...hotelData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stars">Star Rating</Label>
                  <Select
                    value={hotelData.stars}
                    onValueChange={(val) => setHotelData({ ...hotelData, stars: val })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <SelectItem key={star} value={star.toString()}>
                          {star} {star === 1 ? "Star" : "Stars"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Check-in Time</Label>
                    <Input
                      id="checkIn"
                      type="time"
                      value={hotelData.checkIn}
                      onChange={(e) => setHotelData({ ...hotelData, checkIn: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Check-out Time</Label>
                    <Input
                      id="checkOut"
                      type="time"
                      value={hotelData.checkOut}
                      onChange={(e) => setHotelData({ ...hotelData, checkOut: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={hotelData.description}
                  onChange={(e) => setHotelData({ ...hotelData, description: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact & Location</CardTitle>
              <CardDescription>Update your contact information and address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={hotelData.address}
                  onChange={(e) => setHotelData({ ...hotelData, address: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={hotelData.state}
                    onValueChange={(val) => setHotelData({ ...hotelData, state: val })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {nigeriaStates.map((state) => (
                        <SelectItem key={state.code} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={hotelData.city}
                    onChange={(e) => setHotelData({ ...hotelData, city: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={hotelData.phone}
                    onChange={(e) => setHotelData({ ...hotelData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={hotelData.email}
                    onChange={(e) => setHotelData({ ...hotelData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={hotelData.website}
                  onChange={(e) => setHotelData({ ...hotelData, website: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>Select the amenities your hotel offers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Checkbox
                      id={amenity}
                      checked={hotelData.amenities.includes(amenity)}
                      disabled={!isEditing}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setHotelData({ ...hotelData, amenities: [...hotelData.amenities, amenity] })
                        } else {
                          setHotelData({ ...hotelData, amenities: hotelData.amenities.filter((a) => a !== amenity) })
                        }
                      }}
                    />
                    <Label htmlFor={amenity} className="text-sm cursor-pointer">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
}
