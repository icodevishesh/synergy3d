import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import PartnerTestimonial from '@/models/PartnerTestimonial';

async function isAuthorized() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const testimonials = await PartnerTestimonial.find({}).sort({ createdAt: -1 });
    return NextResponse.json(testimonials);
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
    
    const newTestimonial = await PartnerTestimonial.create(body);
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
