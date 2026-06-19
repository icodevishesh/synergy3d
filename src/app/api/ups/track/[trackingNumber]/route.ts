// app/api/ups/track/[trackingNumber]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUPSToken } from "@/lib/ups-auth";

const baseUrl =
  process.env.UPS_ENV === "production"
    ? "https://onlinetools.ups.com"
    : "https://wwwcie.ups.com";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params;

    if (!trackingNumber) {
      return NextResponse.json(
        { error: "Tracking number is required" },
        { status: 400 }
      );
    }

    const token = await getUPSToken();

    const trackRes = await fetch(
      `${baseUrl}/api/track/v1/details/${trackingNumber}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          transId: crypto.randomUUID(),
          transactionSrc: "synergy3d",
        },
      }
    );

    if (!trackRes.ok) {
      const err = await trackRes.json();
      console.error("UPS Tracking Error:", JSON.stringify(err, null, 2));

      // UPS returns 404 for tracking numbers not yet scanned/found
      if (trackRes.status === 404) {
        return NextResponse.json(
          { error: "Tracking number not found. It may not be scanned yet." },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: "Failed to fetch tracking info", details: err },
        { status: trackRes.status }
      );
    }

    const data = await trackRes.json();
    const shipment = data.trackResponse.shipment[0];
    const pkg = shipment.package[0];

    // Simplify the response for frontend use
    const simplified = {
      trackingNumber: pkg.trackingNumber,
      currentStatus: pkg.currentStatus?.description || "In Transit",
      statusCode: pkg.currentStatus?.code,
      deliveryDate: pkg.deliveryDate?.[0]?.date || null,
      deliveryTime: pkg.deliveryTime?.endTime || null,
      activity: (pkg.activity || []).map((a: any) => ({
        status: a.status?.description,
        location: a.location?.address
          ? `${a.location.address.city || ""}, ${a.location.address.stateProvince || ""}`.trim()
          : "—",
        date: a.date,
        time: a.time,
      })),
    };

    return NextResponse.json({ success: true, ...simplified });
  } catch (error: any) {
    console.error("Tracking error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}