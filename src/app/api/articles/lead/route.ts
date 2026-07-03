import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import ArticleLead from '@/models/ArticleLead';

export async function POST(req: Request) {
  try {
    const { fullName, practiceName, email, contact, articleSlug, articleTitle } = await req.json();

    if (!fullName || !practiceName || !email || !contact || !articleSlug || !articleTitle) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectToDatabase();

    const newLead = await ArticleLead.create({
      fullName,
      practiceName,
      email: email.toLowerCase(),
      contact,
      articleSlug,
      articleTitle,
    });

    return NextResponse.json({ success: true, leadId: newLead._id });
  } catch (error: any) {
    console.error('Error creating article lead:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
