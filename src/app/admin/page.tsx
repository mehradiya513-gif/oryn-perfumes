'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

type FreebieItem = {
  id: string
  name: string
  price?: number
  quantity?: number
  image?: string
  description?: string
}

type Order = {
  id: string
  _id?: string
  name: string
  email: string
  phone: string
  address: string
  country: string
  paymentMethod: string
  total: number
  items: OrderItem[]
  freebies?: FreebieItem[]
  created: string
  createdAt?: string
  status?: 'pending' | 'dispatched'
}

type Lead = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [sellerLoggedIn, setSellerLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [activeTab, setActiveTab] = useState<'orders' | 'leads' | 'settings'>('orders')
  const [dispatchingId, setDispatchingId] = useState<string | null>(null)
  const [copyNotification, setCopyNotification] = useState<string | null>(null)

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'dispatched'>('all')
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'cod' | 'upi'>('all')

  // Settings state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [settingsSuccess, setSettingsSuccess] = useState('')
  const [settingsError, setSettingsError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Verify authentication on mount via server-side session
  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setSellerLoggedIn(true)
          if (data.username) setNewUsername(data.username)
          fetchOrders()
          fetchLeads()
        } else {
          router.replace('/admin/login')
        }
      })
      .catch(() => {
        router.replace('/admin/login')
      })
  }, [router])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data.orders || [])
    } catch {
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      setLeads(data.leads || [])
    } catch {
      setLeads([])
    }
  }

  const handleUpdateStatus = async (orderId: string, newStatus: 'pending' | 'dispatched') => {
    setDispatchingId(orderId)
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        )
      } else {
        alert('Failed to update status.')
      }
    } catch (e) {
      console.error(e)
      alert('Error communicating with server.')
    } finally {
      setDispatchingId(null)
    }
  }

  // Copy helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopyNotification(label)
    setTimeout(() => setCopyNotification(null), 2200)
  }

  // Export orders to CSV
  const handleExportCSV = () => {
    if (orders.length === 0) return
    const headers = ['Order ID', 'Date', 'Customer Name', 'Email', 'Phone', 'Address', 'Country', 'Payment Method', 'Items', 'Total (INR)', 'Status']
    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${o.created}"`,
      `"${o.name.replace(/"/g, '""')}"`,
      `"${o.email}"`,
      `"${o.phone || ''}"`,
      `"${(o.address || '').replace(/"/g, '""')}"`,
      `"${o.country || 'India'}"`,
      `"${o.paymentMethod || 'cod'}"`,
      `"${(o.items || []).map((i) => `${i.name} (x${i.quantity})`).join(', ').replace(/"/g, '""')}"`,
      o.total,
      `"${o.status || 'pending'}"`,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `ORYN_Orders_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Dashboard Stats Calculations
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
    const orderCount = orders.length
    const pendingCount = orders.filter((o) => o.status !== 'dispatched').length
    const dispatchedCount = orders.filter((o) => o.status === 'dispatched').length
    const averageValue = orderCount > 0 ? Math.round(totalRevenue / orderCount) : 0
    return { totalRevenue, orderCount, pendingCount, dispatchedCount, averageValue }
  }, [orders])

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (statusFilter === 'pending' && order.status === 'dispatched') return false
      if (statusFilter === 'dispatched' && order.status !== 'dispatched') return false

      // Payment filter
      if (paymentFilter === 'cod' && order.paymentMethod !== 'cod') return false
      if (paymentFilter === 'upi' && !order.paymentMethod?.toLowerCase().includes('upi')) return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchId = order.id?.toLowerCase().includes(q)
        const matchName = order.name?.toLowerCase().includes(q)
        const matchEmail = order.email?.toLowerCase().includes(q)
        const matchPhone = order.phone?.toLowerCase().includes(q)
        const matchAddress = order.address?.toLowerCase().includes(q)
        const matchItem = order.items?.some((i) => i.name?.toLowerCase().includes(q))
        if (!matchId && !matchName && !matchEmail && !matchPhone && !matchAddress && !matchItem) {
          return false
        }
      }

      return true
    })
  }, [orders, statusFilter, paymentFilter, searchQuery])

  // Update credentials
  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    setSettingsError('')
    setSettingsSuccess('')

    const username = newUsername.trim()
    const password = newPassword.trim()
    const confirm = confirmPassword.trim()

    if (!currentPassword) {
      setSettingsError('Please enter your current password.')
      return
    }
    if (!username || username.length < 3) {
      setSettingsError('Username must be at least 3 characters.')
      return
    }
    if (!password || password.length < 6) {
      setSettingsError('New password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setSettingsError('Passwords do not match.')
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newUsername: username,
          newPassword: password,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setSettingsSuccess('Access credentials updated successfully in database!')
      } else {
        setSettingsError(data.error || 'Failed to update credentials.')
      }
    } catch {
      setSettingsError('Network error updating credentials.')
    } finally {
      setIsSaving(false)
    }
  }

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
    } catch {
      // ignore
    }
    setSellerLoggedIn(false)
    localStorage.removeItem('oryn_seller_logged_in')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center space-y-4 text-[#F5F2EB]">
        <div className="h-10 w-10 border-2 border-[#262626] border-t-[#C9A84C] rounded-full animate-spin" />
        <h2 className="font-serif text-xl font-semibold text-[#C9A84C]">Accessing Atelier Registry…</h2>
      </div>
    )
  }

  if (!sellerLoggedIn) return null

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F2EB] py-8 sm:py-12 px-4 sm:px-8 lg:px-12">
      {/* Toast Notification */}
      {copyNotification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-[#C9A84C] bg-[#121212] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#C9A84C] shadow-gold-sm animate-fade-in flex items-center gap-2">
          <span>✓</span> {copyNotification}
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-10">

        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#262626]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C9A84C]/40 bg-[#121212] text-[#C9A84C] p-2 shadow-sm">
              <Image
                src="/images/oryn-emblem-gold.png"
                alt="ORYN Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
                  ORYN Atelier Administration
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="System Live" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F5F2EB]">
                Fulfillment &amp; Orders Registry
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchOrders}
              className="flex items-center gap-2 rounded-xl border border-[#262626] bg-[#121212] px-4 py-2.5 text-xs font-semibold text-[#F5F2EB] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              title="Refresh Orders List"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Refresh</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-[#262626] bg-[#121212] px-4 py-2.5 text-xs font-semibold text-[#F5F2EB] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Storefront</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-red-900/60 bg-red-950/20 px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-900/40 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="rounded-2xl border border-[#262626] bg-[#121212] p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">Gross Sales</p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F2EB] mt-1.5">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </p>
            <span className="text-[10px] text-[#C9A84C] mt-1 block">✦ All orders placed</span>
          </div>

          <div className="rounded-2xl border border-[#262626] bg-[#121212] p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">Total Orders</p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F2EB] mt-1.5">
              {stats.orderCount}
            </p>
            <span className="text-[10px] text-[#A8A29E] mt-1 block">Lifetime volume</span>
          </div>

          <div className="rounded-2xl border border-amber-900/40 bg-[#14120e] p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Needs Dispatch</p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-300 mt-1.5">
              {stats.pendingCount}
            </p>
            <span className="text-[10px] text-amber-500 mt-1 block">Awaiting packaging</span>
          </div>

          <div className="rounded-2xl border border-emerald-900/40 bg-[#0e1411] p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Dispatched</p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-emerald-300 mt-1.5">
              {stats.dispatchedCount}
            </p>
            <span className="text-[10px] text-emerald-500 mt-1 block">Handed to courier</span>
          </div>

          <div className="rounded-2xl border border-[#262626] bg-[#121212] p-5 shadow-sm col-span-2 lg:col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">Average Ticket</p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#C9A84C] mt-1.5">
              ₹{stats.averageValue.toLocaleString('en-IN')}
            </p>
            <span className="text-[10px] text-[#78716C] mt-1 block">Average order total</span>
          </div>
        </div>

        {/* Tab Navigation & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'orders'
                  ? 'bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] text-[#0A0A0A] shadow-gold-sm'
                  : 'border border-[#262626] bg-[#121212] text-[#A8A29E] hover:text-[#F5F2EB]'
                }`}
            >
              Orders ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('leads')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'leads'
                  ? 'bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] text-[#0A0A0A] shadow-gold-sm'
                  : 'border border-[#262626] bg-[#121212] text-[#A8A29E] hover:text-[#F5F2EB]'
                }`}
            >
              Inquiries &amp; Leads ({leads.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'settings'
                  ? 'bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] text-[#0A0A0A] shadow-gold-sm'
                  : 'border border-[#262626] bg-[#121212] text-[#A8A29E] hover:text-[#F5F2EB]'
                }`}
            >
              Credentials
            </button>
          </div>

          {activeTab === 'orders' && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center gap-2 rounded-xl border border-[#262626] bg-[#161616] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
                title="Download CSV for Excel"
              >
                <span>📥</span> Export CSV
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Orders View */}
        {activeTab === 'orders' && (
          <div className="space-y-6">

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-[#262626] bg-[#121212] p-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order ID, name, email, phone, or address…"
                  className="w-full rounded-xl border border-[#262626] bg-[#0A0A0A] pl-10 pr-4 py-2.5 text-xs text-[#F5F2EB] placeholder:text-[#78716C] outline-none focus:border-[#C9A84C] transition-colors"
                />
                <svg
                  className="absolute left-3.5 top-3 text-[#78716C]"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                </svg>
              </div>

              {/* Status Select */}
              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="rounded-xl border border-[#262626] bg-[#0A0A0A] px-3 py-2.5 text-xs text-[#F5F2EB] outline-none focus:border-[#C9A84C]"
                >
                  <option value="all">Status: All</option>
                  <option value="pending">Status: ⏳ Pending</option>
                  <option value="dispatched">Status: ✓ Dispatched</option>
                </select>

                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value as any)}
                  className="rounded-xl border border-[#262626] bg-[#0A0A0A] px-3 py-2.5 text-xs text-[#F5F2EB] outline-none focus:border-[#C9A84C]"
                >
                  <option value="all">Payment: All</option>
                  <option value="cod">Payment: COD</option>
                  <option value="upi">Payment: UPI</option>
                </select>
              </div>
            </div>

            {/* Orders Feed */}
            {filteredOrders.length === 0 ? (
              <div className="rounded-3xl border border-[#262626] bg-[#121212] p-16 text-center space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full border border-[#C9A84C]/30 bg-[#0A0A0A] flex items-center justify-center text-2xl text-[#C9A84C]">
                  📦
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#F5F2EB]">
                  {orders.length === 0 ? 'No orders recorded yet' : 'No matching orders found'}
                </h3>
                <p className="text-xs text-[#78716C] max-w-sm mx-auto leading-relaxed">
                  {orders.length === 0
                    ? 'When patrons place orders on your ORYN boutique, complete customer files and items will appear here.'
                    : 'Try clearing your search query or adjusting your status and payment filters.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => {
                  const isDispatched = order.status === 'dispatched'
                  const rawPhone = order.phone || ''
                  const cleanPhone = rawPhone.replace(/[^0-9]/g, '')
                  const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`
                  const courierLabel = `Recipient: ${order.name}\nContact: ${order.phone}\nAddress:\n${order.address}\nCountry: ${order.country || 'India'}\nOrder: #${order.id}\nTotal: ₹${order.total} (${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid UPI'})`

                  return (
                    <div
                      key={order.id}
                      className="rounded-3xl border border-[#262626] bg-[#121212] p-6 sm:p-8 space-y-6 hover:border-[#C9A84C]/40 transition-all shadow-card"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#262626]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-mono text-sm font-bold text-[#C9A84C]">
                              Order #{order.id}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(order.id, 'Order ID Copied')}
                              className="text-[10px] text-[#78716C] hover:text-[#C9A84C] transition-colors"
                              title="Copy Order ID"
                            >
                              📋 Copy
                            </button>
                            <span
                              className={`rounded-full px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${order.paymentMethod === 'cod'
                                  ? 'border-amber-700/50 bg-amber-950/30 text-amber-300'
                                  : 'border-emerald-700/50 bg-emerald-950/30 text-emerald-300'
                                }`}
                            >
                              {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod}
                            </span>
                          </div>
                          <p className="text-xs text-[#78716C]">Placed on: {order.created}</p>
                        </div>

                        {/* Status & Fulfillment Toggle */}
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${isDispatched
                                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                                : 'border-amber-500/40 bg-amber-950/40 text-amber-300 animate-pulse'
                              }`}
                          >
                            {isDispatched ? '✓ Dispatched' : '⏳ Awaiting Dispatch'}
                          </span>

                          <button
                            type="button"
                            disabled={dispatchingId === order.id}
                            onClick={() => handleUpdateStatus(order.id, isDispatched ? 'pending' : 'dispatched')}
                            className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 ${isDispatched
                                ? 'border border-[#262626] bg-[#161616] text-[#A8A29E] hover:text-[#F5F2EB]'
                                : 'btn-gold !py-2 !px-4'
                              }`}
                          >
                            {dispatchingId === order.id
                              ? 'Updating…'
                              : isDispatched
                                ? 'Revert to Pending'
                                : 'Mark as Dispatched 🚚'}
                          </button>
                        </div>
                      </div>

                      {/* Customer Details & Shipping Section */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#161616] border border-[#262626] rounded-2xl p-5 sm:p-6">
                        {/* Recipient Contact (5 cols) */}
                        <div className="md:col-span-5 space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                            Customer &amp; Contact
                          </p>
                          <div>
                            <p className="font-serif text-lg font-semibold text-[#F5F2EB]">{order.name}</p>
                            <a
                              href={`mailto:${order.email}`}
                              className="text-xs text-[#A8A29E] hover:text-[#C9A84C] transition-colors block mt-0.5"
                            >
                              ✉️ {order.email}
                            </a>
                            <p className="text-xs text-[#F5F2EB] font-semibold mt-1">
                              📞 {order.phone || 'No phone provided'}
                            </p>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="flex items-center gap-2 pt-2">
                            {cleanPhone && (
                              <a
                                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                                  `Hi ${order.name}, this is ORYN Parfums regarding your order #${order.id}.`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-800/60 bg-emerald-950/30 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-900/40 transition-colors"
                              >
                                <span>💬</span> WhatsApp
                              </a>
                            )}
                            {order.phone && (
                              <a
                                href={`tel:${order.phone}`}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#262626] bg-[#121212] px-3 py-1.5 text-[11px] font-semibold text-[#A8A29E] hover:text-[#F5F2EB] transition-colors"
                              >
                                <span>📞</span> Call
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => copyToClipboard(courierLabel, 'Courier Label Copied')}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#262626] bg-[#121212] px-3 py-1.5 text-[11px] font-semibold text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
                            >
                              <span>📋</span> Copy Label
                            </button>
                          </div>
                        </div>

                        {/* Delivery Address (4 cols) */}
                        <div className="md:col-span-4 space-y-2 border-t md:border-t-0 md:border-l border-[#262626] pt-4 md:pt-0 md:pl-6">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                            Shipping Destination
                          </p>
                          <p className="text-xs text-[#F5F2EB] font-medium whitespace-pre-wrap leading-relaxed">
                            {order.address}
                          </p>
                          <p className="text-[11px] text-[#A8A29E] font-semibold mt-1">
                            🇮🇳 {order.country || 'India'}
                          </p>
                        </div>

                        {/* Payment & Total (3 cols) */}
                        <div className="md:col-span-3 space-y-2 border-t md:border-t-0 md:border-l border-[#262626] pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                              Payment Method
                            </p>
                            <p className="text-xs text-[#F5F2EB] font-semibold mt-1">
                              {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-[#262626]">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">Payable Total</p>
                            <p className="font-serif text-2xl font-bold text-[#F5F2EB]">
                              ₹{order.total}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Items Ordered */}
                      <div className="space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
                          Allocated Items ({(order.items || []).length})
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {(order.items || []).map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 rounded-xl border border-[#262626] bg-[#161616] p-3 shadow-xs"
                            >
                              <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg bg-[#121212] p-1 border border-[#262626]">
                                {item.image ? (
                                  <Image src={item.image} alt={item.name} fill sizes="40px" className="object-contain" />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-xs text-[#C9A84C]">⚜️</div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-[#F5F2EB] truncate">{item.name}</p>
                                <p className="text-[11px] text-[#78716C]">
                                  Qty: <strong className="text-[#F5F2EB]">{item.quantity}</strong> × ₹{item.price}
                                </p>
                              </div>
                              <p className="text-xs font-bold text-[#C9A84C]">₹{item.price * item.quantity}</p>
                            </div>
                          ))}

                          {(order.freebies || []).map((gift, gIdx) => (
                            <div
                              key={`gift-${gIdx}`}
                              className="flex items-center gap-3 rounded-xl border border-[#C9A84C]/30 bg-[#14120e] p-3 shadow-xs"
                            >
                              <span className="text-xl text-[#C9A84C]">🎁</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-[#F5F2EB] truncate">{gift.name}</p>
                                <p className="text-[10px] text-[#C9A84C] uppercase tracking-wider font-bold">Complimentary Gift</p>
                              </div>
                              <span className="text-xs font-bold text-[#C9A84C]">Free</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Leads & Contact Messages */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <h2 className="font-serif text-xl font-semibold text-[#F5F2EB]">Customer Inquiries &amp; Newsletter Signups</h2>
              <span className="text-xs text-[#78716C]">{leads.length} total submissions</span>
            </div>

            {leads.length === 0 ? (
              <div className="rounded-3xl border border-[#262626] bg-[#121212] p-16 text-center space-y-3">
                <span className="text-3xl text-[#C9A84C]">✉️</span>
                <p className="font-serif text-xl text-[#F5F2EB]">No customer inquiries recorded yet</p>
                <p className="text-xs text-[#78716C]">Submissions from your contact page and newsletter form will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="rounded-2xl border border-[#262626] bg-[#121212] p-5 space-y-3 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-serif text-base font-semibold text-[#F5F2EB]">{lead.name}</p>
                        <a href={`mailto:${lead.email}`} className="text-xs text-[#A8A29E] hover:text-[#C9A84C] block mt-0.5">
                          ✉️ {lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="text-xs text-[#F5F2EB] font-medium block mt-0.5">
                            📞 {lead.phone}
                          </a>
                        )}
                      </div>
                      <span className="text-[10px] text-[#78716C] font-mono">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}
                      </span>
                    </div>

                    <div className="border-t border-[#262626] pt-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Inquiry / Note</p>
                      <p className="text-xs text-[#A8A29E] bg-[#161616] border border-[#262626] rounded-xl p-3 leading-relaxed whitespace-pre-wrap">
                        {lead.message || 'Newsletter 10% welcome privilege requested'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Credentials & Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-xl mx-auto rounded-3xl border border-[#262626] bg-[#121212] p-8 space-y-6 shadow-card">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">Security &amp; Access</p>
              <h2 className="font-serif text-2xl font-semibold text-[#F5F2EB] mt-1">Change Seller Credentials</h2>
              <p className="text-xs text-[#78716C] mt-1">
                Update the login username and password used to access this admin panel.
              </p>
            </div>

            <form onSubmit={handleUpdateCredentials} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => { setCurrentPassword(e.target.value); setSettingsError(''); setSettingsSuccess('') }}
                  className="w-full rounded-xl border border-[#262626] bg-[#0A0A0A] px-4 py-3 text-xs text-[#F5F2EB] outline-none focus:border-[#C9A84C]"
                  placeholder="Enter your current password"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-2">
                  New Admin Username
                </label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => { setNewUsername(e.target.value); setSettingsError(''); setSettingsSuccess('') }}
                  className="w-full rounded-xl border border-[#262626] bg-[#0A0A0A] px-4 py-3 text-xs text-[#F5F2EB] outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-2">
                  New Password (min 6 chars)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setSettingsError(''); setSettingsSuccess('') }}
                  className="w-full rounded-xl border border-[#262626] bg-[#0A0A0A] px-4 py-3 text-xs text-[#F5F2EB] outline-none focus:border-[#C9A84C]"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setSettingsError(''); setSettingsSuccess('') }}
                  className="w-full rounded-xl border border-[#262626] bg-[#0A0A0A] px-4 py-3 text-xs text-[#F5F2EB] outline-none focus:border-[#C9A84C]"
                  placeholder="••••••••"
                />
              </div>

              {settingsError && (
                <div className="rounded-xl border border-red-900/60 bg-red-950/40 p-3 text-xs text-red-300 text-center">
                  ⚠️ {settingsError}
                </div>
              )}

              {settingsSuccess && (
                <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/40 p-3 text-xs text-emerald-300 text-center">
                  ✓ {settingsSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="btn-gold w-full !py-3.5 text-center mt-2 disabled:opacity-50"
              >
                {isSaving ? 'Saving…' : 'Update Credentials'}
              </button>
            </form>
          </div>
        )}

      </div>
    </main>
  )
}
