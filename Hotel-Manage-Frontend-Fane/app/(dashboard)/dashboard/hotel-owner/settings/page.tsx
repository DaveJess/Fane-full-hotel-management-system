'use client';

import React, { useState } from 'react';
import { Settings, Bell, Shield, Palette, Globe, CreditCard, HelpCircle, LogOut, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function HotelOwnerSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    bookingAlerts: true,
    paymentAlerts: true,
    reviewAlerts: true,
    maintenanceAlerts: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: '24h',
    loginAlerts: true,
    
    // Preferences
    language: 'english',
    timezone: 'Africa/Lagos',
    currency: 'NGN',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    
    // Display
    darkMode: false,
    compactView: false,
    showAvatars: true,
    
    // Privacy
    profileVisibility: 'public',
    showContactInfo: true,
    allowDirectMessages: true,
    
    // Billing
    autoBilling: true,
    invoiceEmail: true,
    paymentMethod: 'card'
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const settingCategories = [
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Manage your notification preferences'
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      description: 'Security and authentication settings'
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: Palette,
      description: 'Personalize your experience'
    },
    {
      id: 'billing',
      title: 'Billing',
      icon: CreditCard,
      description: 'Payment and billing settings'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {settingCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">{category.title}</div>
                        <div className="text-sm text-gray-500">{category.description}</div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Communication Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, emailNotifications: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-500">Browser push notifications</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, pushNotifications: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Important alerts via SMS</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, smsNotifications: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Alert Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Booking Alerts</Label>
                      <p className="text-sm text-gray-500">New bookings and cancellations</p>
                    </div>
                    <Switch
                      checked={settings.bookingAlerts}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, bookingAlerts: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Payment Alerts</Label>
                      <p className="text-sm text-gray-500">Payment confirmations and failures</p>
                    </div>
                    <Switch
                      checked={settings.paymentAlerts}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, paymentAlerts: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Review Alerts</Label>
                      <p className="text-sm text-gray-500">New guest reviews</p>
                    </div>
                    <Switch
                      checked={settings.reviewAlerts}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, reviewAlerts: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Alerts</Label>
                      <p className="text-sm text-gray-500">Room maintenance issues</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceAlerts}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, maintenanceAlerts: checked})
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, twoFactorAuth: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    checked={settings.loginAlerts}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, loginAlerts: checked})
                    }
                  />
                </div>
                <div>
                  <Label>Session Timeout</Label>
                  <Select 
                    value={settings.sessionTimeout}
                    onValueChange={(value) => setSettings({...settings, sessionTimeout: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Language</Label>
                  <Select 
                    value={settings.language}
                    onValueChange={(value) => setSettings({...settings, language: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Timezone</Label>
                  <Select 
                    value={settings.timezone}
                    onValueChange={(value) => setSettings({...settings, timezone: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Lagos">West Africa Time (WAT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Currency</Label>
                  <Select 
                    value={settings.currency}
                    onValueChange={(value) => setSettings({...settings, currency: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date Format</Label>
                  <Select 
                    value={settings.dateFormat}
                    onValueChange={(value) => setSettings({...settings, dateFormat: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Display Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-gray-500">Use dark theme</p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, darkMode: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compact View</Label>
                      <p className="text-sm text-gray-500">Show more content in less space</p>
                    </div>
                    <Switch
                      checked={settings.compactView}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, compactView: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Avatars</Label>
                      <p className="text-sm text-gray-500">Display user profile pictures</p>
                    </div>
                    <Switch
                      checked={settings.showAvatars}
                      onCheckedChange={(checked) => 
                        setSettings({...settings, showAvatars: checked})
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Export Data</h4>
                  <p className="text-sm text-gray-500">Download all your data</p>
                </div>
                <Button variant="outline">Export</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Delete Account</h4>
                  <p className="text-sm text-gray-500">Permanently delete your account</p>
                </div>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
