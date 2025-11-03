"use client"

import Image from "next/image"
import { useCart } from "@/lib/store/cart"

export default function CheckoutSummary() {
  const items = useCart((state) => state.items)
  const total = useCart((state) => state.total())

  const subtotal = total
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const grandTotal = subtotal + shipping + tax

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-20">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">Order Summary</h2>

      {/* Cart Items */}
      <div className="space-y-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {items.length > 0 ? (
          items.map((item) => {
            const price = Number.parseFloat(item.price)
            const itemTotal = price * item.quantity

            return (
              <div
                key={`${item.productId}-${item.variationId || "default"}`}
                className="flex items-center gap-4 border-b border-gray-100 pb-3"
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.quantity} × ${price.toFixed(2)}</p>
                </div>

                <p className="text-sm font-semibold text-gray-900">${itemTotal.toFixed(2)}</p>
              </div>
            )
          })
        ) : (
          <p className="text-gray-500 text-sm text-center py-6">Your cart is empty.</p>
        )}
      </div>

      {/* Price Summary */}
      <div className="border-t border-gray-200 pt-4 mt-4 space-y-3 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Tax</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-2 text-base font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-black text-lg">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
