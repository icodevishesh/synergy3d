import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Article from '@/models/Article';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const articles = await Article.find({ published: true }).sort({ createdAt: -1 });
    
    return NextResponse.json(articles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
