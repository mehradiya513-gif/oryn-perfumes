'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { type Product, products, formatINR, discountPct } from '@/lib/products'
import { useCart } from '@/context/CartContext'

/* ————————————————————————————————————————————————————————————————
   ScentFinder — 3-question quiz (occasion → scent family →
   intensity) that scores the catalog and recommends one product.
   Keyboard accessible: every option is a real button; Escape
   resets. Results swap with a fade.
———————————————————————————————————————————————————————————————— */

type Answers = { occasion: string; family: string; intensity: string }

const questions: {
  key: keyof Answers
  title: string
  options: { label: string; value: string }[]
}[] = [
  {
    key: 'occasion',
    title: 'Where will you wear it most?',
    options: [
      { label: 'Office & daily wear', value: 'office' },
      { label: 'Evenings & dates', value: 'evening' },
      { label: 'Festive occasions', value: 'festive' },
      { label: 'Everything, honestly', value: 'all' },
    ],
  },
  {
    key: 'family',
    title: 'Which family draws you in?',
    options: [
      { label: 'Fresh & citrus', value: 'fresh' },
      { label: 'Floral & romantic', value: 'floral' },
      { label: 'Sweet & cozy', value: 'sweet' },
      { label: 'Deep & woody', value: 'woody' },
    ],
  },
  {
    key: 'intensity',
    title: 'How strong should the trail be?',
    options: [
      { label: 'Close to skin', value: 'soft' },
      { label: 'A confident aura', value: 'medium' },
      { label: 'Room to fill', value: 'strong' },
    ],
  },
]

/* Simple manual scoring — keep it tweakable, not clever. */
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

    if (/gift set/.test(p.family)) score -= 2 // gift sets are not scent answers
    if (!best || score > best.score) best = { product: p, score }
  }
  return best?.product ?? products[0]
}

export default function ScentFinder() {
  const { addToCart } = useCart()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [result, setResult] = useState<Product | null>(null)

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
  }

  const discount = result ? discountPct(result.price, result.mrp) : 0

  return (
    <section id="scent-finder" aria-labelledby="scent-finder-heading" className="scroll-mt-20 bg-blush">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="section-tag mb-5">Scent Finder</p>
            <h2 id="scent-finder-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-ink md:text-[2.6rem]">
              Three questions to <span className="italic">your</span> signature
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.8] text-ink-soft">
              Answer honestly — the catalog is small on purpose, so every recommendation is a real
              match, not a marketing exercise.
            </p>
            {/* Progress */}
            {!result && (
              <ol className="mt-8 flex gap-2" aria-label="Quiz progress">
                {questions.map((q, i) => (
                  <li
                    key={q.key}
                    aria-current={i === step ? 'step' : undefined}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= step ? 'bg-ink' : 'bg-ink/15'
                    }`}
                  />
                ))}
              </ol>
            )}
          </div>

          <div className="lg:col-span-7">
            {/* Quiz steps */}
            {!result && (
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-ink-soft">
                      Question {step + 1} of {questions.length}
                    </p>
                    <h3 className="mb-7 font-serif text-2xl text-ink">
                      {questions[step].title}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {questions[step].options.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => pick(questions[step].key, opt.value)}
                          className="border border-ink/15 bg-ivory px-5 py-4 text-left text-[14px] font-medium text-ink transition-all duration-300 hover:border-ink hover:-translate-y-0.5"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
                      >
                        ← Back
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-6 border border-ink/15 bg-ivory p-6 sm:flex-row sm:p-8"
                  aria-live="polite"
                >
                  <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-beige sm:w-44">
                    <Image src={result.image} alt={result.imageAlt} fill sizes="176px" className="object-cover" />
                    {discount > 0 && (
                      <span className="absolute left-2 top-2 bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
                        {discount}% off
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Your match</p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">{result.name}</h3>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                      {result.tagline}
                    </p>
                    <p className="mt-4 text-[14.5px] leading-[1.75] text-ink-soft">{result.description}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-5 pt-5">
                      <span className="text-[15px] font-semibold text-ink">{formatINR(result.price)}</span>
                      <button type="button" onClick={() => addToCart(result)} className="btn-dark !px-7 !py-3">
                        Add to cart
                      </button>
                      <button
                        type="button"
                        onClick={restart}
                        className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
                      >
                        Retake
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
