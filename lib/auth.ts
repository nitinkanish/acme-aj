import type { WCCustomer } from "@/types/woocommerce"

// Client-side auth management
export interface AuthToken {
  token: string
  customerId: number
  expiresAt: number
}

const TOKEN_KEY = "wc-auth-token"
const CUSTOMER_KEY = "wc-customer"

export function saveToken(token: AuthToken) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
  }
}

export function getToken(): AuthToken | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(TOKEN_KEY)
  if (!stored) return null

  try {
    const token = JSON.parse(stored) as AuthToken
    // Check if token is expired
    if (token.expiresAt < Date.now()) {
      clearToken()
      return null
    }
    return token
  } catch {
    return null
  }
}

export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(CUSTOMER_KEY)
  }
}

export function saveCustomer(customer: WCCustomer) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer))
  }
}

export function getCustomer(): WCCustomer | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(CUSTOMER_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as WCCustomer
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return getToken() !== null
}
