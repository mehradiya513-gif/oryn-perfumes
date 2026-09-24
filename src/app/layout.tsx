import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer'
import CheckoutModal from '@/components/CheckoutModal'
import SignUpModal from '@/components/SignUpModal'
import AuthPromptPopup from '@/components/AuthPromptPopup'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ORYN | Timeless Sustainable Fragrances',
  description: 'Experience ORYN - a perfume brand dedicated to timelessness, sustainability, and quality. Discover our curated collection of long-lasting fragrances designed to be cherished for years.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen text-primary antialiased relative">
        <CartProvider>
          <Header />
          <CartDrawer />
          <CheckoutModal />
          <AuthPromptPopup />
          <SignUpModal />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
