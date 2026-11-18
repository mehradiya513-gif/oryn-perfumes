'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SellerLoginPage() {
  const router = useRouter()
  const [sellerUser, setSellerUser] = useState('')
  const [sellerPass, setSellerPass] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    const isLogged = localStorage.getItem('oryn_seller_logged_in')
    if (isLogged === 'true') {
      router.replace('/admin')
    }
  }, [router])

  // Secret query bypass for owner
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const secret = params.get('secret')
      if (secret === 'oryn-owner-key') {
        document.cookie = 'oryn_admin_session=true; path=/; max-age=86400; SameSite=Lax'
        localStorage.setItem('oryn_seller_logged_in', 'true')
        router.replace('/admin')
      }
    }
  }, [router])

  const handleSellerLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const user = sellerUser.trim()
    const pass = sellerPass.trim()

    if (!user || !pass) {
      setLoginError('Please enter both username and password.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const storedUser = (localStorage.getItem('oryn_seller_username') || 'seller').toLowerCase()
      const storedPass = localStorage.getItem('oryn_seller_password') || 'oryn123'

      if (user.toLowerCase() === storedUser && pass === storedPass) {
        localStorage.setItem('oryn_seller_logged_in', 'true')
        document.cookie = 'oryn_admin_session=true; path=/; max-age=86400; SameSite=Lax'
        router.push('/admin')
      } else {
        setLoginError('Invalid credentials. Default username is "seller" and password is "oryn123".')
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F2EB] flex items-center justify-center px-4 relative overflow-hidden py-12">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/10 blur-[130px] pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl border border-[#262626] bg-[#121212]/95 backdrop-blur-xl p-8 sm:p-10 shadow-card space-y-7 z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto h-14 w-14 rounded-full border border-[#C9A84C]/40 bg-gradient-to-b from-[#C9A84C]/20 to-transparent flex items-center justify-center p-2 text-[#C9A84C] shadow-sm">
            <Image
              src="/images/oryn-emblem-gold.png"
              alt="ORYN Insignia"
              width={34}
              height={34}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]">
              Haute Parfumerie
            </p>
            <h1 className="font-serif text-3xl font-semibold tracking-wide text-[#F5F2EB] mt-1">
              Seller Portal
            </h1>
            <p className="text-xs text-[#78716C] mt-1">
              Atelier Order Fulfillment &amp; Operations Registry
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#262626] to-transparent" />

        {/* Form */}
        <form onSubmit={handleSellerLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-2">
              Username
            </label>
            <input
              type="text"
              required
              value={sellerUser}
              onChange={(e) => { setSellerUser(e.target.value); setLoginError('') }}
              placeholder="e.g. seller"
              autoComplete="username"
              className="w-full rounded-xl border border-[#262626] bg-[#0A0A0A] px-4 py-3 text-sm text-[#F5F2EB] placeholder:text-[#78716C] outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-2">
              Access Key / Password
            </label>
            <input
              type="password"
              required
              value={sellerPass}
              onChange={(e) => { setSellerPass(e.target.value); setLoginError('') }}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-xl border border-[#262626] bg-[#0A0A0A] px-4 py-3 text-sm text-[#F5F2EB] placeholder:text-[#78716C] outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>

          {loginError && (
            <div className="rounded-xl border border-red-900/60 bg-red-950/40 p-3 text-xs text-red-300 text-center">
              ⚠️ {loginError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-gold w-full mt-2 !py-3.5 text-center disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Authenticating…' : 'Enter Seller Dashboard'}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-[#262626]">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-[11px] font-semibold text-[#78716C] hover:text-[#C9A84C] transition-colors uppercase tracking-wider"
          >
            ← Return to Boutique
          </button>
        </div>

      </div>
    </main>
  )
}
