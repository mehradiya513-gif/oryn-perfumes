/* ————————————————————————————————————————————————————————————————
   ORYN product catalog
————————————————————————————————————————————————————————————————
   Edit everything here: prices, names, notes, images.
   Images live in /public/images — drop new files there and update
   the `image` / `imageHover` paths. Keep the exported shape intact.
   All prices are in ₹. Every product must stay under ₹800.
———————————————————————————————————————————————————————————————— */

export type Category = 'For Him' | 'For Her' | 'Unisex' | 'Gift Sets'

export type Product = {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  mrp: number
  category: Category
  family: string
  concentration: string
  topNotes: string[]
  heartNotes: string[]
  baseNotes: string[]
  longevity: string
  bestseller: boolean
  image: string
  imageAlt: string
  /** Optional second image swapped in on card hover */
  imageHover?: string
}

/** Shop-by-Category tiles */
export const categories: { name: Category; blurb: string; image: string }[] = [
  { name: 'For Him', blurb: 'Oud, rich woods & amber', image: '/images/sultan.png' },
  { name: 'For Her', blurb: 'Sweet vanilla & berries', image: '/images/scarlet-kiss.png' },
  { name: 'Unisex', blurb: 'Crisp, fresh & clean', image: '/images/vodka-ice.png' },
  { name: 'Gift Sets', blurb: 'Duos & curated boxes', image: '/images/bloom-gold.png' },
]

export const products: Product[] = [
  {
    id: 'oryn-vodka-ice',
    name: 'Vodka Ice',
    tagline: 'Crisp Vodka · Frosted Citrus · White Woods',
    description:
      'An ultra-refreshing burst of frosted vodka, sparkling bergamot, and clean white woods — cool, sharp, and invigorating from day to night.',
    price: 650,
    mrp: 899,
    category: 'Unisex',
    family: 'Aromatic Fresh',
    concentration: 'Extrait de Parfum · 22%',
    topNotes: ['Frosted Vodka Accord', 'Crisp Bergamot', 'Cool Mint'],
    heartNotes: ['White Peony', 'Jasmine Petals', 'Juniper'],
    baseNotes: ['Clean White Woods', 'Icy Musk', 'Vetiver'],
    longevity: '8–10 hours',
    bestseller: true,
    image: '/images/vodka-ice.png',
    imageAlt: 'ORYN Vodka Ice — Luxury perfume in frosted blue flacon',
    imageHover: '/images/IMG_4393.PNG',
  },
  {
    id: 'oryn-scarlet-kiss',
    name: 'Scarlet Kiss',
    tagline: 'Ripe Strawberry · Red Berries · Vanilla',
    description:
      'Sun-ripened strawberries, crushed ruby berries, and warm bourbon vanilla — sweet, romantic, and irresistibly long-lasting.',
    price: 650,
    mrp: 899,
    category: 'For Her',
    family: 'Fruity Sweet',
    concentration: 'Extrait de Parfum · 25%',
    topNotes: ['Fresh Strawberries', 'Ruby Berries', 'Sweet Mandarin'],
    heartNotes: ['Red Rose Petals', 'Jasmine', 'Cranberry'],
    baseNotes: ['Bourbon Vanilla', 'Warm Amber', 'Soft Musk'],
    longevity: '10–12 hours',
    bestseller: true,
    image: '/images/scarlet-kiss.png',
    imageAlt: 'ORYN Scarlet Kiss — Luxury perfume in vibrant red flacon',
    imageHover: '/images/IMG_4397.PNG',
  },
  {
    id: 'oryn-sultan',
    name: 'Sultan',
    tagline: 'Royal Oud · Golden Saffron · Dark Amber',
    description:
      'A regal blend of rare royal oud, golden saffron, and warm dark amber — commanding, rich, and unforgettable with room-filling presence.',
    price: 750,
    mrp: 999,
    category: 'For Him',
    family: 'Woody Amber',
    concentration: 'Extrait de Parfum · 25%',
    topNotes: ['Golden Saffron', 'Nutmeg', 'Cardamom'],
    heartNotes: ['Royal Purple Oud', 'Damask Rose', 'Incense'],
    baseNotes: ['Dark Amber', 'Oakwood', 'Warm Musk'],
    longevity: '10–12 hours',
    bestseller: true,
    image: '/images/sultan.png',
    imageAlt: 'ORYN Sultan — Luxury perfume in royal purple flacon',
    imageHover: '/images/IMG_4396.PNG',
  },
  {
    id: 'oryn-love-affair',
    name: 'Love Affair',
    tagline: 'Marshmallow · Pink Orchid · Velvet Vanilla',
    description:
      'A cozy, romantic gourmand of sweet marshmallow, delicate pink orchid, and velvety vanilla — soft, alluring, and quietly magnetic.',
    price: 550,
    mrp: 799,
    category: 'For Her',
    family: 'Playful Gourmand',
    concentration: 'Extrait de Parfum · 22%',
    topNotes: ['Fluffy Marshmallow', 'Pink Pepper', 'Sweet Tangerine'],
    heartNotes: ['Pink Orchid', 'Rose Blossom', 'Heliotrope'],
    baseNotes: ['Vanilla Pods', 'Sandalwood', 'Cashmere Musk'],
    longevity: '9–12 hours',
    bestseller: true,
    image: '/images/love-affair.png',
    imageAlt: 'ORYN Love Affair — Luxury perfume in soft pink flacon',
    imageHover: '/images/IMG_4394.PNG',
  },
  {
    id: 'oryn-venom',
    name: 'Venom',
    tagline: 'Zesty Lime · Green Tea · Smoky Vetiver',
    description:
      'An electric clash of sharp lime zest, green botanical herbs, and dark smoky vetiver — fresh, daring, and powerfully addictive.',
    price: 650,
    mrp: 899,
    category: 'For Him',
    family: 'Fresh Botanical',
    concentration: 'Extrait de Parfum · 22%',
    topNotes: ['Electric Lime Zest', 'Green Apple', 'Bergamot'],
    heartNotes: ['Green Tea Leaves', 'Crushed Mint', 'Sage'],
    baseNotes: ['Smoky Vetiver', 'White Cedar', 'Clean Amber'],
    longevity: '8–10 hours',
    bestseller: true,
    image: '/images/venom.png',
    imageAlt: 'ORYN Venom — Luxury perfume in emerald green flacon',
    imageHover: '/images/IMG_4395.PNG',
  },
  {
    id: 'oryn-gift-duo',
    name: 'The Discovery Duo',
    tagline: 'Two 10ml travel sprays · Gift boxed',
    description:
      'Pick any two travel sprays from our new collection in the ORYN gift box — the easiest way to gift luxury or find your signature.',
    price: 499,
    mrp: 699,
    category: 'Gift Sets',
    family: 'Gift Set',
    concentration: 'Travel sprays · 10ml × 2',
    topNotes: ['Your choice — any two from the new collection'],
    heartNotes: [],
    baseNotes: [],
    longevity: 'Varies by scent',
    bestseller: false,
    image: '/images/bloom-gold.png',
    imageAlt: 'The ORYN Discovery Duo gift set — two travel sprays',
    imageHover: '/images/sultan.png',
  },
]

export default products

/* Small helpers shared across the site */
export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`

export const discountPct = (price: number, mrp: number) =>
  mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0

export const bestsellers = products.filter((p) => p.bestseller)
