import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import TalkUnlock from '@/models/TalkUnlock';

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
    const unlocks = await TalkUnlock.find({}).sort({ unlockedAt: -1 });
    return NextResponse.json(unlocks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
