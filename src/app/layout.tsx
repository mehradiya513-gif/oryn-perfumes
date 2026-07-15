import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer'
import CheckoutModal from '@/components/CheckoutModal'
import SignUpModal from '@/components/SignUpModal'
import AuthPromptPopup from '@/components/AuthPromptPopup'

export const metadata: Metadata = {
  title: 'ORYN | Timeless Sustainable Fragrances',
  description: 'Experience ORYN - a perfume brand dedicated to timelessness, sustainability, and quality. Discover our curated collection of long-lasting fragrances designed to be cherished for years.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-oatmeal min-h-screen text-olive antialiased selection:bg-olive/10 selection:text-olive relative">
        <div className="grain-overlay" />
        <CartProvider>
          <Header />
          <CartDrawer />
          <CheckoutModal />
          <AuthPromptPopup />
          <SignUpModal />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
