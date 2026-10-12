import Hero from '@/components/landing/Hero'
import TrustStrip from '@/components/landing/TrustStrip'
import CategoryTiles from '@/components/landing/CategoryTiles'
import Bestsellers from '@/components/landing/Bestsellers'
import ScentFinder from '@/components/landing/ScentFinder'
import BrandStory from '@/components/landing/BrandStory'
import NotesExplainer from '@/components/landing/NotesExplainer'
import SocialProof from '@/components/landing/SocialProof'
import OfferBanner from '@/components/landing/OfferBanner'
import FAQ from '@/components/landing/FAQ'
import Newsletter from '@/components/landing/Newsletter'
import StickyAddToCart from '@/components/landing/StickyAddToCart'
import WhatsAppFloat from '@/components/landing/WhatsAppFloat'
import { products } from '@/lib/products'

/* ————————————————————————————————————————————————————————————————
   ORYN landing page — the 14 sections, top to bottom.
   Product JSON-LD is emitted server-side for SEO.
———————————————————————————————————————————————————————————————— */

const origin = 'https://oryn.in'

const productSchema = {
  '@context': 'https://schema.org',
  '@graph': products.map((p) => ({
    '@type': 'Product',
    name: `ORYN ${p.name}`,
    description: p.description,
    image: `${origin}${p.image}`,
    brand: { '@type': 'Brand', name: 'ORYN' },
    category: p.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: p.price,
      availability: 'https://schema.org/InStock',
      url: `${origin}/#bestsellers`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '412',
    },
  })),
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ORYN',
  url: origin,
  logo: `${origin}/images/oryn_logo.png`,
  sameAs: ['https://instagram.com/oryn', 'https://pinterest.com/oryn'],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* 3 · Hero */}
      <Hero />

      {/* 4 · Trust strip */}
      <TrustStrip />

      {/* 5 · Shop by Category */}
      <CategoryTiles />

      {/* 6 · Bestsellers — carousel on mobile, 4-col grid on desktop */}
      <Bestsellers />

      {/* 7 · Scent Finder quiz */}
      <ScentFinder />

      {/* 8 · Brand story */}
      <BrandStory />

      {/* 9 · Scent notes explainer */}
      <NotesExplainer />

      {/* 10 · Reviews + UGC grid */}
      <SocialProof />

      {/* 11 · Offer banner with countdown */}
      <OfferBanner />

      {/* 12 · FAQ accordion */}
      <FAQ />

      {/* 13 · Newsletter */}
      <Newsletter />

      {/* Extras */}
      <StickyAddToCart />
      <WhatsAppFloat />
    </>
  )
}
