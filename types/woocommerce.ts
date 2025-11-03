export interface WCProduct {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  stock_status: "instock" | "outofstock" | "onbackorder"
  stock_quantity: number | null
  images: WCImage[]
  categories: WCCategory[]
  related_ids: number[]
  attributes: WCAttribute[]
  variations: WCVariation[]
  rating_count: number
  average_rating: string
}

export interface WCImage {
  id: number
  src: string
  alt: string
}

export interface WCCategory {
  id: number
  name: string
  slug: string
}

export interface WCAttribute {
  id: number
  name: string
  options: string[]
}

export interface WCVariation {
  id: number
  sku: string
  price: string
  stock_quantity: number | null
  stock_status: string
  attributes: Array<{
    id: number
    option: string
  }>
}

export interface WCOrder {
  id: number
  number: string
  status: string
  total: string
  currency: string
  date_created: string
  line_items: WCLineItem[]
}

export interface WCLineItem {
  id: number
  name: string
  quantity: number
  total: string
  product_id: number
}

export interface WCCustomer {
  id: number
  email: string
  first_name: string
  last_name: string
  billing: WCAddress
  shipping: WCAddress
}

export interface WCAddress {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email?: string
  phone?: string
}
