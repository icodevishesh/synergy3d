import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import Talk from '@/models/Talk';

async function isAuthorized() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const talk = await Talk.findById(id);
    if (!talk) {
      return NextResponse.json({ error: 'Talk not found' }, { status: 404 });
    }

    talk.published = !talk.published;
    await talk.save();

    return NextResponse.json(talk);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
