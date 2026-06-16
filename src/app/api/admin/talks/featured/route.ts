import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import FeaturedEpisode from '@/models/FeaturedEpisode';

async function isAuthorized() {
  const session = await getServerSession(authOptions);
  return !!session;
}

// GET current featured episode
export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

// DELETE — reset featured episode (falls back to default latest)
export async function DELETE() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    await FeaturedEpisode.deleteMany({});
    return NextResponse.json({ message: 'Featured episode reset successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

