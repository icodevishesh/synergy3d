import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import FeaturedEpisode from '@/models/FeaturedEpisode';
import Talk from '@/models/Talk';

export async function GET() {
  try {
    await connectToDatabase();

    // Try the dedicated featured doc first
    let featured = await FeaturedEpisode.findOne().sort({ updatedAt: -1 });

    // Fallback: use the highest episode number
    if (!featured) {
      const latest = await Talk.findOne({ published: true }).sort({ episodeNumber: -1 });
      if (!latest) return NextResponse.json(null);
      return NextResponse.json({
        youtubeId:     latest.youtubeId,
        episodeNumber: latest.episodeNumber,
        title:         latest.title,
        guest:         latest.guest,
        duration:      latest.duration,
      });
    }

    return NextResponse.json({
      youtubeId:     featured.youtubeId,
      episodeNumber: featured.episodeNumber,
      title:         featured.title,
      guest:         featured.guest,
      duration:      featured.duration,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
