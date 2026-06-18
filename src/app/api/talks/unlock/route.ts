import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import TalkUnlock from '@/models/TalkUnlock';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// GET /api/talks/unlock?email=xxx — check if email is already unlocked
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email')?.toLowerCase().trim();
  if (!email) return NextResponse.json({ unlocked: false });

  try {
    await connectToDatabase();
    const existing = await TalkUnlock.findOne({ email });
    return NextResponse.json({ unlocked: !!existing });
  } catch {
    return NextResponse.json({ unlocked: false });
  }
}

// POST /api/talks/unlock — save user details (idempotent by email)
export async function POST(req: Request) {
  try {
    const { name, email, practice } = await req.json();
    if (!name || !email || !practice) {
      return NextResponse.json({ error: 'Name, email, and practice name are required' }, { status: 400 });
    }

    await connectToDatabase();

    // Upsert — don't duplicate if email already registered
    await TalkUnlock.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { name, practice, unlockedAt: new Date() },
      { upsert: true, new: true }
    );

    // Send email notification to visheshpurkait@gmail.com
    try {
      const sender = process.env.EMAIL_FROM || "noreply@synergy3d.net";
      const html = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0a1045 0%, #1344c4 100%); padding: 30px 24px; text-align: center; color: #FEFFFE;">
            <h1 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.5px;">Synergy 3D Digital Lab</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #a5b4fc; font-weight: 500;">SynergyTalks Episode Unlocked</p>
          </div>

          <!-- Body -->
          <div style="padding: 30px 24px; background-color: #ffffff;">
            <h2 style="color: #0a1045; margin-top: 0; font-size: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
              User Details
            </h2>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 35%; font-weight: 400;">Name</td>
                <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 400;">Practice Name</td>
                <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">${practice}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 400;">Email Address</td>
                <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #1344c4; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>
          </div>

          <!-- Footer -->
          <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              This user unlocked SynergyTalks content on the Synergy 3D website.
            </p>
            <p style="color: #94a3b8; font-size: 11px; margin: 6px 0 0 0;">
              Received on ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST
            </p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: `Synergy 3D Notifications <${sender}>`,
        to: "visheshpurkait@gmail.com",
        subject: `🔓 SynergyTalks Episode Unlocked: ${name} — ${practice}`,
        html,
      });
    } catch (emailError) {
      // Log error but do not block response to frontend
      console.error("Resend unlock email error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
