"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCustomer, isAuthenticated, clearToken } from "@/lib/auth"
import type { WCCustomer } from "@/types/woocommerce"
import { LogOut, Settings, ShoppingBag, User } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [customer, setCustomer] = useState<WCCustomer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
      return
    }

    const cust = getCustomer()
    setCustomer(cust)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    clearToken()
    router.push("/auth/login")
  }

  if (loading) {
    return <div className="container-app py-16 text-center">Loading...</div>
  }

  if (!customer) {
    return <div className="container-app py-16 text-center">Not authenticated</div>
  }

  return (
    <div className="container-app py-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold prose-headings">Welcome, {customer.first_name}!</h1>
            <p className="text-muted-foreground">{customer.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Quick Links */}
          <Link
            href="/account/orders"
            className="bg-muted p-6 rounded-lg hover:shadow-lg hover:border-primary border border-border transition"
          >
            <ShoppingBag className="w-8 h-8 mb-3 text-primary" />
            <h2 className="font-semibold prose-headings mb-1">My Orders</h2>
            <p className="text-sm text-muted-foreground">View order history</p>
          </Link>

          <Link
            href="/account/profile"
            className="bg-muted p-6 rounded-lg hover:shadow-lg hover:border-primary border border-border transition"
          >
            <User className="w-8 h-8 mb-3 text-primary" />
            <h2 className="font-semibold prose-headings mb-1">Profile</h2>
            <p className="text-sm text-muted-foreground">Edit your info</p>
          </Link>

          <Link
            href="/account/addresses"
            className="bg-muted p-6 rounded-lg hover:shadow-lg hover:border-primary border border-border transition"
          >
            <Settings className="w-8 h-8 mb-3 text-primary" />
            <h2 className="font-semibold prose-headings mb-1">Addresses</h2>
            <p className="text-sm text-muted-foreground">Manage addresses</p>
          </Link>
        </div>

        {/* Current Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Billing Address */}
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="font-semibold prose-headings mb-4">Billing Address</h2>
            {customer.billing && Object.values(customer.billing).some((v) => v) ? (
              <div className="text-sm space-y-1">
                <p>
                  {customer.billing.first_name} {customer.billing.last_name}
                </p>
                <p>{customer.billing.address_1}</p>
                {customer.billing.address_2 && <p>{customer.billing.address_2}</p>}
                <p>
                  {customer.billing.city}, {customer.billing.state} {customer.billing.postcode}
                </p>
                <p>{customer.billing.country}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No billing address on file</p>
            )}
          </div>

          {/* Shipping Address */}
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="font-semibold prose-headings mb-4">Shipping Address</h2>
            {customer.shipping && Object.values(customer.shipping).some((v) => v) ? (
              <div className="text-sm space-y-1">
                <p>
                  {customer.shipping.first_name} {customer.shipping.last_name}
                </p>
                <p>{customer.shipping.address_1}</p>
                {customer.shipping.address_2 && <p>{customer.shipping.address_2}</p>}
                <p>
                  {customer.shipping.city}, {customer.shipping.state} {customer.shipping.postcode}
                </p>
                <p>{customer.shipping.country}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No shipping address on file</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
