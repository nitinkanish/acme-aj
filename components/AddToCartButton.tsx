"use client"

import React, { useState } from "react"
import type { WCProduct } from "@/types/woocommerce"
import { useCart } from "@/lib/store/cart"
import { ShoppingCart, Check, Minus, Plus } from "lucide-react"

interface AddToCartButtonProps {
  product: WCProduct
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariation, setSelectedVariation] = useState<number | undefined>()
  const [added, setAdded] = useState(false)
  const addItem = useCart((state) => state.addItem)

  if (!product.images[0]) return null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()

    if (product.variations && product.variations.length > 0 && !selectedVariation) {
      alert("Please select product options")
      return
    }

    addItem({
      productId: product.id,
      variationId: selectedVariation,
      name: product.name,
      price: product.sale_price || product.price,
      quantity,
      image: product.images[0].src,
      sku: product.sku,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    setQuantity(1)
  }

  return (
    <div className="space-y-5 w-full">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="text-sm font-medium text-gray-600">
          Quantity
        </label>

        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-gray-100 transition"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>

          <input
            id="quantity"
            type="number"
            min="1"
            max={product.stock_quantity || 999}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))
            }
            className="w-12 text-center text-gray-800 bg-transparent focus:outline-none"
          />

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 hover:bg-gray-100 transition"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={product.stock_status !== "instock" || added}
        className={`w-full py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 text-base transition-all duration-300 shadow-sm ${
          added
            ? "bg-green-600 text-white"
            : product.stock_status === "instock"
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {added ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  )
}
