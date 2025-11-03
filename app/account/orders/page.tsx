"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { isAuthenticated, getToken } from "@/lib/auth"
import { getCustomerOrders } from "@/lib/woocommerce"
import type { WCOrder } from "@/types/woocommerce"
import { Loader, Package } from "lucide-react"

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<WCOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!isAuthenticated() || !token) {
      router.push("/auth/login")
      return
    }

    const fetchOrders = async () => {
      try {
        const orderList = await getCustomerOrders(token.customerId, token.token)
        setOrders(orderList)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [router])

  if (loading) {
    return (
      <div className="container-app py-16 flex items-center justify-center">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container-app py-8">
      <h1 className="text-3xl font-bold prose-headings mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="bg-muted p-12 rounded-lg text-center">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
          <Link
            href="/products"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-muted p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold prose-headings">Order #{order.number}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(order.date_created).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${Number.parseFloat(order.total).toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {order.line_items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>
                      {item.quantity}x ${(Number.parseFloat(item.total) / item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Link href={`/account/orders/${order.id}`} className="text-primary hover:underline text-sm font-semibold">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
