import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import PartnerTestimonial from '@/models/PartnerTestimonial';

export async function GET() {
  try {
    await connectToDatabase();
    
    let testimonials = await PartnerTestimonial.find({ published: true }).sort({ createdAt: -1 });
    
    const mapped = testimonials.map(t => ({
      id: t._id.toString(),
      quote: t.quote,
      name: t.name,
      practice: t.practice,
      location: t.practice,
      tag: t.tag || '',
      tagColor: `bg-${t.tagColor}-50 text-${t.tagColor}-600`,
      rawTagColor: t.tagColor || 'blue',
      practiceType: t.category,
      emoji: t.emoji || '👨‍⚕️',
    }));
    
    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
