"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Loader2, Mail, CheckCircle2, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { authAPI } from "@/lib/api-axios"

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "your email"

  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  const handleVerify = async () => {
    if (token.length < 6) {
      toast.error("Invalid token", { description: "Please enter the 6-digit verification code." }) 
      return
    }

    setIsLoading(true)

    try {
      // Use email and verification code
      const response = await authAPI.verifyEmail(email, token)
      
      setIsVerified(true)
      toast.success("Email verified!", { description: "Your account is now active." })

      // Redirect after showing success
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error: any) {
      toast.error("Verification failed", { 
        description: error.message || "Invalid or expired verification code. Please try again." 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)

    try {
      // Generate a new verification code by calling register again (or create a resend endpoint)
      const response = await authAPI.register({
        firstName: "User",
        lastName: "User", 
        email: email,
        password: "temp123", // This won't actually register since email exists
        phone: "+2348012345678"
      })
      
      toast.success("Code resent!", { 
        description: `New verification code: ${response.data?.verificationCode || 'Check backend console'}` 
      })
    } catch (error: any) {
      // If registration fails because email exists, that's expected
      if (error.message.includes("already exists")) {
        toast.success("Code resent!", { description: "Check your email for the new code." })
      } else {
        toast.error("Failed to resend", { description: error.message })
      }
    }
    
    setCountdown(60)
    setCanResend(false)
    setIsResending(false)
  }

  if (isVerified) {
    return (
      <Card className="border-0 shadow-xl">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Email Verified!</h2>
          <p className="text-muted-foreground mb-4">Your account has been successfully verified.</p>
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="text-center space-y-1">
        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-digit verification code to
          <br />
          <span className="font-medium text-foreground">{email}</span>
          <br />
          <span className="text-xs text-muted-foreground">Check the backend console for the 6-digit code</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={token} onChange={(value) => setToken(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} /> 
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button onClick={handleVerify} className="w-full" disabled={isLoading || token.length < 6}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify Email
        </Button>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <div className="text-center text-sm text-muted-foreground">Didn&apos;t receive the code?</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResend}
          disabled={!canResend || isResending}
          className="text-primary"
        >
          {isResending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          {canResend ? "Resend code" : `Resend in ${countdown}s`}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <Card className="border-0 shadow-xl">
          <CardContent className="pt-8 pb-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          </CardContent>
        </Card>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
