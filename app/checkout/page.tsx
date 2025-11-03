"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/store/cart"
import CheckoutForm from "@/components/CheckoutForm"
import CheckoutSummary from "@/components/CheckoutSummary"
import { AlertCircle, Check } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCart((state) => state.items)
  const clearCart = useCart((state) => state.clearCart)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (items.length === 0) {
    return (
      <div className="container-app py-16">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 mx-auto text-warning" />
          <h1 className="text-2xl font-bold prose-headings">Your cart is empty</h1>
          <button
            onClick={() => router.push("/products")}
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="container-app py-16">
        <div className="text-center space-y-4 max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold prose-headings">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">Your order has been received and will be processed shortly.</p>
          <div className="space-y-2">
            <button
              onClick={() => router.push("/account/orders")}
              className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
            >
              View Orders
            </button>
            <button
              onClick={() => router.push("/products")}
              className="w-full border border-border px-6 py-2 rounded-lg hover:bg-muted transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleOrderComplete = async (orderData: any) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would call your backend API to create the WooCommerce order
      // For now, we'll simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000))

      clearCart()
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order processing failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-app py-8">
      <h1 className="text-3xl font-bold mb-8 prose-headings">Checkout</h1>

      {error && (
        <div className="mb-6 bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error Processing Order</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm onSubmit={handleOrderComplete} isLoading={loading} />
        </div>

        <div className="lg:col-span-1">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  )
}
