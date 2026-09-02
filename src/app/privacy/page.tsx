export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-transparent pb-32 text-olive">
      <section className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
        <span className="mono-tag text-[9px] font-bold text-stone mb-4 block">Legal</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-olive mb-8 tracking-wide">Privacy Policy</h1>
        
        <div className="space-y-8 text-sm text-olive/80 leading-relaxed font-sans">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">1. Information We Collect</h2>
            <p>At ORYN, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ORYN and how we use it.</p>
            <p>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">2. Log Files</h2>
            <p>ORYN follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-olive">3. Cookies and Web Beacons</h2>
            <p>Like any other website, ORYN uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience.</p>
          </section>
        </div>
      </section>
    </main>
  )
}
