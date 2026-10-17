export default function ShippingPage() {
  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      <section className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 pb-28 md:pb-32">
        <span className="section-tag mb-4">Orders &amp; Dispatch</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">Shipping &amp; Delivery</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-12">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-sand text-sm leading-[1.8] rounded-3xl border border-[#1E3A5F] bg-[#0F1E35] p-8 md:p-12 shadow-card">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">1. Order Processing Times</h2>
            <p className="mb-3">
              All orders are hand-packaged and prepared within 24–48 business hours. Orders placed over weekends or national holidays are dispatched on the subsequent business morning.
            </p>
            <p>
              Each parcel is sealed in tamper-evident cushioning to safeguard the glass flacon during transit.
            </p>
          </section>

          <section className="border-t border-[#1E3A5F] pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">2. Shipping Tariffs &amp; Estimates</h2>
            <p className="mb-4">Shipping is complimentary across India on all orders exceeding ₹499.</p>
            <ul className="list-disc pl-6 space-y-2 text-smoke">
              <li>Metro Cities (Mumbai, Delhi, Bengaluru, etc.): 2–4 business days</li>
              <li>Tier 2 &amp; Regional Centers: 3–6 business days</li>
              <li>Cash on Delivery: Available pan-India at no extra fee</li>
            </ul>
          </section>

          <section className="border-t border-[#1E3A5F] pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">3. Tracking &amp; Delivery Guarantees</h2>
            <p>
              A tracking identifier is dispatched via SMS and email upon courier handoff. For urgent assistance or delivery queries, contact our concierge directly via WhatsApp.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
