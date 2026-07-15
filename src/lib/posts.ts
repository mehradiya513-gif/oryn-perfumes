export type Author = {
  name: string
  role: string
  avatar: string
}

export type ContentBlock = {
  type: 'p' | 'h2' | 'quote' | 'list' | 'highlight'
  value: string | string[]
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  author: Author
  content: ContentBlock[]
  relatedProduct: string // Product ID from products.ts
  tags: string[]
}

const posts: BlogPost[] = [
  {
    slug: 'the-philosophy-of-slow-scent-quality-over-quantity',
    title: 'The Philosophy of Slow Scent: Quality Over Quantity',
    excerpt: 'ORYN was born as a reaction to fast fashion and temporary trends. We explore how minimalist curation creates fragrances you will cherish for years.',
    date: 'June 22, 2026',
    readTime: '5 min read',
    category: 'Behind the Brand',
    image: '/images/blog-brand-philosophy.png',
    author: {
      name: 'Julian Thorne',
      role: 'Master Perfumer & Founder',
      avatar: '🌱',
    },
    tags: ['Brand Philosophy', 'Oryn Strawberry', 'Slow Scent', 'Sustainability'],
    relatedProduct: 'oryn-strawberry',
    content: [
      {
        type: 'p',
        value: 'Fragrance is not simply a fleeting accessory. It is a silent signature, an unspoken presence that defines character, confidence, and soul. At ORYN, we believe a fragrance should be more than a passing trend—it should be an experience of absolute prestige and durability. Oryn Strawberry was curated specifically to embody this philosophy, offering a timeless, organic, and prestigious presence.',
      },
      {
        type: 'h2',
        value: 'The Rise of Timeless Curation',
      },
      {
        type: 'p',
        value: 'Our core philosophy is rooted in a deliberate choice: rejecting fast-moving trends in favor of timeless longevity. We draw inspiration from elements that endure—ancient woods, deep resins, and natural botanicals that age gracefully. By translating this long-term view of craftsmanship into scent, we offer an antidote to the modern culture of disposability.',
      },
      {
        type: 'quote',
        value: '“ORYN is not about having more fragrances; it is about having better ones. We celebrate the beauty of slow curation and transform it into wearable art that stands the test of time.”',
      },
      {
        type: 'h2',
        value: 'Crafted with Absolute Care and Purpose',
      },
      {
        type: 'p',
        value: 'Why focus on slow maceration? A premium perfume is never just about initial impact; it is about how it develops over hours, and how it lingers in memories over years. We honor the traditional, patient principles of master perfumery. We utilize premium organic botanicals to ensure Oryn Strawberry carries a clean, rich, and natural complexity.',
      },
      {
        type: 'list',
        value: [
          'Sustainable Accords: Sun-ripened strawberry essence and wild berries sourced ethically.',
          'Durable Base: Warm vanilla pods and skin musk that fix the fragrance to the skin naturally without synthetic enhancers.',
          'Timeless Integrity: A composition designed to be worn across seasons and cherished for a lifetime.',
        ],
      },
      {
        type: 'p',
        value: 'For those who appreciate details and demand the very best, ORYN provides a natural, sophisticated presence. It gives you character, depth, and an unforgettable, timeless finish.',
      },
    ],
  },
  {
    slug: 'the-art-of-sustainable-maceration-timeless-perfumery',
    title: 'The Art of Sustainable Maceration: Designing Fragrances to Last',
    excerpt: 'How we prioritize slow-aging formulation processes to construct durable scent profiles that settle gracefully on your skin.',
    date: 'June 18, 2026',
    readTime: '6 min read',
    category: 'Scent Science',
    image: '/images/blog-whiskey-aging.png',
    author: {
      name: 'Julian Thorne',
      role: 'Master Perfumer',
      avatar: '🧪',
    },
    tags: ['Oryn Passport', 'Maceration', 'Sustainability', 'Longevity'],
    relatedProduct: 'oryn-passport',
    content: [
      {
        type: 'p',
        value: 'When we set out to create ORYN, we asked ourselves a question: What makes a high-quality fragrance truly memorable? Is it the immediate top notes, or the complex warmth that lingers hours later? The answer is the slow evolution. And this evolution is achieved through patient, eco-conscious maceration.',
      },
      {
        type: 'h2',
        value: 'The Science of Slow Maturation',
      },
      {
        type: 'p',
        value: 'In cheap, mass-market perfume production, synthetics are mixed quickly and bottled immediately. At ORYN, we let our natural ingredients rest. Over weeks and months under controlled temperatures, the essential oils and organic grain alcohol perform a silent dance, blending into a cohesive, rounded whole.',
      },
      {
        type: 'quote',
        value: '“A great fragrance is like an heirloom—it needs time, stability, and premium raw materials to develop its full maturity and soul.”',
      },
      {
        type: 'p',
        value: 'To replicate this in Oryn Passport, we structure the fragrance around ethically sourced gourmand accords. We utilize natural marshmallow and warm vanilla extracts, macerated over an extended period. This mimics the organic settling that happens in high-end natural infusions.',
      },
      {
        type: 'h2',
        value: 'Deconstructing the Olfactory Notes',
      },
      {
        type: 'p',
        value: 'When you wear a slow-matured fragrance, the notes unfold in layers:',
      },
      {
        type: 'list',
        value: [
          'The Opening: Crisp and sweet mandarin and marshmallow that draw attention without overwhelming the senses.',
          'The Heart: Sweet orchid and warm cinnamon that develop gradually as the skin warms.',
          'The Foundation: Creamy vanilla bean, sandalwood, and dry amber that ground the fragrance and persist for over 12 hours.',
        ],
      },
      {
        type: 'highlight',
        value: 'Tip: For the best experience, apply Oryn Passport directly to your pulse points. The natural warmth of your skin helps release the sweet gourmand and warm woody base molecules gradually, maximizing longevity.',
      },
      {
        type: 'p',
        value: 'By honoring the traditional maceration process, we’ve created a fragrance that carries a heavy, sophisticated weight. It is not just a scent; it is an appreciation of quality and time.',
      },
    ],
  },
  {
    slug: 'minimalism-in-formulation-the-story-of-oryn-aura',
    title: 'Minimalism in Formulation: The Story of Oryn Gucci Flora',
    excerpt: 'Discover how we engineered a clean, intimate floral fragrance with a highly concentrated selection of clean, sustainable ingredients.',
    date: 'June 12, 2026',
    readTime: '4 min read',
    category: 'Behind the Brand',
    image: '/images/blog-vodka-crafting.png',
    author: {
      name: 'Elena Rostova',
      role: 'Head of Fragrance Innovation',
      avatar: '🍃',
    },
    tags: ['Oryn Gucci Flora', 'Minimalism', 'Formulation', 'Floral Scents'],
    relatedProduct: 'oryn-gucci-flora',
    content: [
      {
        type: 'p',
        value: 'If a bold woody scent is a roaring fire, a fresh floral is a soft morning light. Floral scents represent purity, subtraction, and absolute refinement. They hide nothing. Crafting a fragrance like Oryn Gucci Flora requires a complete shift in scent philosophy—moving from heavy layers to clean, transparent minimalist elements.',
      },
      {
        type: 'h2',
        value: 'The Beauty of Subtraction',
      },
      {
        type: 'p',
        value: 'How do you formulate "cleanliness"? In the fragrance world, this is achieved through pear blossoms, soft musk, and clean gardenia notes. For Oryn Gucci Flora, we designed an opening that mimics the sensation of fresh petals drying in clean air: icy, light, and pure.',
      },
      {
        type: 'quote',
        value: '“With Oryn Gucci Flora, we wanted to capture the texture of fresh gardenia—a quiet, comforting elegance that sits close to you, becoming part of your personal identity.”',
      },
      {
        type: 'p',
        value: 'We achieve this crystalline top note by blending pear blossom with organic ambrette seed. As the initial brightness softens, the fragrance reveals a delicate heart of white peony and iris butter, rounding out the scent without losing its transparent edge.',
      },
      {
        type: 'h2',
        value: 'Fewer Ingredients, Unmatched Quality',
      },
      {
        type: 'p',
        value: 'Unlike complex mass-market perfumes that use dozens of synthetics to create a loud, synthetic cloud, Oryn Gucci Flora relies on a smaller, highly concentrated selection of top-tier ingredients. Each ingredient must be perfect because there are no heavy spices or leathers to hide imperfections.',
      },
      {
        type: 'list',
        value: [
          'Pure Opening: Pear blossom and crisp lemon for instant, fresh brightness.',
          'Floral Heart: White peony, fresh gardenia, and jasmine petals for a velvety texture.',
          'Intimate Grounding: Skin musk and warm vetiver that sit warm and close to the body.',
        ],
      },
      {
        type: 'p',
        value: 'If you prefer scents that are subtle, incredibly clean, and intimate—yet want something that stands out through sheer quality—Oryn Gucci Flora offers a premium, distilled alternative.',
      },
    ],
  },
  {
    slug: 'earthy-narratives-botanical-sourcing-for-oryn-terra',
    title: 'Earthy Narratives: Sourcing for Oryn Arabian Oud',
    excerpt: 'An in-depth look at our connection to rare resins. How we source ethical oud and damask rose to create a rich, eco-luxurious fragrance.',
    date: 'June 05, 2026',
    readTime: '5 min read',
    category: 'Behind the Brand',
    image: '/images/blog-rum-island.png',
    author: {
      name: 'Marcus Sterling',
      role: 'Sartorial & Lifestyle Writer',
      avatar: '🌍',
    },
    tags: ['Oryn Arabian Oud', 'Eco-Luxury', 'Sourcing', 'Oud & Rose'],
    relatedProduct: 'oryn-arabian-oud',
    content: [
      {
        type: 'p',
        value: 'Oryn Arabian Oud is an exotic journey in a bottle. Inspired by the raw beauty of traditional eastern perfumery, it offers a deep, amber complexity that makes a calm, premium statement. It captures the transition from soft roses to a deep, resinous woody base.',
      },
      {
        type: 'h2',
        value: 'Connecting Scent to Sourcing Heritage',
      },
      {
        type: 'p',
        value: 'In perfumery, oud and rose notes are prized for their heavy, rich properties. For Oryn Arabian Oud, we balanced ethically harvested Damask roses with sustainably sourced oud wood, recreating the warmth of traditional amber oil.',
      },
      {
        type: 'quote',
        value: '“True luxury must be sustainable. Oryn Arabian Oud translates our commitment to raw sourcing into a sophisticated, natural daily wear.”',
      },
      {
        type: 'h2',
        value: 'Deconstructing the Oud Scent Profile',
      },
      {
        type: 'p',
        value: 'Oryn Arabian Oud is designed to project warm comfort while maintaining an organic grounding:',
      },
      {
        type: 'list',
        value: [
          'Damask Rose: Sourced from organic cooperatives, providing a lush, sweet floral top.',
          'Ethical Oud: Cultivated through fair-trade farming, offering a clean, woody-earthy heart.',
          'Warm Amber & Oakwood: Grounding the scent with a rich, smoky texture that lingers for hours.',
        ],
      },
      {
        type: 'p',
        value: 'By aligning what you wear with the health of the planet, Oryn Arabian Oud creates a cohesive sensory story. It shows an attention to detail that is the hallmark of modern luxury.',
      },
    ],
  },
  {
    slug: 'cherished-signatures-creating-scents-for-a-lifetime',
    title: 'Cherished Signatures: Creating Scents for a Lifetime',
    excerpt: 'Why our customers choose to wear a single, high-quality fragrance for years rather than rotating through cheap, mass-market trends.',
    date: 'May 28, 2026',
    readTime: '6 min read',
    category: 'Scent Science',
    image: '/images/blog-gin-garden.png',
    author: {
      name: 'Elena Rostova',
      role: 'Head of Fragrance Innovation',
      avatar: '🍃',
    },
    tags: ['Oryn Shanaya', 'Timelessness', 'Curation', 'Signature Scents'],
    relatedProduct: 'oryn-shanaya',
    content: [
      {
        type: 'p',
        value: 'We live in an age of hyper-consumption, where new trends are launched weekly and discarded just as fast. At ORYN, we stand against this cycle. We believe that your fragrance should be your signature—a consistent, beautiful constant that becomes a part of who you are.',
      },
      {
        type: 'h2',
        value: 'The Psychology of Scent and Memory',
      },
      {
        type: 'p',
        value: 'Scent is the most direct link to memory in the human brain. When you wear a single, high-quality signature fragrance consistently, you associate it with your life stories, milestones, and daily routines. It becomes a comforting anchor for you and a recognizable memory for those around you.',
      },
      {
        type: 'quote',
        value: '“A signature scent is not an accessory; it is an extension of your identity. To change it weekly is to lose your olfactory fingerprint.”',
      },
      {
        type: 'p',
        value: 'For Oryn Shanaya, we focused on building a fresh green-tea fragrance that is versatile enough for spring mornings, summer afternoons, and daily wear. It relies on durable natural extracts that wear beautifully in any climate.',
      },
      {
        type: 'list',
        value: [
          'Versatile Citrus: Fresh lime and bergamot for a refreshing daytime opening.',
          'Green Core: Organic green tea leaves and mint leaves for a lively, comforting heart.',
          'Durable Grounding: White woods and vetiver that ensure the scent persists through the day.',
        ],
      },
      {
        type: 'p',
        value: 'By choosing a singular, premium fragrance like Oryn Shanaya, you invest in your identity and reject the pressure of temporary trends. It is a choice of quality, depth, and sustainability.',
      },
    ],
  },
]

export default posts
