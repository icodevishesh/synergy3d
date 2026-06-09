import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import Education from '@/models/Education';

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
    const item = await Education.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Education resource not found' }, { status: 404 });
    }

    item.published = !item.published;
    await item.save();

    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
