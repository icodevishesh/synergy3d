import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import Partner from '@/models/Partner';

async function isAuthorized() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET() {
  try {
    await connectToDatabase();
    let partners = await Partner.find({}).sort({ order: 1 });
    
    // Seed if empty
    if (partners.length === 0) {
      const defaultPartners = [
        { name: 'iTero', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60', websiteUrl: 'https://www.itero.com', order: 0 },
        { name: '3Shape', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60', websiteUrl: 'https://www.3shape.com', order: 1 },
        { name: 'Medit', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60', websiteUrl: 'https://www.medit.com', order: 2 },
        { name: 'CS Dental', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60', websiteUrl: 'https://www.carestreamdental.com', order: 3 },
      ];
      await Partner.insertMany(defaultPartners);
      partners = await Partner.find({}).sort({ order: 1 });
    }

    return NextResponse.json(partners);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    await connectToDatabase();
    
    const newPartner = await Partner.create(body);
    return NextResponse.json(newPartner, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
