// lib/send-label-email.ts
import nodemailer from "nodemailer";

interface SendLabelEmailParams {
  to: string;
  practiceName: string;
  contactName?: string;
  trackingNumber: string;
  base64Label: string;
  casesEnclosed: string | number;
}

// GoDaddy SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtpout.secureserver.net",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLabelEmail({
  to,
  practiceName,
  contactName,
  trackingNumber,
  base64Label,
  casesEnclosed,
}: SendLabelEmailParams) {
  // Convert base64 to buffer for attachment
  const labelBuffer = Buffer.from(base64Label, "base64");

  const mailOptions = {
    from: `"Synergy 3D Digital Lab" <${process.env.SMTP_FROM}>`,
    to,
    cc: process.env.SMTP_FROM, // CC your own email so you have a record
    subject: `Your Prepaid UPS Return Label — Tracking #${trackingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a2e; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Synergy 3D Digital Lab</h1>
        </div>
        
        <div style="padding: 32px; background: #ffffff;">
          <h2 style="color: #1a1a2e; margin-top: 0;">Your Prepaid UPS Return Label</h2>
          
          <p style="color: #555; font-size: 16px;">
            Hi ${contactName || practiceName},
          </p>
          
          <p style="color: #555; font-size: 16px;">
            Your prepaid UPS return shipping label is attached to this email as a PDF.
            Please print it and attach it securely to your package.
          </p>

          <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 14px;">Practice Name</td>
                <td style="padding: 8px 0; color: #1a1a2e; font-weight: bold; font-size: 14px;">${practiceName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 14px;">Tracking Number</td>
                <td style="padding: 8px 0; color: #1a1a2e; font-weight: bold; font-size: 14px;">${trackingNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 14px;">Cases Enclosed</td>
                <td style="padding: 8px 0; color: #1a1a2e; font-weight: bold; font-size: 14px;">${casesEnclosed}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 14px;">Carrier</td>
                <td style="padding: 8px 0; color: #1a1a2e; font-weight: bold; font-size: 14px;">UPS Ground</td>
              </tr>
            </table>
          </div>

          <h3 style="color: #1a1a2e;">Next Steps:</h3>
          <ol style="color: #555; font-size: 15px; line-height: 1.8;">
            <li>Print the attached PDF label</li>
            <li>Place your case(s) securely in the package</li>
            <li>Attach the label to the outside of the package</li>
            <li>Drop off at any UPS location or schedule a pickup at <a href="https://www.ups.com" style="color: #0066cc;">ups.com</a></li>
          </ol>

          <p style="color: #555; font-size: 14px;">
            You can track your shipment at 
            <a href="https://www.ups.com/track?tracknum=${trackingNumber}" style="color: #0066cc;">
              ups.com/track
            </a>
            using tracking number <strong>${trackingNumber}</strong>.
          </p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; text-align: center;">
          <p style="color: #888; font-size: 13px; margin: 0;">
            Questions? Contact us at 
            <a href="mailto:${process.env.SMTP_FROM}" style="color: #0066cc;">${process.env.SMTP_FROM}</a>
          </p>
          <p style="color: #bbb; font-size: 12px; margin: 8px 0 0;">
            © ${new Date().getFullYear()} Synergy 3D Digital Lab. All rights reserved.
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `UPS-Label-${trackingNumber}.pdf`,
        content: labelBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}
