import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import PartnerTestimonial from '@/models/PartnerTestimonial';

export async function GET() {
  try {
    await connectToDatabase();
    
    let testimonials = await PartnerTestimonial.find({ published: true }).sort({ createdAt: -1 });
    
    // Seed if empty
    if (testimonials.length === 0) {
      const defaultTestimonials = [
        {
          name: 'Dr. Priya Patel',
          practice: 'Apex Dental Group',
          quote: 'The turnaround time is outstanding. Getting precision restorations back in 5 days is a game-changer for our group practice workflow.',
          tag: '5-Day Turnaround',
          tagColor: 'emerald',
          emoji: '👩‍⚕️',
          category: 'group',
          published: true,
        },
        {
          name: 'Dr. Elena Rostova',
          practice: 'Smile Art Studio',
          quote: 'Since switching to Synergy 3D, our adjustment rates have dropped to near zero. Extremely accurate fit and outstanding craftsmanship.',
          tag: '↑ 95% Fit Accuracy',
          tagColor: 'blue',
          emoji: '👩‍⚕️',
          category: 'private',
          published: true,
        },
        {
          name: 'Dr. Sarah Jenkins',
          practice: 'Elite Prosthodontics',
          quote: 'Their customer support is unmatched. Whenever I need to discuss a complex full-mouth restoration, their senior technicians are immediately available.',
          tag: 'Outstanding Support',
          tagColor: 'violet',
          emoji: '👩‍💼',
          category: 'private',
          published: true,
        },
        {
          name: 'Dr. Marcus Vance',
          practice: 'Metropolitan DSO',
          quote: 'Implementing Synergy 3D across all our 12 regional locations has standardized our high quality and boosted clinical efficiency significantly.',
          tag: 'Clinical Standardization',
          tagColor: 'amber',
          emoji: '👨‍⚕️',
          category: 'dso',
          published: true,
        }
      ];
      await PartnerTestimonial.insertMany(defaultTestimonials);
      testimonials = await PartnerTestimonial.find({ published: true }).sort({ createdAt: -1 });
    }
    
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
