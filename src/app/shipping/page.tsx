export default function ShippingPage() {
  return (
    <div className="bg-obsidian text-pearl min-h-screen">
      <section className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 pb-28 md:pb-32">
        <span className="section-tag mb-4">Shipping Info</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">Shipping &amp; Delivery</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-12">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-sand text-sm leading-[1.8] rounded-3xl border border-[#262626] bg-[#161616] p-8 md:p-12 shadow-card">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">1. Order Processing</h2>
            <p className="mb-3">
              All orders are packed and prepared within 24–48 hours. Orders placed on Sundays or holidays are shipped on the next working day.
            </p>
            <p>
              Every parcel is safely packed with protective cushioning to keep your perfume bottle safe during transit.
            </p>
          </section>

          <section className="border-t border-[#262626] pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">2. Shipping Charges &amp; Delivery Times</h2>
            <p className="mb-4">Shipping is free across India on all orders above ₹499.</p>
            <ul className="list-disc pl-6 space-y-2 text-smoke">
              <li>Metro Cities (Mumbai, Delhi, Bengaluru, etc.): 2–4 business days</li>
              <li>Other Cities &amp; Towns: 3–6 business days</li>
              <li>Prepaid Orders (Instant UPI): Packed and shipped with priority within 24 hours</li>
            </ul>
          </section>

          <section className="border-t border-[#262626] pt-8">
            <h2 className="font-serif text-2xl font-semibold text-pearl mb-3">3. Tracking Your Order</h2>
            <p>
              You will receive an SMS and email with your tracking link as soon as your parcel ships. If you need any help with your delivery, message our team directly on WhatsApp.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
