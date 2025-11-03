"use client"

import Image from "next/image"
import { useCart } from "@/lib/store/cart"
import { Trash2 } from "lucide-react"

export default function CartItems() {
  const items = useCart((state) => state.items)
  const removeItem = useCart((state) => state.removeItem)
  const updateQuantity = useCart((state) => state.updateQuantity)

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const price = Number.parseFloat(item.price)
        const total = price * item.quantity

        return (
          <div
            key={`${item.productId}-${item.variationId || "default"}`}
            className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Product Image */}
            <div className="relative w-full sm:w-28 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="100px"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-base line-clamp-2">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.sku}</p>
              </div>
              <p className="text-gray-800 font-medium mt-2">${price.toFixed(2)}</p>
            </div>

            {/* Quantity, Total & Remove */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-normal gap-2">
              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                <button
                  onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1), item.variationId)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-1 text-sm text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variationId)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Total */}
              <p className="text-lg font-bold text-gray-900">${total.toFixed(2)}</p>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.productId, item.variationId)}
                className="text-gray-400 hover:text-red-500 transition p-1"
                aria-label="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
