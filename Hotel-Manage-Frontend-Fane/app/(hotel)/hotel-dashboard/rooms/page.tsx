"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit2, Trash2, Users, BedDouble, ImageIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

const rooms = [
  {
    id: "r1",
    name: "Standard Room",
    type: "single",
    price: 75000,
    capacity: 2,
    description: "Comfortable room with city view",
    amenities: ["Queen Bed", "City View", "Free WiFi", "Air Conditioning"],
    image: "/eko-hotel-room-standard.jpg",
    total: 20,
    available: 8,
    isActive: true,
  },
  {
    id: "r2",
    name: "Deluxe Room",
    type: "double",
    price: 95000,
    capacity: 2,
    description: "Spacious deluxe room with ocean view",
    amenities: ["King Bed", "Ocean View", "Free WiFi", "Mini Bar"],
    image: "/eko-hotel-room-deluxe.jpg",
    total: 15,
    available: 4,
    isActive: true,
  },
  {
    id: "r3",
    name: "Executive Suite",
    type: "suite",
    price: 150000,
    capacity: 4,
    description: "Luxurious suite with separate living area",
    amenities: ["King Bed", "Living Area", "Ocean View", "Lounge Access"],
    image: "/eko-hotel-room-suite.jpg",
    total: 8,
    available: 2,
    isActive: true,
  },
  {
    id: "r4",
    name: "Presidential Suite",
    type: "presidential",
    price: 350000,
    capacity: 6,
    description: "The ultimate luxury experience",
    amenities: ["Master Bedroom", "Private Terrace", "Panoramic View", "Private Chef"],
    image: "/eko-hotel-room-presidential.jpg",
    total: 2,
    available: 1,
    isActive: true,
  },
]

export default function RoomsPage() {
  const [isAddingRoom, setIsAddingRoom] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "",
    price: "",
    capacity: "",
    description: "",
    total: "",
  })

  const handleAddRoom = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success("Room added successfully!")
    setIsLoading(false)
    setIsAddingRoom(false)
    setNewRoom({ name: "", type: "", price: "", capacity: "", description: "", total: "" })
  }

  const handleToggleActive = (roomId: string, isActive: boolean) => {
    toast.success(`Room ${isActive ? "activated" : "deactivated"} successfully!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Room Management</h2>
          <p className="text-muted-foreground">Manage your hotel rooms, pricing, and availability</p>
        </div>
        <Dialog open={isAddingRoom} onOpenChange={setIsAddingRoom}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Room Type</DialogTitle>
              <DialogDescription>Create a new room type for your hotel</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Room Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Deluxe Ocean View"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Room Type</Label>
                  <Select value={newRoom.type} onValueChange={(val) => setNewRoom({ ...newRoom, type: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                      <SelectItem value="presidential">Presidential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="Max guests"
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Night (₦)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="75000"
                    value={newRoom.price}
                    onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total">Total Rooms</Label>
                  <Input
                    id="total"
                    type="number"
                    placeholder="20"
                    value={newRoom.total}
                    onChange={(e) => setNewRoom({ ...newRoom, total: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the room..."
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Room Images</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                  <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingRoom(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleAddRoom} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Room
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Rooms</p>
            <p className="text-3xl font-bold">{rooms.reduce((sum, r) => sum + r.total, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="text-3xl font-bold text-fane-green">{rooms.reduce((sum, r) => sum + r.available, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Occupied</p>
            <p className="text-3xl font-bold text-fane-blue">
              {rooms.reduce((sum, r) => sum + (r.total - r.available), 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Room Types</p>
            <p className="text-3xl font-bold">{rooms.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-48 h-48">
                <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                {!room.isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Inactive</Badge>
                  </div>
                )}
              </div>
              <CardContent className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{room.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{room.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={room.isActive}
                      onCheckedChange={(checked) => handleToggleActive(room.id, checked)}
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{room.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs font-normal">
                      {amenity}
                    </Badge>
                  ))}
                  {room.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs font-normal">
                      +{room.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {room.capacity}
                    </span>
                    <span className="flex items-center gap-1">
                      <BedDouble className="h-4 w-4 text-muted-foreground" />
                      {room.available}/{room.total}
                    </span>
                  </div>
                  <p className="font-bold text-primary">₦{room.price.toLocaleString()}/night</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit2 className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
