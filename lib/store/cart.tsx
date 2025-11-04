"use client"

import React, { Suspense } from "react"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

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
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
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
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        })
      },
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
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : ({} as Storage))),
      skipHydration: true,
    },
  ),
)

export function CartProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Manually trigger rehydration when skipHydration is true
    // This ensures localStorage is only accessed on the client side
    const unsubscribe = useCart.persist.onFinishHydration(() => {
      useCart.getState().setHasHydrated(true)
    })
    
    // Trigger rehydration - Zustand persist with skipHydration requires manual rehydration
    if (typeof window !== "undefined") {
      useCart.persist.rehydrate()
    }
    
    return unsubscribe
  }, [])

  return (
    <Suspense fallback={<div className="min-h-screen">test</div>}>
      {children}
    </Suspense>
  )
}
