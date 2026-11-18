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
      country: body.country || 'India',
      paymentMethod: body.paymentMethod || 'upi',
      total: body.total || 0,
      items: body.items || [],
      freebies: body.freebies || [],
      created: new Date().toLocaleString(),
      status: 'pending'
    });

    await newOrder.save();

    const orderResponse = {
      ...newOrder.toObject(),
      id: newOrder._id.toString()
    };

    return NextResponse.json({ 
      success: true,
      order: orderResponse,
      orderId: newOrder._id.toString()
    })
  } catch (error: any) {
    console.error("Error creating order:", error);
    const isConnError =
      error?.name === 'MongooseServerSelectionError' ||
      error?.message?.includes('ECONNREFUSED') ||
      error?.message?.includes('ENOTFOUND') ||
      error?.message?.includes('querySrv');
    const msg = isConnError
      ? 'Database connection failed: your MongoDB Atlas cluster appears unreachable or paused. Please resume it in MongoDB Atlas or update MONGODB_URI in .env.local.'
      : (error?.message || 'Failed to create order');
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
