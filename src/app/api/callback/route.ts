import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/db";
import Callback from "@/models/Callback";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";



const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {

    const callbackSchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      practice: z.string(),
      phone: z.string(),
      email: z.string().optional().or(z.literal("")),
    })

    const body = await req.json();
    const result = callbackSchema.safeParse(body)
    if(!result.success){
      return NextResponse.json({
        error: result.error.issues
      },{
        status:400
      })
    }

    const {
      firstName,
      lastName,
      practice,
      phone,
      email,
      state,
      callTime,
      notes,
      helpWith,
    } = body;

    await connectToDatabase();

    const queryConditions: any[] = [];
    if (email && email.trim() !== "") {
      queryConditions.push({ email });
    }
    if (phone && phone.trim() !== "") {
      queryConditions.push({ phone });
    }

    const already = queryConditions.length > 0
      ? await Callback.findOne({ $or: queryConditions })
      : null;

    if (already) {
      return NextResponse.json(
        { error: "Callback request already exists" },
        { status: 400 }
      );
    }
    const callback = await Callback.create({
      firstName,
      lastName,
      practice,
      phone,
      email,
      state,
      callTime,
      notes,
      helpWith,
    })

    // const recipient = "info@synergy3d.net";
    const recipient = "visheshpurkait23@gmail.com";
    const sender = process.env.EMAIL_FROM || "noreply@synergy3d.net";
    const helpOptionsText = Array.isArray(helpWith) && helpWith.length > 0
      ? helpWith.join(", ")
      : "None specified";

    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0a1045 0%, #1344c4 100%); padding: 30px 24px; text-align: center; color: #FEFFFE;">
          <h1 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.5px;">Synergy 3D Digital Lab</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #a5b4fc; font-weight: 500;">New Callback Request Received</p>
        </div>

        <!-- Body -->
        <div style="padding: 30px 24px; background-color: #ffffff;">
          <h2 style="color: #0a1045; margin-top: 0; font-size: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            Contact Information
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 35%; font-weight: 400;">Name</td>
              <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 400;">Practice Name</td>
              <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">${practice}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 400;">Phone Number</td>
              <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">
                <a href="tel:${phone}" style="color: #1344c4; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 400;">Email Address</td>
              <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">
                ${email ? `<a href="mailto:${email}" style="color: #1344c4; text-decoration: none;">${email}</a>` : '<span style="color: #94a3b8; italic">Not provided</span>'}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 400;">State</td>
              <td style="padding: 10px 0; color: #0a1045; font-size: 15px;">${state || '<span style="color: #94a3b8; italic">Not provided</span>'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 400;">Preferred Call Time</td>
              <td style="padding: 10px 0; color: #0a1045; font-size: 15px; font-weight: 600; color: #059669;">${callTime || "Anytime"}</td>
            </tr>
          </table>

          <h2 style="color: #0a1045; margin-top: 24px; font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">
            Request Details
          </h2>

          <div style="margin-top: 16px;">
            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Help Needed With:</p>
            <p style="margin: 0 0 20px 0; color: #0a1045; font-size: 15px; background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #1344c4; font-weight: 500;">
              ${helpOptionsText}
            </p>
          </div>

          <div style="margin-top: 16px;">
            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Additional Notes:</p>
            <div style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; background: #f8fafc; padding: 16px; border-radius: 8px; white-space: pre-wrap; border: 1px dashed #cbd5e1;">
              ${notes ? notes : '<span style="color: #94a3b8; font-style: italic;">No additional notes left by the user.</span>'}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            This callback request was submitted through the Synergy 3D Digital Lab website contact page.
          </p>
          <p style="color: #94a3b8; font-size: 11px; margin: 6px 0 0 0;">
            Received on ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST
          </p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: `Synergy 3D Notifications <${sender}>`,
      to: recipient,
      subject: `📞 Callback Request: ${firstName} ${lastName} — ${practice}`,
      html,
    });

    if (error) {
      console.error("Resend callback email error:", error);
      return NextResponse.json(
        { error: `Failed to send email: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Callback request email sent successfully",
      id: data?.id,
    });
  } catch (error: any) {
    console.error("Callback route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

async function isAuthorized() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const callbacks = await Callback.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(callbacks);
  } catch (error: any) {
    console.error("GET callbacks error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
