'use client'

export default function ContactPage() {
  return (
    <div className="bg-ivory text-ink">
      <section className="mx-auto max-w-3xl px-6 pt-40 md:pt-52 pb-24 md:pb-32 text-center">
        <p className="section-tag">Contact</p>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.12] mb-8">
          Talk to <span className="italic">Oryn</span>
        </h1>
        <p className="text-ink-soft font-light leading-relaxed text-base md:text-lg max-w-xl mx-auto mb-16">
          A question about the fragrances, a note, a beginning — we read everything and answer
          personally.
        </p>

        <div className="border-t border-ink/15 pt-12 text-left">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdfK82gOEqk26t393lPCH1G8PRjAg60u3f1bAjgTdg1vWiySw/viewform?embedded=true"
            width="100%"
            height="720"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Oryn contact form"
            className="w-full"
          >
            Loading…
          </iframe>
        </div>
      </section>
    </div>
  )
}
