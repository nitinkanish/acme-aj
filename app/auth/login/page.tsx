"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { saveToken, saveCustomer } from "@/lib/auth"
import { wcApiBrowser } from "@/lib/woocommerce"
import { AlertCircle, Loader } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Note: This is a simplified demo. In production, you'd need to:
      // 1. Create a custom JWT auth endpoint
      // 2. Validate credentials securely on the backend
      // 3. Return a valid JWT token

      // For now, we'll simulate authentication
      const response = await wcApiBrowser.get("/customers", {
        params: { search: email },
      })

      const customers = response.data
      if (!customers || customers.length === 0) {
        setError("Invalid email or password")
        return
      }

      const customer = customers[0]

      // In production: verify password hash on backend
      const token = {
        token: `wc-token-${customer.id}-${Date.now()}`,
        customerId: customer.id,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      }

      saveToken(token)
      saveCustomer(customer)

      router.push("/account/dashboard")
    } catch (err) {
      setError("Authentication failed. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold prose-headings mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground mb-2">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Create one
            </Link>
          </p>
          <Link href="/auth/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}
