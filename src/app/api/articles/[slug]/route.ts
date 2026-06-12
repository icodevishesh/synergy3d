import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Article from '@/models/Article';

export async function GET(req: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;

  try {
    await connectToDatabase();
    
    // Find the article by slug (either published or not, depending on preview, but usually published is fine for public)
    const article = await Article.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }, // increment views count on every load
      { new: true }
    );

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
