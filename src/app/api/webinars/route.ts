import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Webinar from '@/models/Webinar';
import WebinarSettings from '@/models/WebinarBanner';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    let query: any = { published: true };
    if (category) {
      query.category = category;
    }

    let items = await Webinar.find(query).sort({ date: -1 });

    // Check if schema is outdated (e.g. documents have no name field) and needs reset
    // Upsert banner settings — only write defaults for fields that are missing
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

    const mapped = items.map((w, idx) => {
      // Extract video ID from youtubeUrl for modal popup if it's a recorded session
      let videoId = 'dQw4w9WgXcQ';
      try {
        if (w.youtubeUrl) {
          const urlObj = new URL(w.youtubeUrl);
          if (urlObj.hostname.includes('youtube.com')) {
            videoId = urlObj.searchParams.get('v') || videoId;
          } else if (urlObj.hostname.includes('youtu.be')) {
            videoId = urlObj.pathname.substring(1) || videoId;
          }
        }
      } catch (e) {
        // Fallback
      }

      return {
        id: w._id.toString(),
        status: w.category,
        title: w.title,
        desc: w.description,
        duration: `${w.duration} minutes`,
        // Format stored YYYY-MM-DD date to a readable display string
        date: (() => {
          if (!w.date) return '';
          const parsed = new Date(w.date);
          if (!isNaN(parsed.getTime())) {
            return parsed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          }
          return w.date; // fallback for legacy string-format dates
        })(),
        rawDate: w.date,
        rawTime: '',
        host: w.name,
        hostRole: '',
        hostEmoji: '🔬',
        hostImage: '',
        views: w.category === 'recorded' ? `${100 + idx * 75}` : undefined,
        registered: w.registeredCount || 0,
        youtubeUrl: w.youtubeUrl,
        videoId,
        featured: w.category === 'upcoming' && idx === 0,
      };
    });

    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
