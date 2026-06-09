import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import CustomerStory from '@/models/CustomerStory';

export async function GET() {
  try {
    await connectToDatabase();
    const items = await CustomerStory.find({ published: true, featuredOnHomepage: true }).limit(3).sort({ createdAt: -1 });
    
    const mapped = items.map((c, idx) => {
      // Split location/practice details to role1 and role2 for the homepage design
      const parts = c.location.split(' · ');
      const role1 = parts[0] || c.location;
      const role2 = parts[1] || '';

      return {
        id: c._id.toString(),
        videoId: c.youtubeId || 'dQw4w9WgXcQ',
        name: c.customerName,
        role1,
        role2,
        quote: c.description,
        result: c.tag || '',
        resultType: c.tagColor === 'emerald' || c.tagColor === 'green' || c.tagColor === 'blue' ? 'down' : 'check',
        duration: idx === 0 ? '1:24' : idx === 1 ? '2:08' : '1:52',
        imgPath: idx === 0 ? '/images/stats-turnaround.png' : idx === 1 ? '/images/stats-accuracy.png' : '/images/stats-remake.png',
      };
    });

    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
