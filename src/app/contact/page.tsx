export default function ContactPage() {
  return (
    <div className="bg-ivory text-ink">
      <section className="shell pb-24 pt-32 md:pb-32 md:pt-44">
        <div className="max-w-2xl">
          <p className="section-tag mb-6">Contact</p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-[-0.015em] text-ink md:text-6xl">
            Talk to <span className="italic">Oryn</span>
          </h1>
          <p className="mt-8 text-[16px] leading-[1.8] text-ink-soft md:text-[17px]">
            A question about the fragrances, a note, a beginning — we read everything and answer
            personally.
          </p>
        </div>

        <div className="mt-14 border-t border-ink/15 pt-12 md:mt-16">
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
