import { NextRequest, NextResponse } from 'next/server'

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

const orders: Order[] = []

export async function GET() {
  return NextResponse.json({ orders })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const order: Order = {
    id: `${Date.now()}`,
    name: body.name || 'Guest',
    email: body.email || 'customer@oryn.com',
    phone: body.phone || '',
    address: body.address || '',
    country: body.country || '',
    paymentMethod: body.paymentMethod || 'cod',
    total: body.total || 0,
    items: body.items || [],
    created: new Date().toLocaleString(),
  }
  orders.unshift(order)
  return NextResponse.json({ order })
}
