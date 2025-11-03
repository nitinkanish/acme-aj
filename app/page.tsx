import Link from "next/link"
import { getProducts, getCategories } from "@/lib/woocommerce"
import ProductCard from "@/components/ProductCard"
import { Suspense } from "react"

// Uncomment if ISR is required
// export const revalidate = 3600 // ISR: revalidate every hour

async function FeaturedProducts() {
  const products = await getProducts({ per_page: 8, orderby: "date" })
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

async function CategoriesGrid() {
  const categories = await getCategories({ per_page: 6 })
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group relative overflow-hidden rounded-2xl bg-gray-50 h-56 flex items-end border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition" />
          <div className="relative z-10 p-6 w-full">
            <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition">
              {category.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-white text-black space-y-28 pb-20">
      {/* Hero Section */}
      <section className="py-28 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
            Elevate Your Everyday with{" "}
            <span className="text-gray-700">Your Store</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Explore premium lifestyle essentials — crafted with care, designed for purpose.
          </p>
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link
            href="/products"
            className="text-sm text-gray-600 hover:text-black transition"
          >
            View All →
          </Link>
        </div>
        <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading products...</div>}>
          <FeaturedProducts />
        </Suspense>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <Link
            href="/categories"
            className="text-sm text-gray-600 hover:text-black transition"
          >
            Explore All →
          </Link>
        </div>
        <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading categories...</div>}>
          <CategoriesGrid />
        </Suspense>
      </section>

      {/* Call to Action / Newsletter */}
      <section className="border-t border-gray-200 py-20 text-center bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Join Our Newsletter
          </h3>
          <p className="text-gray-600 mb-8">
            Get the latest updates, curated recommendations, and exclusive offers — straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-full w-72 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
