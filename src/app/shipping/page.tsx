export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-transparent pb-32 text-olive">
      <section className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
        <span className="mono-tag text-[9px] font-bold text-stone mb-4 block">Orders</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-olive mb-8 tracking-wide">Shipping Policy</h1>
        
        <div className="space-y-8 text-sm text-olive/80 leading-relaxed font-sans">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">1. Order Processing Times</h2>
            <p>All orders for our carefully crafted fragrances are processed within 1-3 business days. Orders are not shipped or delivered on weekends or holidays.</p>
            <p>If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">2. Shipping Rates & Delivery Estimates</h2>
            <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Standard Shipping:</strong> 3-5 business days</li>
              <li><strong>Express Shipping:</strong> 1-2 business days</li>
            </ul>
            <p>Delivery delays can occasionally occur, especially during peak seasons or due to unforeseen logistical issues.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">3. International Shipping</h2>
            <p>Because our products contain alcohol, there are specific regulations governing international shipments. Currently, we offer shipping to select international destinations. Customs, duties, and taxes are not included in the item price or shipping cost and are the responsibility of the customer.</p>
          </section>
        </div>
      </section>
    </main>
  )
}
