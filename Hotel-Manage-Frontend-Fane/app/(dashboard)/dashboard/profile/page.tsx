"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, User } from "lucide-react"

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  useEffect(() => {
    // Get user data from localStorage or API
    const token = localStorage.getItem('token')
    if (token) {
      try {
        // Check if token has the correct format (3 parts separated by dots)
        const parts = token.split('.')
        if (parts.length !== 3) {
          throw new Error('Invalid token format')
        }

        // Decode JWT to get user info (basic implementation)
        const payload = JSON.parse(atob(parts[1]))
        setUserProfile({
          firstName: payload.firstName || payload.name?.split(' ')[0] || 'User',
          lastName: payload.lastName || payload.name?.split(' ').slice(1).join(' ') || '',
          email: payload.email || ''
        })
      } catch (error) {
        console.error('Error decoding token:', error)
        // Fallback data
        setUserProfile({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com'
        })
      }
    } else {
      // No token found, use fallback data
      setUserProfile({
        firstName: 'Guest',
        lastName: 'User',
        email: 'guest@example.com'
      })
    }
  }, [])

  const fullName = `${userProfile.firstName} ${userProfile.lastName}`.trim()

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Avatar */}
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl bg-green-100 text-green-600">
                {userProfile.firstName.charAt(0).toUpperCase()}
                {userProfile.lastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* User Name */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">{fullName}</h1>
              <Badge className="bg-green-100 text-green-700">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified User
              </Badge>
            </div>

            {/* Email */}
            <div className="text-muted-foreground">
              <p className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {userProfile.email}
              </p>
            </div>

            {/* Simple Info */}
            <div className="w-full pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Profile information is managed through your account settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
