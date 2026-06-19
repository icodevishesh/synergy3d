import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Webinar from '@/models/Webinar';
import WebinarRegistration from '@/models/WebinarRegistration';
import WebinarSettings from '@/models/WebinarBanner';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendRegistrationEmail({
  name,
  email,
  whatsAppNumber,
  webinarTitle,
}: {
  name: string;
  email: string;
  whatsAppNumber: string;
  webinarTitle: string;
}) {
  try {
    const sender = process.env.EMAIL_FROM || "noreply@synergy3d.net";
    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0a1045 0%, #1344c4 100%); padding: 30px 24px; text-align: center; color: #FEFFFE;">
          <h1 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.5px;">Synergy 3D Digital Lab</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #a5b4fc; font-weight: 500;">New Webinar Registration</p>
        </div>

        <!-- Body -->
        <div style="padding: 30px 24px; background-color: #ffffff;">
          <h2 style="color: #0a1045; margin-top: 0; font-size: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            Registration Details
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 35%; font-weight: 400;">Webinar Title</td>
              <td style="padding: 10px 0; color: #0a1045; font-weight: bold; font-size: 15px;">${webinarTitle}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 400;">Name</td>
              <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 400;">Email Address</td>
              <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">
                <a href="mailto:${email}" style="color: #1344c4; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 400;">WhatsApp Number</td>
              <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">${whatsAppNumber}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            This user registered for a webinar on the Synergy 3D website.
          </p>
          <p style="color: #94a3b8; font-size: 11px; margin: 6px 0 0 0;">
            Received on ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: `Synergy 3D Notifications <${sender}>`,
      to: "enricoromano@synergy3d.net",
      subject: `🎓 Webinar Registered: ${name} — ${webinarTitle}`,
      html,
    });
  } catch (emailError) {
    console.error("Resend webinar registration email error:", emailError);
  }
}

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
        // Avoid duplicate registrations for same email + webinar
        const existing = await WebinarRegistration.findOne({ webinarId: id, email: email.toLowerCase() });
        if (!existing) {
          await WebinarRegistration.create({ webinarId: id, name, email: email.toLowerCase(), whatsAppNumber });
          settings.totalRegistrations = (settings.totalRegistrations || 0) + 1;
          await settings.save();

          await sendRegistrationEmail({
            name,
            email,
            whatsAppNumber,
            webinarTitle: settings.bannerTitle || "Digital Denture Masterclass",
          });
        }
        return NextResponse.json({ success: true, registeredCount: settings.totalRegistrations, alreadyRegistered: !!existing });
      }
      return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
    }

    // Avoid duplicate registrations for same email + webinar
    const existing = await WebinarRegistration.findOne({ webinarId: id, email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: true, registeredCount: webinar.registeredCount, alreadyRegistered: true });
    }

    // Save registration
    await WebinarRegistration.create({
      webinarId: id,
      name,
      email: email.toLowerCase(),
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

    await sendRegistrationEmail({
      name,
      email,
      whatsAppNumber,
      webinarTitle: webinar.title || "Webinar Session",
    });

    return NextResponse.json({ success: true, registeredCount: webinar.registeredCount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
