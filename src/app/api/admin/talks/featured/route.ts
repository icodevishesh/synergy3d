import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import FeaturedEpisode from '@/models/FeaturedEpisode';

// GET current featured episode
export async function GET() {
  try {
    await connectToDatabase();
    const featured = await FeaturedEpisode.findOne().sort({ updatedAt: -1 });
    return NextResponse.json(featured ?? null);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST / PUT — set a new featured episode
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { youtubeId, episodeNumber, title, guest, duration } = body;

    if (!youtubeId || !title) {
      return NextResponse.json({ error: 'youtubeId and title are required' }, { status: 400 });
    }

    // Replace any existing featured episode (only ever one)
    await FeaturedEpisode.deleteMany({});
    const doc = await FeaturedEpisode.create({ youtubeId, episodeNumber, title, guest, duration });

    return NextResponse.json(doc, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
