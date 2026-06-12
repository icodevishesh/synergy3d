import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import TalkUnlock from '@/models/TalkUnlock';

// GET /api/talks/unlock?email=xxx — check if email is already unlocked
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email')?.toLowerCase().trim();
  if (!email) return NextResponse.json({ unlocked: false });

  try {
    await connectToDatabase();
    const existing = await TalkUnlock.findOne({ email });
    return NextResponse.json({ unlocked: !!existing });
  } catch {
    return NextResponse.json({ unlocked: false });
  }
}

// POST /api/talks/unlock — save user details (idempotent by email)
export async function POST(req: Request) {
  try {
    const { name, email, practice } = await req.json();
    if (!name || !email || !practice) {
      return NextResponse.json({ error: 'Name, email, and practice name are required' }, { status: 400 });
    }

    await connectToDatabase();

    // Upsert — don't duplicate if email already registered
    await TalkUnlock.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { name, practice, unlockedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
