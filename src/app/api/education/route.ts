import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Education from '@/models/Education';



export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get('sort');

    let query = Education.find({ published: true });
    
    if (sort === 'latest') {
      query = query.sort({ createdAt: -1 });
    } else {
      query = query.sort({ createdAt: 1 });
    }

    let items = await query;

    // Seed if empty
    if (items.length === 0) {
      let newQuery = Education.find({ published: true });
      if (sort === 'latest') {
        newQuery = newQuery.sort({ createdAt: -1 });
      } else {
        newQuery = newQuery.sort({ createdAt: 1 });
      }
      items = await newQuery;
    }

    // Helper map to assign emoji and levels
    const getMeta = (cat: string) => {
      switch (cat) {
        case 'scanning':
          return { emoji: '📷', level: 'Intermediate', views: '2.5k' };
        case 'materials':
          return { emoji: '🦷', level: 'Intermediate', views: '1.8k' };
        case 'implants':
          return { emoji: '🔬', level: 'Advanced', views: '1.4k' };
        case 'workflow':
          default:
          return { emoji: '📋', level: 'Beginner', views: '3.1k' };
      }
    };

    const mapped = items.map((item, idx) => {
      const meta = getMeta(item.category);
      return {
        id: item._id.toString(),
        topic: item.category,
        topicLabel: item.category.charAt(0).toUpperCase() + item.category.slice(1),
        title: item.title,
        desc: item.description,
        duration: item.duration,
        level: meta.level,
        views: meta.views,
        emoji: meta.emoji,
        // Make the first item featured dynamically
        featured: idx === 0 && sort !== 'latest',
        youtubeId: item.youtubeId,
        createdAt: item.createdAt,
      };
    });

    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
