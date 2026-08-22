import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import { sendOrderDispatchedEmail } from '@/lib/email';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    if (body.status !== 'dispatched') {
      return NextResponse.json({ error: 'Invalid status update' }, { status: 400 });
    }

    await connectToDatabase();
    
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: 'dispatched' },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Send the email notification
    await sendOrderDispatchedEmail(updatedOrder.email, updatedOrder._id.toString(), updatedOrder.name);

    return NextResponse.json({ 
      success: true, 
      order: {
        ...updatedOrder.toObject(),
        id: updatedOrder._id.toString()
      }
    });

  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
