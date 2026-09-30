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
  title: 'ORYN — A New Fragrance House',
  description:
    'Six fragrances, composed with patience and restraint. Discover ORYN — a new fragrance house worth discovering.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-primary min-h-screen text-text antialiased relative">
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
