"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react"
import { toast } from "sonner"
import { authAPI } from "@/lib/api-axios"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await authAPI.login(formData)
      
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token)
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user))
        }
      }

      toast.success("Login successful!", { description: "Redirecting to dashboard..." })
      
      // Redirect based on user role
      if (response.user?.role === 'superadmin') {
        router.push("/admin")
      } else if (response.user?.role === 'hotel' || response.user?.role === 'HOTEL') {
        router.push("/dashboard/hotel-owner") 
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error("Login failed", { 
        description: error.message || "Please check your credentials and try again." 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </div>

          <div className="relative my-2 w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Test Accounts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 w-full text-xs">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormData({ email: "superadmin@fane.com", password: "SuperAdmin@123" })}
            >
              Super Admin
            </Button>
            <div className="text-center text-muted-foreground text-xs">
              Register a new user or use the Super Admin account above
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
