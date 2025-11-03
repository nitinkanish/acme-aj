import type React from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  productId: number
  variationId?: number
  name: string
  price: string
  quantity: number
  image: string
  sku: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: number, variationId?: number) => void
  updateQuantity: (productId: number, quantity: number, variationId?: number) => void
  clearCart: () => void
  total: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId && i.variationId === item.variationId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.variationId === item.variationId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (productId, variationId) =>
        set((state) => ({
          items: state.items.filter((i) => !(i.productId === productId && i.variationId === variationId)),
        })),
      updateQuantity: (productId, quantity, variationId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variationId === variationId ? { ...i, quantity } : i,
          ),
        })),
      clearCart: () => set({ items: [] }),
      total: () => {
        const state = get()
        return state.items.reduce((sum, item) => sum + Number.parseFloat(item.price) * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
