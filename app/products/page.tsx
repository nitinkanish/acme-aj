import { Suspense } from "react"
import { getProducts, getCategories } from "@/lib/woocommerce"
import ProductCard from "@/components/ProductCard"
import ProductFilters from "@/components/ProductFilters"
import type { Metadata } from "next"

// export const revalidate = 3600

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our full collection of products",
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const perPage = 12
  const offset = (page - 1) * perPage

  const [products, categories] = await Promise.all([
    getProducts({
      per_page: perPage,
      offset,
      orderby: params.orderby || "date",
      order: params.order || "desc",
    }),
    getCategories({ per_page: 100 }),
  ])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-0">
            Our Products
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Explore our curated selection of quality products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Filters */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-fit">
            <Suspense fallback={<div className="text-gray-500">Loading filters...</div>}>
              <ProductFilters categories={categories} />
            </Suspense>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-gray-100 rounded-xl bg-gray-50">
                <p className="text-gray-600 text-lg font-medium">No products found</p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
