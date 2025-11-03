"use client"

import { useState } from "react"
import Image from "next/image"
import type { WCImage } from "@/types/woocommerce"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  images: WCImage[]
  name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const mainImage = images[selectedIndex] || images[0]

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-200 group">
        {mainImage ? (
          <Image
            src={mainImage.src || "/placeholder.svg"}
            alt={mainImage.alt || name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 border border-gray-300 text-gray-800 p-2 rounded-full shadow-sm hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 border border-gray-300 text-gray-800 p-2 rounded-full shadow-sm hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-medium border border-gray-300">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border transition-all duration-200 ${
                index === selectedIndex
                  ? "border-gray-800 shadow-sm"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt || `${name} thumbnail ${index + 1}`}
                fill
                className={`object-cover ${
                  index === selectedIndex ? "opacity-100" : "opacity-90 hover:opacity-100"
                } transition`}
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
