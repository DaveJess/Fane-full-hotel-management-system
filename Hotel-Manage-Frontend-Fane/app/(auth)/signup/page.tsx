"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Lock, User, CreditCard, Building2, Phone } from "lucide-react"
import { toast } from "sonner"
import { authAPI } from "@/lib/api-axios"

type AccountType = "user" | "hotel"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState<AccountType>("user")
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    identification: "NATIONAL_ID",
    id_no: "",
    nin: "",
    phone: "",
    role: "USER",
    hotelName: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password.length < 6) {
      toast.error("Password Too Short", { description: "Password must be at least 6 characters." })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match", { description: "Please make sure your passwords match." })
      return
    }

    if (formData.nin && (formData.nin.length !== 11 || !/^\d{11}$/.test(formData.nin))) {
      toast.error("Invalid NIN", { description: "NIN must be exactly 11 digits." })
      return
    }

    if (!formData.firstname || !formData.lastname) {
      toast.error("Name Required", { description: "Please enter both first and last name." })
      return
    }

    setIsLoading(true)

    try {
      // Split full name into first and last name if needed
      let firstname = formData.firstname
      let lastname = formData.lastname
      
      // If user entered full name in one field, split it
      if (!firstname.includes(' ') && lastname === '') {
        const nameParts = firstname.trim().split(' ')
        firstname = nameParts[0] || ''
        lastname = nameParts.slice(1).join(' ') || 'User'
      }

      const userData = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: accountType === "hotel" ? "HOTEL" : "USER",
        identification: formData.identification,
        id_no: parseInt(formData.id_no) || 12345678901,
        nin: formData.nin || undefined,
        phone: formData.phone || undefined
      }

      console.log('Sending registration data:', userData); // Debug log
      const response = await authAPI.register(userData)
      
      toast.success("Account created!", {
        description: "A verification email has been sent to your email address.",
      })
      router.push("/verify-email?email=" + encodeURIComponent(formData.email))

    } catch (error: any) {
      console.error('Registration error:', error)
      
      // Handle specific error messages
      let errorMessage = error.message || "Please check your information and try again."
      
      if (error.message?.includes("Email already exists")) {
        errorMessage = "This email is already registered. Try logging in or use a different email."
      } else if (error.message?.includes("validation")) {
        errorMessage = "Please check all required fields and try again."
      }
      
      toast.error("Registration failed", { 
        description: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>Join Fane to start booking or listing hotels</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Account Type Selection */}
          <div className="space-y-2">
            <Label>Account Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAccountType("user")}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                  accountType === "user" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <User className={`h-5 w-5 ${accountType === "user" ? "text-primary" : "text-muted-foreground"}`} />
                <div className="text-left">
                  <p className={`font-medium ${accountType === "user" ? "text-primary" : ""}`}>Guest</p>
                  <p className="text-xs text-muted-foreground">Book hotels</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setAccountType("hotel")}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                  accountType === "hotel" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <Building2
                  className={`h-5 w-5 ${accountType === "hotel" ? "text-primary" : "text-muted-foreground"}`}
                />
                <div className="text-left">
                  <p className={`font-medium ${accountType === "hotel" ? "text-primary" : ""}`}>Hotel</p>
                  <p className="text-xs text-muted-foreground">List properties</p>
                </div>
              </button>
            </div>
          </div>

          {/* Hotel Name - Only for hotel accounts */}
          {accountType === "hotel" && (
            <div className="space-y-2">
              <Label htmlFor="hotelName">Hotel Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="hotelName"
                  placeholder="Enter your hotel name"
                  className="pl-10"
                  value={formData.hotelName}
                  onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                  required={accountType === "hotel"}
                />
              </div>
            </div>
          )}

          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstname"
                  placeholder="First name"
                  className="pl-10"
                  value={formData.firstname}
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="lastname"
                  placeholder="Last name"
                  className="pl-10"
                  value={formData.lastname}
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nin">National Identification Number (NIN)</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="nin"
                placeholder="Enter your 11-digit NIN (optional)"
                className="pl-10"
                maxLength={11}
                value={formData.nin}
                onChange={(e) => setFormData({ ...formData, nin: e.target.value.replace(/\D/g, "") })}
              />
            </div>
            <p className="text-xs text-muted-foreground">Optional: Required for identity verification</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="id_no">ID Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="id_no"
                placeholder="Enter your ID number"
                className="pl-10"
                value={formData.id_no}
                onChange={(e) => setFormData({ ...formData, id_no: e.target.value.replace(/\D/g, "") })}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">Required: Your official identification number</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="Enter your phone number"
                className="pl-10"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 6 chars)"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm"
                  className="pl-10"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="rounded border-border"
            />
            <Label htmlFor="showPassword" className="text-sm font-normal cursor-pointer">
              Show passwords
            </Label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
