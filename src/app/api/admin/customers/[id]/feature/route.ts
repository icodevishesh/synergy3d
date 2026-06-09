import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import CustomerStory from '@/models/CustomerStory';

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
    const story = await CustomerStory.findById(id);
    if (!story) {
      return NextResponse.json({ error: 'Customer story not found' }, { status: 404 });
    }

    if (!story.featuredOnHomepage) {
      const count = await CustomerStory.countDocuments({ featuredOnHomepage: true });
      if (count >= 3) {
        return NextResponse.json(
          { error: 'Max 3 featured stories allowed. Deselect another story first.' },
          { status: 400 }
        );
      }
    }

    story.featuredOnHomepage = !story.featuredOnHomepage;
    await story.save();

    return NextResponse.json(story);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
