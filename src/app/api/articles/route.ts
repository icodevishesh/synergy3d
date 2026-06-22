import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Article from '@/models/Article';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const excludeSlug = searchParams.get('excludeSlug');
    const select = searchParams.get('select');
    
    let query = Article.find({ published: true });
    
    if (excludeSlug) {
      query = query.find({ slug: { $ne: excludeSlug } });
    }
    
    if (select) {
      const selectFields = select.split(',').join(' ');
      query = query.select(selectFields);
    }
    
    query = query.sort({ createdAt: -1 });
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const articles = await query;
    
    return NextResponse.json(articles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
