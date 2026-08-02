'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type Order = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  country: string
  paymentMethod: string
  total: number
  items: OrderItem[]
  created: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [sellerLoggedIn, setSellerLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])

  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [settingsSuccess, setSettingsSuccess] = useState('')
  const [settingsError, setSettingsError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const dashboardRef = useRef<HTMLDivElement | null>(null)

  // Verify login status on mount — redirect to login page if not authenticated
  useEffect(() => {
    const isLogged = localStorage.getItem('oryn_seller_logged_in')
    if (isLogged === 'true') {
      setSellerLoggedIn(true)
      fetchOrders()
      // Load current seller username
      setNewUsername(localStorage.getItem('oryn_seller_username') || 'seller')
    } else {
      router.replace('/admin/login')
    }
  }, [router])

  // Fetch orders from API
  const fetchOrders = () => {
    setLoading(true)
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || [])
        setLoading(false)
      })
      .catch(() => {
        setOrders([])
        setLoading(false)
      })
  }

  // Dashboard Stats Calculations
  const stats = useMemo(() => {
    if (orders.length === 0) {
      return { totalRevenue: 0, orderCount: 0, averageValue: 0 }
    }
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const orderCount = orders.length
    const averageValue = Math.round(totalRevenue / orderCount)
    return { totalRevenue, orderCount, averageValue }
  }, [orders])

  // Update credentials handler
  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault()
    setSettingsError('')
    setSettingsSuccess('')

    const username = newUsername.trim()
    const password = newPassword.trim()
    const confirm = confirmPassword.trim()

    if (!username) {
      setSettingsError('Username cannot be empty.')
      return
    }
    if (username.length < 3) {
      setSettingsError('Username must be at least 3 characters.')
      return
    }
    if (!password) {
      setSettingsError('Password cannot be empty.')
      return
    }
    if (password.length < 4) {
      setSettingsError('Password must be at least 4 characters.')
      return
    }
    if (password !== confirm) {
      setSettingsError('Passwords do not match.')
      return
    }

    setIsSaving(true)
    setTimeout(() => {
      localStorage.setItem('oryn_seller_username', username)
      localStorage.setItem('oryn_seller_password', password)
      // Keep admin session cookie alive
      document.cookie = 'oryn_admin_session=true; path=/; max-age=86400; SameSite=Lax'
      setNewPassword('')
      setConfirmPassword('')
      setSettingsSuccess('Access credentials updated successfully!')
      setIsSaving(false)
    }, 500)
  }

  // Logout handler
  const handleLogout = () => {
    setSellerLoggedIn(false)
    localStorage.removeItem('oryn_seller_logged_in')
    document.cookie = 'oryn_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/admin/login')
  }

  // Animations when dashboard opens
  useEffect(() => {
    if (sellerLoggedIn && !loading) {
      gsap.fromTo(
        '.admin-stat-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      )
      gsap.fromTo(
        '.admin-order-row',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.15 },
      )
    }
  }, [sellerLoggedIn, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center space-y-4 text-olive">
        <span className="text-4xl animate-pulse">⚜️</span>
        <h2 className="font-serif text-xl font-bold">Loading dashboard...</h2>
      </div>
    )
  }

  if (!sellerLoggedIn) return null

  return (
    <main className="min-h-screen bg-transparent py-24 px-6 sm:px-10 text-olive">
      {/* Admin Panel Dashboard */}
      <div className="mx-auto max-w-7xl" ref={dashboardRef}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand border border-stone/35">
                <span className="text-xs">📊</span>
                <p className="mono-tag text-[9px] font-bold text-stone">Administration</p>
              </div>
              <h1 className="font-serif text-4xl font-light lowercase italic tracking-wide text-olive">seller dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="rounded-full border border-stone/30 bg-sand text-olive px-6 py-2.5 text-xs font-bold uppercase tracking-wider font-mono transition hover:bg-stone/10 flex items-center gap-2 shadow-xs"
              >
                <span>🏠</span> Return to Store
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-olive hover:bg-stone border border-stone/30 text-oatmeal px-6 py-2.5 text-xs font-bold uppercase tracking-wider font-mono transition shadow-xs"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Statistics Metric Cards */}
          <div className="grid gap-6 sm:grid-cols-3 mb-12">
            {[
              { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, border: 'border-stone/20', bg: 'bg-sand/65', text: 'text-olive', icon: '💰' },
              { label: 'Total Orders', value: stats.orderCount, border: 'border-stone/20', bg: 'bg-sand/65', text: 'text-olive', icon: '📦' },
              { label: 'Average Ticket', value: `₹${stats.averageValue}`, border: 'border-stone/20', bg: 'bg-sand/65', text: 'text-olive', icon: '⚜️' },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`admin-stat-card rounded-3xl border ${card.border} ${card.bg} p-6 shadow-soft flex items-center justify-between transition-colors duration-300 hover:border-stone/40`}
              >
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-stone uppercase tracking-widest font-mono">{card.label}</p>
                  <p className={`text-3xl font-serif font-normal tracking-wide ${card.text}`}>{card.value}</p>
                </div>
                <div className="text-2xl bg-sand border border-stone/20 rounded-full h-11 w-11 flex items-center justify-center shadow-xs">
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3 items-start">
            {/* Orders Section */}
            <div className="lg:col-span-2 rounded-wabi-2 border border-stone/20 bg-sand/65 p-8 md:p-10 shadow-soft relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-stone/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-stone/20">
                <h2 className="font-serif text-2xl font-light text-olive">Purchase Orders Vault</h2>
                <button
                  onClick={fetchOrders}
                  className="text-[10px] font-bold uppercase tracking-wider text-olive/80 hover:text-olive flex items-center gap-1.5 bg-sand border border-stone/30 rounded-xl px-4 py-2 transition hover:bg-stone/15 font-mono"
                >
                  🔄 Refresh Orders
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="rounded-[28px] border border-dashed border-stone/25 bg-sand/35 p-16 text-center space-y-4">
                  <span className="text-4xl text-stone/40">⚜️</span>
                  <p className="text-olive font-serif text-lg font-bold">No purchase orders placed yet</p>
                  <p className="text-stone/85 text-xs max-w-xs mx-auto leading-relaxed">
                    When customers purchase fragrances from your ORYN store, their order files will populate in this registry.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="admin-order-row rounded-3xl border border-stone/15 bg-sand/40 p-6 hover:border-stone/35 hover:bg-sand/70 transition duration-300 space-y-5 shadow-xs"
                    >
                      {/* Header Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone/15 pb-4">
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <p className="text-[10px] font-bold text-stone uppercase tracking-widest font-mono">ORDER FILE #{order.id}</p>
                            <span className="px-3 py-0.5 rounded-full bg-sand border border-stone/30 text-[9px] font-bold text-olive uppercase tracking-wider font-mono">
                              {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'upi' ? 'Pay by any UPI' : order.paymentMethod || 'Cash on Delivery'}
                            </span>
                          </div>
                          <p className="text-base font-serif font-semibold text-olive tracking-wide mt-1.5">{order.name || 'Guest Customer'}</p>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-[10px] text-stone/80 font-bold uppercase tracking-wider font-mono">{order.created}</p>
                          <p className="text-2xl font-serif font-normal text-olive mt-1">₹{order.total}</p>
                        </div>
                      </div>

                      {/* Customer details Grid */}
                      <div className="grid gap-4 sm:grid-cols-3 text-xs text-olive/85 bg-sand/40 border border-stone/15 rounded-xl p-4">
                        <div>
                          <p className="text-[9px] uppercase font-bold text-stone tracking-widest font-mono">Email Address</p>
                          <p className="font-semibold text-olive/90 mt-1 truncate">{order.email}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-bold text-stone tracking-widest font-mono">Contact Phone</p>
                          <p className="font-semibold text-olive/90 mt-1">{order.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-bold text-stone tracking-widest font-mono">Delivery Address</p>
                          <p className="font-semibold text-olive/90 mt-1 whitespace-pre-wrap leading-relaxed">{order.address}</p>
                        </div>
                      </div>

                      {/* Purchased items mapping */}
                      <div className="space-y-3">
                        <p className="text-[9px] uppercase font-bold text-stone tracking-widest font-mono">Registry Items</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between rounded-xl bg-sand/40 border border-stone/15 p-4 hover:border-stone/25 transition shadow-2xs"
                            >
                              <div className="space-y-1">
                                <p className="text-xs font-serif font-semibold text-olive">{item.name}</p>
                                <p className="text-[10px] text-stone/60 font-semibold uppercase tracking-wider font-mono">Qty: {item.quantity}</p>
                              </div>
                              {item.price === 0 ? (
                                <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[9px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
                                  🎁 Free Gift
                                </span>
                              ) : (
                                <p className="text-xs font-bold text-olive font-semibold">₹{item.price * item.quantity}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Access Settings Card */}
            <div className="rounded-wabi-2 border border-stone/20 bg-sand/65 p-8 md:p-10 shadow-soft relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-48 h-48 bg-stone/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="border-b border-stone/20 pb-5">
                <h2 className="font-serif text-2xl font-light text-olive">Access Credentials</h2>
                <p className="text-[10px] text-stone/85 mt-1 font-mono">Manage your seller dashboard login information</p>
              </div>

              <form onSubmit={handleUpdateCredentials} className="space-y-4 relative">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-olive/80 font-mono">
                  Username
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => { setNewUsername(e.target.value); setSettingsError(''); setSettingsSuccess('') }}
                    className="mt-2 w-full rounded-xl border border-stone/30 bg-oatmeal px-4 py-2.5 text-xs text-olive outline-none focus:border-olive/60 transition"
                    placeholder="Enter username"
                  />
                </label>

                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-olive/80 font-mono">
                  New Password
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); setSettingsError(''); setSettingsSuccess('') }}
                    className="mt-2 w-full rounded-xl border border-stone/30 bg-oatmeal px-4 py-2.5 text-xs text-olive outline-none focus:border-olive/60 transition"
                    placeholder="••••••••"
                  />
                </label>

                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-olive/80 font-mono">
                  Confirm Password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setSettingsError(''); setSettingsSuccess('') }}
                    className="mt-2 w-full rounded-xl border border-stone/30 bg-oatmeal px-4 py-2.5 text-xs text-olive outline-none focus:border-olive/60 transition"
                    placeholder="••••••••"
                  />
                </label>

                {settingsError && (
                  <div className="rounded-xl border border-red-200 bg-red-50/80 px-3 py-2 text-[10px] font-semibold text-red-800 text-center leading-relaxed">
                    ⚠️ {settingsError}
                  </div>
                )}

                {settingsSuccess && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-[10px] font-semibold text-emerald-800 text-center leading-relaxed">
                    ✓ {settingsSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full mt-2 rounded-full bg-olive text-oatmeal py-3.5 text-[10px] font-bold uppercase tracking-wider font-mono transition hover:bg-stone disabled:opacity-75 cursor-pointer shadow-sm"
                >
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
              </form>
            </div>
          </div>
        </div>
    </main>
  )
}
