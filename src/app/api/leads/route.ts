import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function GET() {
  try {
    await connectToDatabase();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    
    const mappedLeads = leads.map(lead => {
      const obj = lead.toObject();
      return {
        ...obj,
        id: obj._id.toString()
      };
    });

    return NextResponse.json({ leads: mappedLeads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    const newLead = new Lead({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      message: body.message || ''
    });

    await newLead.save();

    return NextResponse.json({ 
      success: true, 
      lead: {
        ...newLead.toObject(),
        id: newLead._id.toString()
      }
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
