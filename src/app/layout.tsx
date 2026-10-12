import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import AnnouncementBar from '@/components/landing/AnnouncementBar'
import Header from '@/components/landing/Header'
import CartDrawer from '@/components/CartDrawer'
import CheckoutModal from '@/components/CheckoutModal'
import SignUpModal from '@/components/SignUpModal'
import AuthPromptPopup from '@/components/AuthPromptPopup'
import Footer from '@/components/Footer'

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://oryn.in'),
  title: {
    default: 'ORYN — Luxury You Can Actually Wear | Perfumes under ₹800',
    template: '%s — ORYN',
  },
  description:
    'Accessible Indian luxury perfumes. Premium, long-lasting fragrances under ₹800 — free shipping above ₹499, COD available.',
  keywords: ['/perfume', 'luxury perfume India', 'fragrance under 800', 'perfume gift', 'COD perfume'],
  icons: { icon: '/images/oryn_logo.png' },
  openGraph: {
    title: 'ORYN — Luxury You Can Actually Wear',
    description: 'Premium fragrances under ₹800. Free shipping above ₹499 · COD available.',
    url: 'https://oryn.in',
    siteName: 'ORYN',
    images: [{ url: '/images/arabian-oud-purple.png', width: 1200, height: 630, alt: 'ORYN perfumes' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ORYN — Luxury You Can Actually Wear',
    description: 'Premium fragrances under ₹800. Free shipping above ₹499 · COD available.',
    images: ['/images/arabian-oud-purple.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ivory font-sans text-ink antialiased">
        <CartProvider>
          <AnnouncementBar />
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
