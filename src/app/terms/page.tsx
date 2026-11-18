export default function TermsPage() {
  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      <section className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 pb-28 md:pb-32">
        <span className="section-tag mb-4">Terms</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">Terms of Service</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-12">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-sand text-sm leading-[1.8] rounded-3xl border border-[#262626] bg-[#161616] p-8 md:p-12">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">1. Agreement to Terms</h2>
            <p>
              By browsing ORYN and placing orders on our website, you agree to these simple terms and policies.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">2. Brand &amp; Content</h2>
            <p>
              All brand names, perfume designs, product photography, and website content are the property of ORYN.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">3. Products &amp; Pricing</h2>
            <p>
              All prices are listed in Indian Rupees (₹) with taxes included. Every perfume in our collection is kept affordably under ₹800 with no hidden costs.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
