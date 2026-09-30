export default function ShippingPage() {
  return (
    <div className="bg-ivory text-ink">
      <section className="mx-auto max-w-3xl px-6 pt-40 md:pt-48 pb-28 md:pb-32">
        <p className="section-tag">Orders</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-10">Shipping Policy</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-stone mb-14">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-12 text-ink-soft font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">1. Order Processing Times</h2>
            <p className="mb-4">
              All orders are processed within 1-3 business days. Orders are not shipped or
              delivered on weekends or holidays.
            </p>
            <p>
              If we are experiencing a high volume of orders, shipments may be delayed by a few
              days. Please allow additional days in transit for delivery.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">2. Shipping Rates &amp; Delivery Estimates</h2>
            <p className="mb-4">Shipping charges for your order will be calculated and displayed at checkout.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard shipping: 3-5 business days</li>
              <li>Express shipping: 1-2 business days</li>
            </ul>
            <p className="mt-4">
              Delivery delays can occasionally occur, especially during peak seasons or due to
              unforeseen logistical issues.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">3. International Shipping</h2>
            <p>
              Because our products contain alcohol, there are specific regulations governing
              international shipments. Currently, we offer shipping to select international
              destinations. Customs, duties, and taxes are not included in the item price or
              shipping cost and are the responsibility of the customer.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
