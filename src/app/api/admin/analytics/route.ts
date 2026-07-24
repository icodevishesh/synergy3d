import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/db';
import ArticleLead from '@/models/ArticleLead';
import TalkUnlock from '@/models/TalkUnlock';
import WebinarRegistration from '@/models/WebinarRegistration';
import Webinar from '@/models/Webinar';
import Callback from '@/models/Callback';

async function isAuthorized() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    // Fetch all datasets
    const articleLeads = await ArticleLead.find({}).sort({ submittedAt: -1 }).lean();
    const talkUnlocks = await TalkUnlock.find({}).sort({ unlockedAt: -1 }).lean();
    
    // Ensure Webinar model is registered before populating
    const webinarRegistrations = await WebinarRegistration.find({})
      .populate({ path: 'webinarId', model: Webinar })
      .sort({ registeredAt: -1 })
      .lean();

    // Map datasets to a unified format
    const mappedArticleLeads = articleLeads.map((item: any) => ({
      id: item._id.toString(),
      type: 'Article Lead',
      name: item.fullName,
      email: item.email,
      practice: item.practiceName,
      contact: item.contact,
      date: item.submittedAt,
      source: item.articleTitle || `Article: ${item.articleSlug}`,
    }));

    const mappedTalkUnlocks = talkUnlocks.map((item: any) => ({
      id: item._id.toString(),
      type: 'Talk Unlock',
      name: item.name,
      email: item.email,
      practice: item.practice,
      contact: '-',
      date: item.unlockedAt,
      source: 'SynergyTalks Portal',
    }));

    const mappedWebinarRegistrations = webinarRegistrations.map((item: any) => ({
      id: item._id.toString(),
      type: 'Webinar Registration',
      name: item.name,
      email: item.email,
      practice: '-',
      contact: item.whatsAppNumber || '-',
      date: item.registeredAt,
      source: item.webinarId?.title || 'Webinar',
    }));

    // Merge and sort all by date descending
    const allSubmissions = [
      ...mappedArticleLeads,
      ...mappedTalkUnlocks,
      ...mappedWebinarRegistrations,
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      articleLeads: mappedArticleLeads,
      talkUnlocks: mappedTalkUnlocks,
      webinarRegistrations: mappedWebinarRegistrations,
      allSubmissions,
    });
  } catch (error: any) {
    console.error('Error fetching analytics details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { items } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided for deletion' }, { status: 400 });
    }

    await connectToDatabase();

    const grouped: Record<string, string[]> = {};
    for (const item of items) {
      if (!item?.id || !item?.type) continue;
      if (!grouped[item.type]) {
        grouped[item.type] = [];
      }
      grouped[item.type].push(item.id);
    }

    const deletePromises: Promise<any>[] = [];

    if (grouped['Article Lead']?.length) {
      deletePromises.push(ArticleLead.deleteMany({ _id: { $in: grouped['Article Lead'] } }));
    }
    if (grouped['Talk Unlock']?.length) {
      deletePromises.push(TalkUnlock.deleteMany({ _id: { $in: grouped['Talk Unlock'] } }));
    }
    if (grouped['Webinar Registration']?.length) {
      deletePromises.push(WebinarRegistration.deleteMany({ _id: { $in: grouped['Webinar Registration'] } }));
    }
    if (grouped['Contact Request']?.length) {
      deletePromises.push(Callback.deleteMany({ _id: { $in: grouped['Contact Request'] } }));
    }

    await Promise.all(deletePromises);

    return NextResponse.json({ success: true, deletedCount: items.length });
  } catch (error: any) {
    console.error('Error deleting analytics records:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete records' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
