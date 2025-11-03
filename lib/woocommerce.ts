import axios, { type AxiosInstance } from "axios"
import type { WCProduct, WCOrder, WCCustomer, WCCategory } from "@/types/woocommerce"

const baseURL = `${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/v3`

interface ApiResponse<T> {
  data: T
  status: number
}

export const wcApi: AxiosInstance = axios.create({
  baseURL,
  auth: {
    username: process.env.WC_CONSUMER_KEY || "",
    password: process.env.WC_CONSUMER_SECRET || "",
  },
})

export const wcApiBrowser = axios.create({
  baseURL,
})

// Products
export async function getProducts(params?: Record<string, any>) {
  const response = await wcApi.get<WCProduct[]>("/products", { params })
  return response.data
}

export async function getProduct(idOrSlug: string | number) {
  try {
    // Try numeric ID first
    if (!isNaN(Number(idOrSlug))) {
      const response = await wcApi.get<WCProduct>(`/products/${idOrSlug}`)
      return response.data
    }
    // Fallback to slug search
    const products = await getProducts({ slug: idOrSlug })
    return products[0] || null
  } catch (error) {
    console.error(`Failed to fetch product: ${idOrSlug}`, error)
    return null
  }
}

export async function searchProducts(query: string) {
  const response = await wcApi.get<WCProduct[]>("/products", {
    params: { search: query, per_page: 20 },
  })
  return response.data
}

// Categories
export async function getCategories(params?: Record<string, any>) {
  const response = await wcApi.get<WCCategory[]>("/products/categories", { params })
  return response.data
}

export async function getCategory(idOrSlug: string | number) {
  try {
    if (!isNaN(Number(idOrSlug))) {
      const response = await wcApi.get<WCCategory>(`/products/categories/${idOrSlug}`)
      return response.data
    }
    const categories = await getCategories({ slug: idOrSlug })
    return categories[0] || null
  } catch (error) {
    console.error(`Failed to fetch category: ${idOrSlug}`, error)
    return null
  }
}

// Orders (requires auth token in production)
export async function createOrder(data: any, token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  const response = await wcApiBrowser.post<any>("/orders", data, { headers })
  return response.data
}

export async function getCustomerOrders(customerId: number, token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  const response = await wcApiBrowser.get<WCOrder[]>("/orders", {
    params: { customer: customerId },
    headers,
  })
  return response.data
}

// Customers
export async function createCustomer(data: Partial<WCCustomer>) {
  const response = await wcApi.post<WCCustomer>("/customers", data)
  return response.data
}

export async function getCustomer(id: number) {
  const response = await wcApi.get<WCCustomer>(`/customers/${id}`)
  return response.data
}

export async function updateCustomer(id: number, data: Partial<WCCustomer>) {
  const response = await wcApi.put<WCCustomer>(`/customers/${id}`, data)
  return response.data
}
