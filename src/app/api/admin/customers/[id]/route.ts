import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import CustomerStory from '@/models/CustomerStory';

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
    
    if (body.featuredOnHomepage) {
      const count = await CustomerStory.countDocuments({
        featuredOnHomepage: true,
        _id: { $ne: id },
      });
      if (count >= 3) {
        return NextResponse.json(
          { error: 'Max 3 featured stories allowed. Deselect another story first.' },
          { status: 400 }
        );
      }
    }

    const updated = await CustomerStory.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Customer story not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
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
    const deleted = await CustomerStory.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Customer story not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Customer story deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
