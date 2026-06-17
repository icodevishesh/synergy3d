import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import CustomerStory from '@/models/CustomerStory';

export async function GET() {
  try {
    await connectToDatabase();
    
    const items = await CustomerStory.find({
      published: true,
      youtubeId: { $ne: '', $exists: true }
    }).sort({ createdAt: -1 });

    const mapped = items.map(c => {
      // Determine emoji based on category
      let emoji = '👨‍⚕️';
      if (c.customerName.toLowerCase().includes('elena') || c.customerName.toLowerCase().includes('priya') || c.customerName.toLowerCase().includes('sarah')) {
        emoji = '👩‍⚕️';
      } else if (c.customerName.toLowerCase().includes('jessica')) {
        emoji = '👩‍💼';
      }

      return {
        id: c._id.toString(),
        quote: c.description,
        name: c.customerName,
        title: c.title,
        practice: c.location,
        location: c.location,
        tag: c.tag || '',
        tagColor: `bg-${c.tagColor}-50 text-${c.tagColor}-600`,
        rawTagColor: c.tagColor,
        stars: c.rating || 5,
        practiceType: c.category,
        youtubeId: c.youtubeId || '',
        emoji,
        featuredOnHomepage: c.featuredOnHomepage,
      };
    });

    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, designation, testimonial, location, stars, practiceType } = body;
    
    if (!name || !testimonial || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const newStory = await CustomerStory.create({
      customerName: name,
      title: designation || 'Dentist',
      description: testimonial,
      location: location,
      rating: Number(stars) || 5,
      category: practiceType || 'private',
      published: true,
      featuredOnHomepage: false,
      tag: '',
      tagColor: 'blue',
      youtubeId: '',
    });
    
    return NextResponse.json({ success: true, data: newStory });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

