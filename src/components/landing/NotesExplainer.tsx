'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ————————————————————————————————————————————————————————————————
   Interactive Olfactory Notes Pyramid & Sillage Timeline
———————————————————————————————————————————————————————————————— */

type Stage = {
  id: string
  label: string
  tier: string
  timeline: string
  duration: string
  diffusion: string
  description: string
  examples: string[]
  ingredients: { name: string; origin: string; role: string }[]
}

const pyramidStages: Stage[] = [
  {
    id: 'top',
    label: 'Top Notes',
    tier: 'Tier I · The Awakening',
    timeline: '0 – 15 Minutes',
    duration: 'Rapid Volatility',
    diffusion: 'High Radiance',
    description:
      'The initial rush that greets you upon the first spray. Composed of lighter molecules that evaporate quickly, setting the tone and mood of the composition before yielding to the deeper core.',
    examples: ['Damask Rose Petals', 'Sweet Bergamot', 'Crushed Saffron', 'Wild Berries', 'Pear Blossom'],
    ingredients: [
      { name: 'Saffron & Spices', origin: 'Kashmir & Grasse', role: 'Vibrant warmth & sparkling contrast' },
      { name: 'Italian Bergamot', origin: 'Calabria, Italy', role: 'Bright, citrus illumination' },
    ],
  },
  {
    id: 'heart',
    label: 'Heart Notes',
    tier: 'Tier II · The Soul',
    timeline: '30 Minutes – 3 Hours',
    duration: 'Medium Tenacity',
    diffusion: 'Warm Aura',
    description:
      'The true personality and signature trail of the fragrance. As top notes settle, the heart blooms with rich florals, botanical leaves, and spices that define your memorable scent memory.',
    examples: ['Rare Assam Oud', 'Night Jasmine', 'White Peony', 'Roasted Patchouli', 'Marshmallow Accord'],
    ingredients: [
      { name: 'Damask Rose & Jasmine', origin: 'Grasse & Kannauj', role: 'Sensual floral body & depth' },
      { name: 'Dark Spices & Woods', origin: 'Indian Orchards', role: 'Complex and captivating texture' },
    ],
  },
  {
    id: 'base',
    label: 'Base Notes',
    tier: 'Tier III · The Sillage',
    timeline: '3 – 12+ Hours',
    duration: 'Extrait Longevity',
    diffusion: 'Intimate Skin Trail',
    description:
      'The anchor and lingering signature that remains on skin, scarves, and clothing well into the next day. Deep resins, woods, amber, and skin musks that create the unforgettable aura people remember.',
    examples: ['Smoked Oakwood', 'Dry Golden Amber', 'Skin Musk', 'Bourbon Vanilla Bean', 'Haitian Vetiver'],
    ingredients: [
      { name: 'Rare Ambergris & Musk', origin: 'Botanical Resins', role: 'Fixative warmth & hypnotic trail' },
      { name: 'Smoked Oakwood & Oud', origin: 'Aged Casks', role: 'Unshakable 12-hour staying power' },
    ],
  },
]

export default function NotesExplainer() {
  const [selectedId, setSelectedId] = useState<string>('top')
  const activeStage = pyramidStages.find((s) => s.id === selectedId) || pyramidStages[0]

  return (
    <section id="notes" aria-labelledby="notes-heading" className="scroll-mt-20 bg-[#0D1B2E] py-20 md:py-28 relative">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#C9A84C]/15 blur-[120px]"
      />

      <div className="shell relative z-10">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="section-tag mb-4">Olfactory Architecture</span>
          <h2 id="notes-heading" className="font-serif text-3xl font-semibold leading-[1.1] text-[#EAE6FF] md:text-5xl">
            The Anatomy of an <span className="gold-gradient-text italic">Extrait</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-[1.8] text-[#9BAEC8]">
            Fragrance is time made tangible. Tap each tier of the pyramid to witness how ORYN scents unfold from the first mist to midnight.
          </p>
        </div>

        {/* Interactive Pyramid & Details Container */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Interactive Pyramid Navigator (Left 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {pyramidStages.map((stage, idx) => {
              const isSelected = stage.id === selectedId
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setSelectedId(stage.id)}
                  className={`group relative flex flex-col rounded-3xl border p-6 text-left transition-all duration-400 ${
                    isSelected
                      ? 'border-[#C9A84C] bg-gradient-to-r from-[#112240] via-[#0F1E35] to-[#0F1E35] shadow-card'
                      : 'border-[#1E3A5F] bg-[#0F1E35] hover:border-[#C9A84C]/40 hover:bg-[#112240]'
                  }`}
                  style={{
                    marginLeft: `${idx * 16}px`,
                    marginRight: `${idx * 16}px`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
                      {stage.tier}
                    </span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-[#EAE6FF]' : 'text-[#6B7FA3]'}`}>
                      {stage.timeline}
                    </span>
                  </div>

                  <h3 className="mt-1 font-serif text-2xl font-semibold text-[#EAE6FF] group-hover:text-[#C9A84C] transition-colors">
                    {stage.label}
                  </h3>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
                    <span className="text-xs text-[#9BAEC8] font-medium">
                      {stage.duration} · {stage.diffusion}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeNotesPill"
                      className="absolute -left-1 top-4 bottom-4 w-1.5 rounded-full bg-[#C9A84C] shadow-sm"
                    />
                  )}
                </button>
              )
            })}

            {/* Hours Timeline Bar */}
            <div className="mt-4 rounded-2xl border border-[#1E3A5F] bg-[#0F1E35] p-5 text-xs shadow-sm">
              <div className="flex justify-between text-[11px] font-semibold text-[#6B7FA3] mb-2">
                <span>0m (Spray)</span>
                <span>2h (Bloom)</span>
                <span>6h (Intimacy)</span>
                <span className="text-[#C9A84C] font-bold">12h+ (Legacy)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#0D1B2E] border border-[#1E3A5F] overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] rounded-full"
                  animate={{
                    width: selectedId === 'top' ? '25%' : selectedId === 'heart' ? '60%' : '100%',
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Details Spotlight Display (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-[#1E3A5F] bg-[#0F1E35] p-8 md:p-10 shadow-card"
              >
                <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
                      {activeStage.tier}
                    </span>
                    <h3 className="mt-1 font-serif text-3xl font-semibold text-[#EAE6FF]">
                      {activeStage.label}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="block font-serif text-xl font-bold text-[#C9A84C]">
                      {activeStage.timeline}
                    </span>
                    <span className="text-[11px] text-[#6B7FA3] uppercase tracking-wider">
                      Active Evaporation Window
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 text-[15.5px] leading-[1.8] text-[#9BAEC8]">
                  {activeStage.description}
                </p>

                {/* Signature Ingredients Breakdown */}
                <div className="mt-8">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A84C] mb-3">
                    Featured Master Essences
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeStage.ingredients.map((ing) => (
                      <div
                        key={ing.name}
                        className="rounded-2xl border border-[#1E3A5F] bg-[#112240] p-4 transition-all hover:border-[#C9A84C]/40"
                      >
                        <p className="font-serif text-base font-semibold text-[#EAE6FF]">{ing.name}</p>
                        <p className="text-[11px] font-medium text-[#C9A84C] mt-0.5">{ing.origin}</p>
                        <p className="text-xs text-[#9BAEC8] mt-2 leading-relaxed">{ing.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Note Accords Chips */}
                <div className="mt-6 pt-5 border-t border-[#1E3A5F]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7FA3] block mb-2.5">
                    Found in ORYN Formulations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeStage.examples.map((ex) => (
                      <span
                        key={ex}
                        className="rounded-full border border-[#C9A84C]/30 bg-[#112240] px-3.5 py-1 text-xs font-medium text-[#EAE6FF]"
                      >
                        ✦ {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
