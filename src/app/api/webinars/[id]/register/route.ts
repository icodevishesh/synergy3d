import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Webinar from '@/models/Webinar';
import WebinarRegistration from '@/models/WebinarRegistration';
import WebinarSettings from '@/models/WebinarBanner';

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  try {
    const { name, email, whatsAppNumber } = await req.json();

    if (!name || !email || !whatsAppNumber) {
      return NextResponse.json({ error: 'Name, email, and WhatsApp number are required' }, { status: 400 });
    }

    await connectToDatabase();

    const webinar = await Webinar.findById(id);
    if (!webinar) {
      const settings = await WebinarSettings.findById(id);
      if (settings) {
        await WebinarRegistration.create({
          webinarId: id,
          name,
          email,
          whatsAppNumber,
        });
        settings.totalRegistrations = (settings.totalRegistrations || 0) + 1;
        await settings.save();
        return NextResponse.json({ success: true, registeredCount: settings.totalRegistrations });
      }
      return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
    }

    // Save registration
    await WebinarRegistration.create({
      webinarId: id,
      name,
      email,
      whatsAppNumber,
    });

    // Increment count on webinar
    webinar.registeredCount = (webinar.registeredCount || 0) + 1;
    await webinar.save();

    // Increment count in settings
    let settings = await WebinarSettings.findOne();
    if (!settings) {
      settings = await WebinarSettings.create({
        bannerTitle: 'Digital Denture Masterclass',
        bannerSubtitle: 'An in-depth, live, interactive session on the complete digital denture workflow — from IOS scan to try-in to final delivery — with live Q&A with our removable prosthetics team.',
        date: 'June 10, 2026',
        time: '7:00 PM EST',
        name: 'Erik Morales, VP of Removable Prosthetics',
        totalRegistrations: 127
      });
    }
    settings.totalRegistrations = (settings.totalRegistrations || 0) + 1;
    await settings.save();

    return NextResponse.json({ success: true, registeredCount: webinar.registeredCount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
