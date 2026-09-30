export default function PrivacyPage() {
  return (
    <div className="bg-ivory text-ink">
      <section className="mx-auto max-w-3xl px-6 pt-40 md:pt-48 pb-28 md:pb-32">
        <p className="section-tag">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-10">Privacy Policy</h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-stone mb-14">
          Last updated {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-12 text-ink-soft font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              At Oryn, one of our main priorities is the privacy of our visitors. This Privacy
              Policy document contains the types of information collected and recorded by Oryn
              and how we use it.
            </p>
            <p>
              If you choose to use our service, then you agree to the collection and use of
              information in relation to this policy. The personal information that we collect is
              used for providing and improving the service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">2. Log Files</h2>
            <p>
              Oryn follows a standard procedure of using log files. These files log visitors when
              they visit websites. The information collected by log files may include internet
              protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and
              time stamp, referring/exit pages, and possibly the number of clicks.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">3. Cookies and Web Beacons</h2>
            <p>
              Like any other website, Oryn uses &ldquo;cookies&rdquo;. These cookies are used to
              store information including visitors&rsquo; preferences, and the pages on the
              website that the visitor accessed or visited. The information is used to optimize
              the user&rsquo;s experience.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
