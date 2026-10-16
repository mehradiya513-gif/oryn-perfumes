'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { type Product, products, formatINR, discountPct } from '@/lib/products'
import { useCart } from '@/context/CartContext'

/* ————————————————————————————————————————————————————————————————
   Bespoke Scent Finder Quiz — Midnight Noir & Champagne Gold
———————————————————————————————————————————————————————————————— */

type Answers = { occasion: string; family: string; intensity: string }

const questions: {
  key: keyof Answers
  title: string
  subtitle: string
  options: { label: string; value: string; desc: string }[]
}[] = [
  {
    key: 'occasion',
    title: 'Where will your fragrance leave its mark?',
    subtitle: 'Select the primary atmosphere and setting you wish to enchant.',
    options: [
      { label: 'Executive & Daily Wear', value: 'office', desc: 'Crisp, distinguished, and effortless from 9 to 5' },
      { label: 'Evenings & Intimate Dates', value: 'evening', desc: 'Sensual, magnetic, and unforgettable after dusk' },
      { label: 'Festive & Grand Occasions', value: 'festive', desc: 'Opulent, celebratory, with room-filling character' },
      { label: 'Everyday Signature', value: 'all', desc: 'Versatile masterpiece for any hour or season' },
    ],
  },
  {
    key: 'family',
    title: 'Which olfactory family captivates your senses?',
    subtitle: 'Your instinctual preference defines your core signature.',
    options: [
      { label: 'Deep Woody & Smoky Oud', value: 'woody', desc: 'Rare oud, aged cedarwood, amber, and incense' },
      { label: 'Floral & Velvety Romance', value: 'floral', desc: 'Damask rose, night jasmine, and pear blossoms' },
      { label: 'Sweet Gourmand & Warm Vanilla', value: 'sweet', desc: 'Bourbon vanilla bean, marshmallow, and tonka' },
      { label: 'Fresh Botanical & Zesty Citrus', value: 'fresh', desc: 'Bergamot, green tea leaves, and wild mint' },
    ],
  },
  {
    key: 'intensity',
    title: 'How should your presence be remembered?',
    subtitle: 'Choose your desired sillage and projection profile.',
    options: [
      { label: 'Intimate Aura', value: 'soft', desc: 'Subtle elegance that only those closest will detect' },
      { label: 'Confident Sillage', value: 'medium', desc: 'Harmonious scent trail that commands respect' },
      { label: 'Commanding Extrait', value: 'strong', desc: 'Rich 12-hour projection that fills the room with poise' },
    ],
  },
]

function recommend(answers: Answers): Product {
  let best: { product: Product; score: number } | null = null
  for (const p of products) {
    let score = 0
    const text = `${p.family} ${p.tagline} ${p.description} ${p.longevity}`.toLowerCase()

    if (answers.family === 'fresh' && /fresh|aromatic|green|citrus/.test(text)) score += 3
    if (answers.family === 'floral' && /floral|rose|jasmine|peony/.test(text)) score += 3
    if (answers.family === 'sweet' && /gourmand|sweet|vanilla|marshmallow/.test(text)) score += 3
    if (answers.family === 'woody' && /oud|amber|woody|smok|leather/.test(text)) score += 3

    if (answers.occasion === 'office' && /fresh|clean|daily/.test(text)) score += 2
    if (answers.occasion === 'evening' && /oud|amber|cozy|evening|night/.test(text)) score += 2
    if (answers.occasion === 'festive' && /festive|celebration|warm/.test(text)) score += 2
    if (answers.occasion === 'all') score += 1

    if (answers.intensity === 'strong' && /commanding|rich|bold/.test(text)) score += 2
    if (answers.intensity === 'medium' && /warm|aura/.test(text)) score += 1
    if (answers.intensity === 'soft' && /intimate|close|airy/.test(text)) score += 2

    if (/gift set/.test(p.family)) score -= 2
    if (!best || score > best.score) best = { product: p, score }
  }
  return best?.product ?? products[0]
}

export default function ScentFinder() {
  const { addToCart } = useCart()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [result, setResult] = useState<Product | null>(null)
  const [added, setAdded] = useState(false)

  const pick = (key: keyof Answers, value: string) => {
    const next = { ...answers, [key]: value }
    setAnswers(next)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setResult(recommend(next as Answers))
    }
  }

  const restart = () => {
    setAnswers({})
    setStep(0)
    setResult(null)
    setAdded(false)
  }

  const handleAdd = (prod: Product) => {
    addToCart(prod)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  const discount = result ? discountPct(result.price, result.mrp) : 0

  return (
    <section id="scent-finder" aria-labelledby="scent-finder-heading" className="scroll-mt-20 bg-[#FAF6F5] py-20 md:py-28 relative">
      <div className="shell">
        <div className="rounded-3xl border border-[#EBDCD7] bg-white p-8 md:p-14 shadow-card relative overflow-hidden">
          
          {/* Subtle rose aura backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#E8B8B0]/20 blur-[120px]"
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
            
            {/* Header info (Left 5 Cols) */}
            <div className="lg:col-span-5">
              <span className="section-tag mb-4">Olfactory Matching</span>
              <h2 id="scent-finder-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-[#23171B] md:text-5xl">
                Find Your <span className="gold-gradient-text italic">Signature</span> Sillage
              </h2>
              <p className="mt-5 text-sm leading-[1.8] text-[#5C484E]">
                Three bespoke questions calibrated to your tastes, occasions, and skin chemistry. Uncover the fragrance created to become your signature.
              </p>

              {/* Progress Bar */}
              {!result && (
                <div className="mt-8">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-[#A86359] mb-2">
                    <span>Consultation Step</span>
                    <span>{step + 1} of {questions.length}</span>
                  </div>
                  <div className="flex gap-2">
                    {questions.map((q, i) => (
                      <div
                        key={q.key}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-400 ${
                          i <= step ? 'bg-gradient-to-r from-[#D79F97] via-[#C5857B] to-[#A86359]' : 'bg-[#FAF6F5] border border-[#EBDCD7]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Questions / Match Stage (Right 7 Cols) */}
            <div className="lg:col-span-7">
              {!result ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-3xl border border-[#EBDCD7] bg-[#FAF6F5] p-6 md:p-8 shadow-sm"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A86359] mb-2">
                      Question 0{step + 1}
                    </p>
                    <h3 className="font-serif text-2xl font-semibold text-[#23171B] md:text-3xl">
                      {questions[step].title}
                    </h3>
                    <p className="mt-1 text-xs text-[#8D767C] mb-6">{questions[step].subtitle}</p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {questions[step].options.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => pick(questions[step].key, opt.value)}
                          className="group rounded-2xl border border-[#EBDCD7] bg-white p-4 text-left transition-all duration-300 hover:border-[#C5857B] hover:bg-[#F7EDE9] hover:shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-base font-semibold text-[#23171B] group-hover:text-[#A86359] transition-colors">
                              {opt.label}
                            </span>
                            <span className="text-[#A86359] text-xs opacity-0 transition-opacity group-hover:opacity-100">
                              →
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-[#8D767C] leading-relaxed group-hover:text-[#5C484E]">
                            {opt.desc}
                          </p>
                        </button>
                      ))}
                    </div>

                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8D767C] hover:text-[#23171B] transition-colors"
                      >
                        ← Back to previous question
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <AnimatePresence>
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6 rounded-3xl border border-[#C5857B]/40 bg-[#FAF6F5] p-6 sm:flex-row sm:p-8 shadow-card"
                  >
                    {/* Matched Product Bottle Showcase */}
                    <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#F5EBE6] sm:w-48 p-4 border border-[#EBDCD7]">
                      <Image
                        src={result.image}
                        alt={result.imageAlt}
                        fill
                        sizes="192px"
                        className="object-contain p-2 drop-shadow-[0_12px_24px_rgba(168,99,89,0.22)]"
                      />
                      {discount > 0 && (
                        <span className="absolute left-2.5 top-2.5 rounded bg-gradient-to-r from-[#D79F97] via-[#C5857B] to-[#A86359] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                          {discount}% off
                        </span>
                      )}
                    </div>

                    {/* Matched Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A86359]">
                          98% Olfactory Match
                        </span>
                      </div>

                      <h3 className="mt-2 font-serif text-2xl font-bold text-[#23171B] sm:text-3xl">
                        {result.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#A86359]">
                        {result.tagline}
                      </p>

                      <p className="mt-3 text-xs leading-[1.8] text-[#5C484E] line-clamp-3">
                        {result.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {result.topNotes.slice(0, 3).map((note) => (
                          <span
                            key={note}
                            className="rounded-md border border-[#EBDCD7] bg-white px-2.5 py-0.5 text-[10px] text-[#5C484E]"
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-wrap items-center gap-4 pt-5 border-t border-[#EBDCD7]">
                        <span className="text-xl font-bold text-[#23171B]">{formatINR(result.price)}</span>
                        <button
                          type="button"
                          onClick={() => handleAdd(result)}
                          disabled={added}
                          className={`btn-gold !px-6 !py-2.5 ${added ? '!bg-emerald-600 !text-white' : ''}`}
                        >
                          {added ? 'Added to Bag ✓' : 'Add to Bag'}
                        </button>
                        <button
                          type="button"
                          onClick={restart}
                          className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8D767C] hover:text-[#23171B] transition-colors"
                        >
                          Retake Quiz
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
