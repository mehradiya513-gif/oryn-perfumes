export type Product = {
  id: string
  name: string
  description: string
  price: number
  fragrance: string
  color: string
  image: string
  family: string
  concentration: string
  topNotes: string
  heartNotes: string
  baseNotes: string
  longevity: string
  projection: string
  occasion: string
}

const products: Product[] = [
  {
    id: 'oryn-strawberry',
    name: 'Oryn Strawberry',
    description: 'A luscious, sweet fragrance centering on sun-ripened strawberries and wild berries that settle cleanly on your skin.',
    price: 650,
    fragrance: 'Fresh Strawberries · Wild Berries · Vanilla',
    color: 'from-red-200 via-rose-100 to-white',
    image: '/images/strawberry-red.png',
    family: 'Fruity Sweet',
    concentration: 'Extrait de Parfum (25% concentration)',
    topNotes: 'Fresh Strawberries, Sweet Bergamot, Raspberry',
    heartNotes: 'Wild Berries, Jasmine Sambac, Violet Leaves',
    baseNotes: 'Vanilla Pods, Soft Amber, Skin Musk',
    longevity: '10-12 Hours',
    projection: 'Warm & Sweet (A personal, cozy aura)',
    occasion: 'Bright afternoons & playful outings',
  },
  {
    id: 'oryn-gucci-flora',
    name: 'Oryn Gucci Flora',
    description: 'An elegant, airy floral fragrance reminiscent of a fresh garden in springtime, providing a clean, elegant presence.',
    price: 600,
    fragrance: 'Pear Blossom · White Peony · Fresh Gardenia',
    color: 'from-sky-200 via-blue-100 to-white',
    image: '/images/gucci-flora-blue.png',
    family: 'Fresh Floral',
    concentration: 'Eau de Parfum (18% concentration)',
    topNotes: 'Pear Blossom, Crisp Lemon, Ambrette Seed',
    heartNotes: 'White Peony, Fresh Gardenia, Jasmine petals',
    baseNotes: 'Skin Musk, Soft Blonde Woods, Warm Vetiver',
    longevity: '10-12 Hours',
    projection: 'Intimate (Stays close to the skin)',
    occasion: 'Spring days & refined evening gatherings',
  },
  {
    id: 'oryn-passport',
    name: 'Oryn Passport',
    description: 'A playful and cozy gourmand fragrance featuring sweet marshmallow and warm vanilla for a comforting, nostalgic scent trail.',
    price: 450,
    fragrance: 'Marshmallow · Sweet Orchid · Vanilla Bean',
    color: 'from-pink-200 via-rose-100 to-white',
    image: '/images/passport-pink.png',
    family: 'Playful Gourmand',
    concentration: 'Extrait de Parfum (22% concentration)',
    topNotes: 'Sweet Mandarin, Marshmallow, Cardamom',
    heartNotes: 'Sweet Orchid, Warm Cinnamon, Heliotrope',
    baseNotes: 'Vanilla Bean, Creamy Sandalwood, Dry Amber',
    longevity: '9-12 Hours',
    projection: 'Commanding (A rich, warm presence)',
    occasion: 'Festive celebrations & cozy nights',
  },
  {
    id: 'oryn-shanaya',
    name: 'Oryn Shanaya',
    description: 'A refreshing botanical escape centering on green tea leaves and zesty lime for an invigorating, fresh energy.',
    price: 600,
    fragrance: 'Green Tea · Mint Leaf · Citrus Lime',
    color: 'from-green-200 via-emerald-100 to-white',
    image: '/images/shanaya-green.png',
    family: 'Aromatic Fresh',
    concentration: 'Eau de Parfum (18% concentration)',
    topNotes: 'Citrus Lime, Bergamot, Ginger Root',
    heartNotes: 'Green Tea Leaves, Mint Leaves, Sage',
    baseNotes: 'White Woods, Vetiver, Clean Amber Nectar',
    longevity: '8-10 Hours',
    projection: 'Fresh & Airy (Clean green trail)',
    occasion: 'Daily refresh & summer warmth',
  },
  {
    id: 'oryn-arabian-oud',
    name: 'Oryn Arabian Oud',
    description: 'An exotic, warm amber fragrance utilizing rare resins and dark wood notes to create a rich, heritage-inspired trail.',
    price: 450,
    fragrance: 'Deep Oud · Damask Rose · Warm Amber',
    color: 'from-purple-200 via-fuchsia-100 to-white',
    image: '/images/arabian-oud-purple.png',
    family: 'Exotic Amber',
    concentration: 'Eau de Parfum (15% concentration)',
    topNotes: 'Damask Rose, Saffron, Crushed Spices',
    heartNotes: 'Deep Oud, Roasted Patchouli, Jasmine',
    baseNotes: 'Warm Amber, Smoked Oakwood, Vetiver',
    longevity: '8-10 Hours',
    projection: 'Commanding (A rich, warm presence)',
    occasion: 'Heritage evenings & winter warmth',
  },
  {
    id: 'oryn-black-oud',
    name: 'Oryn Black Oud',
    description: 'A mysterious, dark, and intense fragrance featuring smoky oud, rich leather, and exotic spices for a powerful, sophisticated presence.',
    price: 900,
    fragrance: 'Smoky Oud · Black Spices · Incense',
    color: 'from-stone-900 via-neutral-800 to-white',
    image: '/images/black-oud-dark.png',
    family: 'Woody Amber',
    concentration: 'Extrait de Parfum (25% concentration)',
    topNotes: 'Black Spices, Cardamom, Bergamot',
    heartNotes: 'Incense, Labdanum, Smoked Birch',
    baseNotes: 'Smoky Oud, Vetiver, Dark Leather',
    longevity: '10-12 Hours',
    projection: 'Commanding (A bold, mysterious presence)',
    occasion: 'Refined nights & winter evenings',
  },
]

export default products
