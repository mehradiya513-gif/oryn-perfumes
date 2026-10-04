import type { Metadata } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer'
import CheckoutModal from '@/components/CheckoutModal'
import SignUpModal from '@/components/SignUpModal'
import AuthPromptPopup from '@/components/AuthPromptPopup'
import Footer from '@/components/Footer'

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ORYN — A New Fragrance House',
  description:
    'Six fragrances, composed slowly and made to last. Discover the first collection from ORYN.',
  icons: { icon: '/images/oryn_logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ivory font-sans text-ink antialiased">
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
