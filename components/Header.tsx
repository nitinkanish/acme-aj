"use client"

import type React from "react"
import Link from "next/link"
import { useCart } from "@/lib/store/cart"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const cartItems = useCart((state) => state.items)
  const cartCount = cartItems.length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      setSearchTerm("")
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-100 border-b border-gray-300 text-black shadow-sm">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-gray-800 transition">
          Your Store
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="hover:text-gray-700 transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-gray-700 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-700 transition">
            Contact
          </Link>
        </nav>

        {/* Search + Cart */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="px-3 py-1.5 text-sm border border-gray-400 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm w-40 sm:w-56"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
            >
              Search
            </button>
          </form>

          <Link
            href="/cart"
            className="relative p-2 rounded-full border border-gray-400 hover:bg-gray-200 transition"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
