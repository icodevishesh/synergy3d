import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import WebinarSettings from '@/models/WebinarBanner';

async function isAuthorized() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET() {
  try {
    await connectToDatabase();
    // Upsert banner settings — only write defaults when no doc exists
    const settings = await WebinarSettings.findOneAndUpdate(
      {},
      {
        $setOnInsert: {
          bannerTitle: 'Digital Denture Masterclass',
          bannerSubtitle: 'An in-depth, live, interactive session on the complete digital denture workflow — from IOS scan to try-in to final delivery — with live Q&A with our removable prosthetics team.',
          date: 'June 10, 2026',
          time: '7:00 PM EST',
          duration: 60,
          name: 'Erik Morales, VP of Removable Prosthetics',
          totalRegistrations: 127,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    await connectToDatabase();
    
    let settings = await WebinarSettings.findOne();
    if (!settings) {
      settings = await WebinarSettings.create(body);
    } else {
      settings = await WebinarSettings.findByIdAndUpdate(settings._id, body, { new: true });
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
