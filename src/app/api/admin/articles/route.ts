import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import Article from '@/models/Article';

async function isAuthorized() {
  const session = await getServerSession(authOptions);
  return !!session;
}

function convertToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const items = await Article.find({}).sort({ createdAt: -1 });
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

    // Auto generate slug from title
    const slug = convertToSlug(body.title);
    
    // Check if slug already exists
    const existing = await Article.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: 'An article with a similar title already exists.' }, { status: 400 });
    }

    const newItem = await Article.create({
      ...body,
      slug,
      views: 0
    });
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
