"use client"

import Link from "next/link"
import { useCart } from "@/lib/store/cart"
import CartItems from "@/components/CartItems"
import CartSummary from "@/components/CartSummary"
import { ShoppingCart } from "lucide-react"

export default function CartPage() {
  const items = useCart((state) => state.items)

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-white text-center px-4">
        <ShoppingCart className="w-20 h-20 mb-6 text-gray-400" />
        <h1 className="text-2xl font-semibold text-gray-900">Your cart is empty</h1>
        <p className="text-gray-500 mt-2 mb-6">Start shopping to add items to your cart.</p>
        <Link
          href="/products"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 px-4 sm:px-8 py-10">
      <h1 className="text-3xl font-bold mb-10 border-b pb-4 border-gray-200">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
            <CartItems />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm sticky top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
