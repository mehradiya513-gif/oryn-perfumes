export default function PrivacyPage() {
  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      <section className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 pb-28 md:pb-32">
        <span className="section-tag mb-4">Privacy</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">Privacy Policy</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-12">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-sand text-sm leading-[1.8] rounded-3xl border border-[#262626] bg-[#161616] p-8 md:p-12">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              At ORYN, your privacy is very important to us. We only collect the basic information needed to deliver your perfumes, process your payments safely, and send you order tracking updates.
            </p>
            <p>
              We never sell, rent, or share your personal contact information with third-party advertisers.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">2. Payment Security</h2>
            <p>
              All payments are processed securely through encrypted banking gateways. We never see, store, or have access to your private UPI PIN, passwords, or card numbers.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">3. Cookies</h2>
            <p>
              We only use simple website cookies to remember the items in your shopping bag so you can easily checkout without losing your cart.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
