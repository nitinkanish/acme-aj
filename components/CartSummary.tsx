"use client"

import Link from "next/link"
import { useCart } from "@/lib/store/cart"

export default function CartSummary() {
  const items = useCart((state) => state.items)
  const total = useCart((state) => state.total())

  const subtotal = total
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const grandTotal = subtotal + shipping + tax

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm sticky top-24 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-100 pb-3">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tax (estimated)</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {subtotal > 0 && (
        <p className="text-xs text-gray-500 text-center">
          {shipping === 0 ? "You’ve unlocked free shipping!" : "Free shipping on orders over $100"}
        </p>
      )}

      <div className="space-y-3">
        <Link
          href="/checkout"
          className="block w-full text-center bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-200"
        >
          Proceed to Checkout
        </Link>

        <Link
          href="/products"
          className="block w-full text-center border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
