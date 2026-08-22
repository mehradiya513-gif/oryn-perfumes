import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Order from '@/models/Order'

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    
    // Map _id to id for frontend compatibility
    const mappedOrders = orders.map(order => {
      const obj = order.toObject();
      return {
        ...obj,
        id: obj._id.toString()
      };
    });

    return NextResponse.json({ orders: mappedOrders })
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await connectToDatabase();
    
    const newOrder = new Order({
      name: body.name || 'Guest',
      email: body.email || 'customer@oryn.com',
      phone: body.phone || '',
      address: body.address || '',
      country: body.country || '',
      paymentMethod: body.paymentMethod || 'cod',
      total: body.total || 0,
      items: body.items || [],
      created: new Date().toLocaleString(),
      status: 'pending'
    });

    await newOrder.save();

    const orderResponse = {
      ...newOrder.toObject(),
      id: newOrder._id.toString()
    };

    return NextResponse.json({ order: orderResponse })
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
