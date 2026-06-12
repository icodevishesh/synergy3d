import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import CustomerStory from '@/models/CustomerStory';

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
    const items = await CustomerStory.find({
      youtubeId: { $ne: '', $exists: true }
    }).sort({ createdAt: -1 });
    return NextResponse.json(items);
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

    if (body.featuredOnHomepage) {
      const count = await CustomerStory.countDocuments({ featuredOnHomepage: true });
      if (count >= 3) {
        return NextResponse.json(
          { error: 'Max 3 featured stories allowed. Deselect another story first.' },
          { status: 400 }
        );
      }
    }
    
    const newItem = await CustomerStory.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
