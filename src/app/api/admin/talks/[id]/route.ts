import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import Talk from '@/models/Talk';

async function isAuthorized() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    await connectToDatabase();
    
    if (body.episodeNumber !== undefined) {
      const existing = await Talk.findOne({
        episodeNumber: body.episodeNumber,
        _id: { $ne: id },
      });
      if (existing) {
        return NextResponse.json({ error: 'Episode number already in use' }, { status: 400 });
      }
    }

    const updatedTalk = await Talk.findByIdAndUpdate(id, body, { new: true });
    if (!updatedTalk) {
      return NextResponse.json({ error: 'Talk not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTalk);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const deletedTalk = await Talk.findByIdAndDelete(id);
    if (!deletedTalk) {
      return NextResponse.json({ error: 'Talk not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Talk deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
