import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Talk from '@/models/Talk';
import { EPISODES } from '@/data/episodes';

export async function GET() {
  try {
    await connectToDatabase();
    
    let talks = await Talk.find({ published: true }).sort({ episodeNumber: -1 });
    
    // Seed if empty
    if (talks.length === 0) {
      const seeded = EPISODES.map(ep => {
        const episodeNum = parseInt(ep.ep.replace(/[^0-9]/g, ''), 10) || 1;
        return {
          youtubeId: ep.videoId,
          episodeNumber: episodeNum,
          title: ep.title,
          description: ep.desc,
          guest: ep.guest,
          category: ep.cat,
          docName: '',
          duration: ep.duration,
          published: true,
        };
      });
      await Talk.insertMany(seeded);
      talks = await Talk.find({ published: true }).sort({ episodeNumber: -1 });
    }
    
    const mapped = talks.map(t => ({
      id: t._id.toString(),
      ep: `Ep. ${t.episodeNumber}`,
      episodeNumber: t.episodeNumber,
      cat: t.category,
      catLabel: t.category.charAt(0).toUpperCase() + t.category.slice(1),
      title: t.title,
      guest: t.guest,
      desc: t.description,
      duration: t.duration,
      videoId: t.youtubeId,
      docName: t.docName || '',
      locked: false, // all dynamic episodes default to unlocked or custom logic
    }));
    
    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
