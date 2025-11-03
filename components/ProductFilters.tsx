"use client"

import { useRouter, useSearchParams } from "next/navigation"
import type { WCCategory } from "@/types/woocommerce"

interface ProductFiltersProps {
  categories: WCCategory[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams)
    if (params.get("category") === categorySlug) {
      params.delete("category")
    } else {
      params.set("category", categorySlug)
    }
    router.push(`/products?${params.toString()}`)
  }

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    const [orderby, order] = value.split(":")
    params.set("orderby", orderby)
    params.set("order", order)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="font-semibold mb-3 prose-headings">Sort</h3>
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          defaultValue="date:desc"
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="date:desc">Newest</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="popularity:desc">Most Popular</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3 prose-headings">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={searchParams.get("category") === category.slug}
                onChange={() => handleCategoryChange(category.slug)}
                className="rounded"
              />
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
