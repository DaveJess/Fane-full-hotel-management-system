"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Shield, Mail, Bell, Palette, Globe, Lock, User, CheckCircle2 } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  
  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+2348012345678"
  })

  // Notification state
  const [notificationSettings, setNotificationSettings] = useState({
    bookingConfirmations: true,
    promotionalOffers: false,
    accountUpdates: true,
    newsletter: false
  })

  // Preferences state
  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    currency: "NGN"
  })

  const saveProfile = () => {
    console.log("Saving profile:", profileData)
    // TODO: Add API call to save profile
  }

  const saveNotifications = () => {
    console.log("Saving notifications:", notificationSettings)
    // TODO: Add API call to save notifications
  }

  const savePreferences = () => {
    console.log("Saving preferences:", preferences)
    // TODO: Add API call to save preferences
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Email verified</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              
              <Button onClick={saveProfile} className="bg-green-600 hover:bg-green-700">
                Save Profile Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Password
              </CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>Add an extra layer of security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable 2FA</p>
                  <p className="text-sm text-muted-foreground">Use authenticator app for verification</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>Choose what emails you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Booking Confirmations</p>
                  <p className="text-sm text-muted-foreground">Receive emails when you book a hotel</p>
                </div>
                <Switch 
                  checked={notificationSettings.bookingConfirmations}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, bookingConfirmations: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promotional Offers</p>
                  <p className="text-sm text-muted-foreground">Get special deals and discounts</p>
                </div>
                <Switch 
                  checked={notificationSettings.promotionalOffers}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, promotionalOffers: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Account Updates</p>
                  <p className="text-sm text-muted-foreground">Important account notifications</p>
                </div>
                <Switch 
                  checked={notificationSettings.accountUpdates}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, accountUpdates: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Newsletter</p>
                  <p className="text-sm text-muted-foreground">Weekly updates and travel tips</p>
                </div>
                <Switch 
                  checked={notificationSettings.newsletter}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newsletter: checked})}
                />
              </div>
              
              <Button onClick={saveNotifications} className="bg-green-600 hover:bg-green-700">
                Save Notification Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={preferences.theme === "light" ? "default" : "outline"}
                    onClick={() => setPreferences({...preferences, theme: "light"})}
                  >
                    Light
                  </Button>
                  <Button 
                    variant={preferences.theme === "dark" ? "default" : "outline"}
                    onClick={() => setPreferences({...preferences, theme: "dark"})}
                  >
                    Dark
                  </Button>
                  <Button 
                    variant={preferences.theme === "system" ? "default" : "outline"}
                    onClick={() => setPreferences({...preferences, theme: "system"})}
                  >
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Region
              </CardTitle>
              <CardDescription>Set your language and regional preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select 
                  id="language" 
                  className="w-full p-2 border rounded-md"
                  value={preferences.language}
                  onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                >
                  <option value="en">English</option>
                  <option value="ha">Hausa</option>
                  <option value="yo">Yoruba</option>
                  <option value="ig">Igbo</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <select 
                  id="currency" 
                  className="w-full p-2 border rounded-md"
                  value={preferences.currency}
                  onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                >
                  <option value="NGN">Nigerian Naira (₦)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
              
              <Button onClick={savePreferences} className="bg-green-600 hover:bg-green-700">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}