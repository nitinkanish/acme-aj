"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star, Check } from "lucide-react"
import type { WCProduct } from "@/types/woocommerce"
import { useCart } from "@/lib/store/cart"

interface ProductCardProps {
  product: WCProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem)
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.images[0]) return

    addItem({
      productId: product.id,
      name: product.name,
      price: product.sale_price || product.price,
      quantity: 1,
      image: product.images[0].src,
      sku: product.sku,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const price = Number.parseFloat(product.sale_price || product.price)
  const regularPrice = Number.parseFloat(product.regular_price)

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-300">
        {/* Image */}
        <div className="relative h-56 bg-gray-50 overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0].src || "/placeholder.svg"}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}

          {product.on_sale && (
            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              SALE
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-gray-800 text-base mb-2 line-clamp-2 group-hover:text-black transition">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating_count > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.round(Number.parseFloat(product.average_rating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.rating_count})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold text-black">${price.toFixed(2)}</span>
            {product.on_sale && (
              <span className="text-sm text-gray-400 line-through">${regularPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            {product.stock_status === "instock" ? (
              <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
                In Stock
              </span>
            ) : (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full border border-gray-200">
                Out of Stock
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock_status !== "instock" || added}
            className={`w-full py-2.5 rounded-full font-medium flex items-center justify-center gap-2 text-sm transition-all duration-300 ${
              added
                ? "bg-green-600 text-white"
                : product.stock_status === "instock"
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  )
}
