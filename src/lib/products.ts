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
  { name: 'For Him', blurb: 'Oud, woods & dark spices', image: '/images/black-oud-dark.png' },
  { name: 'For Her', blurb: 'Florals & warm gourmands', image: '/images/strawberry-red.png' },
  { name: 'Unisex', blurb: 'Shared, signature scents', image: '/images/arabian-oud-purple.png' },
  { name: 'Gift Sets', blurb: 'Duos & curated boxes', image: '/images/bloom-gold.png' },
]

export const products: Product[] = [
  {
    id: 'oryn-arabian-oud',
    name: 'Arabian Oud',
    tagline: 'Deep Oud · Damask Rose · Amber',
    description:
      'Damask rose falling into warm amber and a base of rare oud — the heritage-inspired trail the collection is known for.',
    price: 750,
    mrp: 999,
    category: 'Unisex',
    family: 'Exotic Amber',
    concentration: 'Eau de Parfum · 15%',
    topNotes: ['Damask Rose', 'Saffron', 'Crushed Spices'],
    heartNotes: ['Deep Oud', 'Roasted Patchouli', 'Jasmine'],
    baseNotes: ['Warm Amber', 'Smoked Oakwood', 'Vetiver'],
    longevity: '8–10 hours',
    bestseller: true,
    image: '/images/arabian-oud-purple.png',
    imageAlt: 'ORYN Arabian Oud — eau de parfum bottle on a purple ground',
    imageHover: '/images/black-oud-dark.png',
  },
  {
    id: 'oryn-strawberry',
    name: 'Wild Strawberry',
    tagline: 'Strawberry · Wild Berries · Vanilla',
    description:
      'Sun-ripened strawberries and wild berries that settle into soft vanilla — bright, sweet, and quietly long-lasting.',
    price: 650,
    mrp: 899,
    category: 'For Her',
    family: 'Fruity Sweet',
    concentration: 'Eau de Parfum · 25%',
    topNotes: ['Fresh Strawberries', 'Sweet Bergamot', 'Raspberry'],
    heartNotes: ['Wild Berries', 'Jasmine Sambac', 'Violet Leaves'],
    baseNotes: ['Vanilla Pods', 'Soft Amber', 'Skin Musk'],
    longevity: '10–12 hours',
    bestseller: true,
    image: '/images/strawberry-red.png',
    imageAlt: 'ORYN Wild Strawberry — eau de parfum bottle on a red ground',
    imageHover: '/images/passport-pink.png',
  },
  {
    id: 'oryn-passport',
    name: 'Passport',
    tagline: 'Marshmallow · Orchid · Vanilla Bean',
    description:
      'A cozy gourmand of sweet marshmallow and warm vanilla bean — a nostalgic trail made for festive evenings and long nights.',
    price: 450,
    mrp: 649,
    category: 'For Her',
    family: 'Playful Gourmand',
    concentration: 'Eau de Parfum · 22%',
    topNotes: ['Sweet Mandarin', 'Marshmallow', 'Cardamom'],
    heartNotes: ['Sweet Orchid', 'Warm Cinnamon', 'Heliotrope'],
    baseNotes: ['Vanilla Bean', 'Creamy Sandalwood', 'Dry Amber'],
    longevity: '9–12 hours',
    bestseller: true,
    image: '/images/passport-pink.png',
    imageAlt: 'ORYN Passport — eau de parfum bottle on a pink ground',
    imageHover: '/images/strawberry-red.png',
  },
  {
    id: 'oryn-gucci-flora',
    name: 'Flora',
    tagline: 'Pear Blossom · White Peony · Gardenia',
    description:
      'An airy, elegant floral — pear blossom and white peony over clean gardenia. A garden in springtime, kept close to the skin.',
    price: 600,
    mrp: 849,
    category: 'For Her',
    family: 'Fresh Floral',
    concentration: 'Eau de Parfum · 18%',
    topNotes: ['Pear Blossom', 'Crisp Lemon', 'Ambrette Seed'],
    heartNotes: ['White Peony', 'Fresh Gardenia', 'Jasmine Petals'],
    baseNotes: ['Skin Musk', 'Blonde Woods', 'Warm Vetiver'],
    longevity: '8–10 hours',
    bestseller: true,
    image: '/images/gucci-flora-blue.png',
    imageAlt: 'ORYN Flora — eau de parfum bottle on a blue ground',
    imageHover: '/images/strawberry-red.png',
  },
  {
    id: 'oryn-shanaya',
    name: 'Shanaya',
    tagline: 'Green Tea · Mint · Citrus Lime',
    description:
      'Green tea leaves and zesty lime over white woods — an invigorating botanical escape for daily wear and warm days.',
    price: 600,
    mrp: 849,
    category: 'Unisex',
    family: 'Aromatic Fresh',
    concentration: 'Eau de Parfum · 18%',
    topNotes: ['Citrus Lime', 'Bergamot', 'Ginger Root'],
    heartNotes: ['Green Tea Leaves', 'Mint Leaves', 'Sage'],
    baseNotes: ['White Woods', 'Vetiver', 'Clean Amber Nectar'],
    longevity: '8–10 hours',
    bestseller: true,
    image: '/images/shanaya-green.png',
    imageAlt: 'ORYN Shanaya — eau de parfum bottle on a green ground',
    imageHover: '/images/gucci-flora-blue.png',
  },
  {
    id: 'oryn-black-oud',
    name: 'Black Oud',
    tagline: 'Smoky Oud · Black Spices · Incense',
    description:
      'Smoky oud, dark spices and incense — the deepest composition in the collection, made for evenings that ask for weight.',
    price: 799,
    mrp: 1099,
    category: 'For Him',
    family: 'Woody Amber',
    concentration: 'Eau de Parfum · 25%',
    topNotes: ['Black Spices', 'Cardamom', 'Bergamot'],
    heartNotes: ['Incense', 'Labdanum', 'Smoked Birch'],
    baseNotes: ['Smoky Oud', 'Vetiver', 'Dark Leather'],
    longevity: '10–12 hours',
    bestseller: false,
    image: '/images/black-oud-dark.png',
    imageAlt: 'ORYN Black Oud — eau de parfum bottle on a dark ground',
    imageHover: '/images/arabian-oud-purple.png',
  },
  {
    id: 'oryn-gift-duo',
    name: 'The Discovery Duo',
    tagline: 'Two 10ml travel sprays · Gift boxed',
    description:
      'Pick any two travel sprays in the ORYN gift box — the easiest way to gift fragrance, or to find your own signature.',
    price: 499,
    mrp: 699,
    category: 'Gift Sets',
    family: 'Gift Set',
    concentration: 'Travel sprays · 10ml × 2',
    topNotes: ['Your choice — any two from the collection'],
    heartNotes: [],
    baseNotes: [],
    longevity: 'Varies by scent',
    bestseller: false,
    image: '/images/bloom-gold.png',
    imageAlt: 'The ORYN Discovery Duo gift set — two travel sprays',
    imageHover: '/images/passport-pink.png',
  },
  {
    id: 'oryn-gift-trio',
    name: 'The Signature Trio',
    tagline: 'Three 10ml travel sprays · Gift boxed',
    description:
      'Three travel sprays from the collection in the ORYN box — Arabian Oud, Wild Strawberry and Passport, together.',
    price: 799,
    mrp: 1199,
    category: 'Gift Sets',
    family: 'Gift Set',
    concentration: 'Travel sprays · 10ml × 3',
    topNotes: ['Arabian Oud · Wild Strawberry · Passport'],
    heartNotes: [],
    baseNotes: [],
    longevity: 'Varies by scent',
    bestseller: false,
    image: '/images/champagne-dream.png',
    imageAlt: 'The ORYN Signature Trio gift set — three travel sprays',
    imageHover: '/images/bloom-gold.png',
  },
]

export default products

/* Small helpers shared across the site */
export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`

export const discountPct = (price: number, mrp: number) =>
  mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0

export const bestsellers = products.filter((p) => p.bestseller)
