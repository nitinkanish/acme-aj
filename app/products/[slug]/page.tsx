import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProduct, getProducts } from "@/lib/woocommerce"
import AddToCartButton from "@/components/AddToCartButton"
import ProductGallery from "@/components/ProductGallery"
import ProductCard from "@/components/ProductCard"
import { Star } from "lucide-react"

// export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: product.name,
    description: product.short_description || product.description,
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: product.images[0] ? [{ url: product.images[0].src }] : [],
    },
  }
}

async function RelatedProducts({ ids }: { ids: number[] }) {
  if (ids.length === 0) return null

  const products = await getProducts({ include: ids.slice(0, 4).join(","), per_page: 4 })

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const price = Number.parseFloat(product.sale_price || product.price)
  const regularPrice = Number.parseFloat(product.regular_price)
  const discount = regularPrice > 0 ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0

  return (
    <div className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Details */}
          <div className="flex flex-col gap-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-4xl font-bold mb-3 text-gray-900">{product.name}</h1>
              {product.rating_count > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(Number.parseFloat(product.average_rating))
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.average_rating} ({product.rating_count} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-900">${price.toFixed(2)}</span>
              {product.on_sale && (
                <>
                  <span className="text-xl text-gray-400 line-through">${regularPrice.toFixed(2)}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product.stock_status === "instock" ? (
                <p className="text-green-600 text-sm font-medium bg-green-100 px-3 py-1 rounded-full w-fit">
                  ✓ In Stock
                </p>
              ) : product.stock_status === "onbackorder" ? (
                <p className="text-yellow-600 text-sm font-medium bg-yellow-100 px-3 py-1 rounded-full w-fit">
                  On Backorder
                </p>
              ) : (
                <p className="text-red-600 text-sm font-medium bg-red-100 px-3 py-1 rounded-full w-fit">
                  Out of Stock
                </p>
              )}
            </div>

            {/* Description */}
            {product.short_description && (
              <div className="text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-4">
                <p>{product.short_description}</p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="pt-2">
              <AddToCartButton product={product} />
            </div>

            {/* Product Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">SKU:</span>
                <span className="font-mono">{product.sku}</span>
              </div>
              {product.categories.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-700">{product.categories.map((c) => c.name).join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full Description */}
        {product.description && (
          <div className="bg-gray-50 p-8 rounded-2xl mb-12 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Description</h2>
            <div
              className="text-gray-600 text-sm leading-relaxed space-y-2"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}

        {/* Attributes */}
        {product.attributes && product.attributes.length > 0 && (
          <div className="bg-gray-50 p-8 rounded-2xl mb-12 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {product.attributes.map((attr) => (
                <div key={attr.id}>
                  <p className="font-semibold text-gray-800">{attr.name}</p>
                  <p className="text-gray-500">{attr.options.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      <RelatedProducts ids={product.related_ids} />
    </div>
  )
}
