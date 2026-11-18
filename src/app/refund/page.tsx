export default function RefundPage() {
  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      <section className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 pb-28 md:pb-32">
        <span className="section-tag mb-4">Refund Policy</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">Cancellations &amp; Refunds</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-12">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-sand text-sm leading-[1.8] rounded-3xl border border-[#262626] bg-[#161616] p-8 md:p-12 shadow-card">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">1. Order Cancellations</h2>
            <p>
              You can cancel your order for a full 100% refund at any time before your package is shipped. Once an order has been picked up by the courier, it cannot be cancelled.
            </p>
          </section>

          <section className="border-t border-[#262626] pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">2. Returns &amp; Replacements</h2>
            <p className="mb-3">
              For hygiene and health safety reasons, perfume bottles cannot be returned or exchanged once delivered.
            </p>
            <p>
              However, if your bottle arrives damaged, broken, or leaking during shipping, simply send a photo of the package to our WhatsApp support within 48 hours. We will immediately send you a free replacement bottle.
            </p>
          </section>

          <section className="border-t border-[#262626] pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">3. How Refunds Work</h2>
            <p className="mb-3">
              For any cancellation before shipping, your refund will be transferred directly back to your original UPI or bank account within 5–7 working days.
            </p>
            <p>
              If you have any questions about your order or payment, reach out to our team on WhatsApp and we will gladly help you.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
