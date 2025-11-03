import { searchProducts } from "@/lib/woocommerce"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query || query.length < 2) {
    return NextResponse.json({ error: "Query must be at least 2 characters" }, { status: 400 })
  }

  try {
    const products = await searchProducts(query)
    return NextResponse.json(products)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 })
  }
}
