"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import ProductCard from "@/components/ProductCard"
import { SearchIcon } from "lucide-react"
import type { WCProduct } from "@/types/woocommerce"

async function searchProducts(query: string): Promise<WCProduct[]> {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
  if (!response.ok) throw new Error("Search failed")
  return response.json()
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchTerm, setSearchTerm] = useState(query)

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: searchTerm.length >= 2,
  })

  return (
    <div className="container-app py-8">
      <h1 className="text-3xl font-bold prose-headings mb-8">Search Products</h1>

      <div className="mb-8">
        <div className="relative">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            autoFocus
          />
          <SearchIcon className="absolute right-4 top-3.5 w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {searchTerm.length < 2 ? (
        <p className="text-center text-muted-foreground py-12">Enter at least 2 characters to search</p>
      ) : isLoading ? (
        <div className="text-center py-12">Searching...</div>
      ) : error ? (
        <div className="text-center py-12 text-destructive">Search failed. Please try again.</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No products found for "{searchTerm}"</div>
      ) : (
        <>
          <p className="mb-6 text-muted-foreground">Found {products.length} products</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-app py-12">Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
