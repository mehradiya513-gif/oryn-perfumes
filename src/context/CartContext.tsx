'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/lib/products'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export type FreebieItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  description: string
}

export type Order = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  country: string
  paymentMethod: string
  total: number
  items: CartItem[]
  created: string
}

export type Customer = {
  name: string
  email: string
  phone?: string
  address?: string
  country?: string
}

type CartContextType = {
  cart: CartItem[]
  cartOpen: boolean
  orderOpen: boolean
  orderSuccess: Order | null
  status: string
  setCartOpen: (open: boolean) => void
  setOrderOpen: (open: boolean) => void
  setOrderSuccess: (order: Order | null) => void
  setStatus: (status: string) => void
  addToCart: (product: Product | { id: string; name: string; price: number; image?: string }) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  customer: Customer | null
  signUpOpen: boolean
  setSignUpOpen: (open: boolean) => void
  authPromptOpen: boolean
  setAuthPromptOpen: (open: boolean) => void
  loginCustomer: (customer: Customer) => void
  logoutCustomer: () => void
  freebies: FreebieItem[]
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null)
  const [status, setStatus] = useState('')
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [authPromptOpen, setAuthPromptOpen] = useState(false)
  const [pendingItem, setPendingItem] = useState<Product | { id: string; name: string; price: number; image?: string } | null>(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCustomer = localStorage.getItem('oryn_customer')
    if (savedCustomer) {
      try {
        setCustomer(JSON.parse(savedCustomer))
      } catch (e) {
        console.error('Failed to parse saved customer', e)
      }
    }
    const savedCart = localStorage.getItem('oryn_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse saved cart', e)
      }
    }

    const shouldOpenCart = localStorage.getItem('oryn_open_cart')
    if (shouldOpenCart === 'true') {
      setCartOpen(true)
      localStorage.removeItem('oryn_open_cart')
    }
  }, [])

  const saveCartToStorage = (newCart: CartItem[]) => {
    if (newCart.length > 0) {
      localStorage.setItem('oryn_cart', JSON.stringify(newCart))
    } else {
      localStorage.removeItem('oryn_cart')
    }
  }

  const performAddToCart = (product: Product | { id: string; name: string; price: number; image?: string }) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      let newCart
      if (existing) {
        newCart = current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        newCart = [
          ...current,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          },
        ]
      }
      saveCartToStorage(newCart)
      return newCart
    })
    setStatus(`${product.name} added to cart.`)
    setCartOpen(true)
  }

  const addToCart = (product: Product | { id: string; name: string; price: number; image?: string }) => {
    performAddToCart(product)
  }

  const removeFromCart = (productId: string) => {
    setCart((current) => {
      const newCart = current.filter((item) => item.id !== productId)
      saveCartToStorage(newCart)
      return newCart
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((current) => {
      const newCart = current.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      )
      saveCartToStorage(newCart)
      return newCart
    })
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('oryn_cart')
  }

  const loginCustomer = (cust: Customer) => {
    setCustomer(cust)
    localStorage.setItem('oryn_customer', JSON.stringify(cust))
    if (pendingItem) {
      performAddToCart(pendingItem)
      setPendingItem(null)
    }
  }

  const logoutCustomer = () => {
    setCustomer(null)
    localStorage.removeItem('oryn_customer')
    clearCart()
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Compute freebies dynamically based on current cart state and totals
  const freebies: FreebieItem[] = []

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        orderOpen,
        orderSuccess,
        status,
        setCartOpen,
        setOrderOpen,
        setOrderSuccess,
        setStatus,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        customer,
        signUpOpen,
        setSignUpOpen,
        authPromptOpen,
        setAuthPromptOpen,
        loginCustomer,
        logoutCustomer,
        freebies,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
