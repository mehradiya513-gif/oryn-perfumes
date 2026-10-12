/* ORYN landing visual audit — headless Chrome (system), two widths.
   Checks: console errors, section presence, horizontal overflow (390px),
   hero/CTA visibility, FAQ toggle, quiz click-through. */
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome' })
  const report = {}

  for (const [name, viewport] of [['mobile', { width: 390, height: 844 }], ['desktop', { width: 1440, height: 900 }]]) {
    const page = await browser.newPage({ viewport })
    const errors = []
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text().slice(0, 200)) })
    page.on('pageerror', (err) => errors.push(String(err).slice(0, 200)))

    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 })

    const result = { errors }
    result.title = await page.title()
    result.sections = await page.$$eval('section[id]', (els) => els.map((e) => e.id))
    result.H_overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    result.heroCTAs = await page.$$eval('h1', (els) => els.length) > 0 &&
      (await page.getByRole('button', { name: 'Shop Now' }).isVisible().catch(() => false))

    if (name === 'mobile') {
      // FAQ toggle works
      const faqBtn = page.locator('#faq button').first()
      result.faq = await faqBtn.isVisible().catch(() => false)
      // Quiz click-through: three picks then a result card
      await page.locator('#scent-finder button', { hasText: 'Office' }).first().click()
      await page.locator('#scent-finder button', { hasText: 'Fresh & citrus' }).first().click()
      await page.locator('#scent-finder button', { hasText: 'Close to skin' }).first().click()
      await page.waitForTimeout(800)
      result.quizResult = await page.locator('#scent-fisher, #scent-finder').getByText('Your match').isVisible().catch(() => false)
      // Carousel is swipeable (scrollable)
      result.carouselScrollable = await page.$eval('#bestsellers ul', (el) => el.scrollWidth > el.clientWidth)
    }

    if (name === 'desktop') {
      // Bestsellers renders as 4-col grid (track not horizontally scrollable)
      result.carouselScrollable = await page.$eval('#bestsellers ul', (el) => el.scrollWidth > el.clientWidth + 2)
      // Header solid-on-scroll: scroll and check class
      await page.evaluate(() => window.scrollTo(0, 600))
      await page.waitForTimeout(700)
      result.headerSolid = await page.$eval('header', (el) => el.className.includes('bg-charcoal/95'))
    }

    report[name] = result
    await page.screenshot({ path: `oryn-${name}.png`, fullPage: true })
    await page.close()
  }

  await browser.close()
  console.log(JSON.stringify(report, null, 2))
})().catch((e) => { console.error('AUDIT FAILED:', e); process.exit(1) })
