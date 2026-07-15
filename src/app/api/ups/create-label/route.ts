// app/api/ups/create-label/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUPSToken } from "@/lib/ups-auth";
import { sendLabelEmail } from "@/lib/send-label-email";
import crypto from "crypto";

const baseUrl =
  process.env.UPS_ENV === "production"
    ? "https://onlinetools.ups.com"
    : "https://wwwcie.ups.com";

// Your warehouse — the destination for all return labels
const SYNERGY3D_ADDRESS = {
  name: "Synergy 3D Digital Lab",
  addressLine: "1147 Route 9",
  city: "Wappingers Falls",
  stateCode: "NY",
  postalCode: "12590",
  countryCode: "US",
  phone: "8457216325",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      practiceName,
      contactName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      weight,
      casesEnclosed,
    } = body;

    // Validate required fields
    if (!practiceName || !email || !address || !city || !state || !zip || !weight) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const token = await getUPSToken();

    const shipmentPayload = {
      ShipmentRequest: {
        Request: {
          SubVersion: "1801",
          RequestOption: "nonvalidate",
          TransactionReference: {
            CustomerContext: `Synergy3D-${Date.now()}`,
          },
        },
        Shipment: {
          Description: `Return shipment - ${casesEnclosed} case(s)`,
          Shipper: {
            Name: practiceName,
            AttentionName: contactName || practiceName,
            Phone: { Number: phone?.replace(/\D/g, "") || "0000000000" },
            ShipperNumber: process.env.UPS_ACCOUNT_NUMBER,
            Address: {
              AddressLine: [address],
              City: city,
              StateProvinceCode: state,
              PostalCode: zip,
              CountryCode: "US",
            },
          },
          ShipTo: {
            Name: SYNERGY3D_ADDRESS.name,
            AttentionName: "Returns Department",
            Phone: { Number: SYNERGY3D_ADDRESS.phone },
            Address: {
              AddressLine: [SYNERGY3D_ADDRESS.addressLine],
              City: SYNERGY3D_ADDRESS.city,
              StateProvinceCode: SYNERGY3D_ADDRESS.stateCode,
              PostalCode: SYNERGY3D_ADDRESS.postalCode,
              CountryCode: SYNERGY3D_ADDRESS.countryCode,
            },
          },
          ShipFrom: {
            Name: practiceName,
            AttentionName: contactName || practiceName,
            Phone: { Number: phone?.replace(/\D/g, "") || "0000000000" },
            Address: {
              AddressLine: [address],
              City: city,
              StateProvinceCode: state,
              PostalCode: zip,
              CountryCode: "US",
            },
          },
          PaymentInformation: {
            ShipmentCharge: [
              {
                Type: "01", // Transportation charge — billed to shipper account
                BillShipper: {
                  AccountNumber: process.env.UPS_ACCOUNT_NUMBER,
                },
              },
            ],
          },
          Service: {
            Code: "02", // UPS 2nd day air
            Description: "UPS 2nd day air",
          },
          Package: [
            {
              Description: `${casesEnclosed} case(s)`,
              Packaging: {
                Code: "02", // Customer Supplied Package
                Description: "Package",
              },
              PackageWeight: {
                UnitOfMeasurement: { Code: "LBS", Description: "Pounds" },
                Weight: String(weight),
              },
              ReferenceNumber: [
                {
                  Code: "00",
                  Value: `Synergy3D-Return-${Date.now()}`,
                },
              ],
            },
          ],
        },
        LabelSpecification: {
          LabelImageFormat: {
            Code: "PDF",
            Description: "PDF",
          },
          LabelStockSize: {
            Height: "6",
            Width: "4",
          },
        },
      },
    };

    const shipRes = await fetch(`${baseUrl}/api/shipments/v2409/ship`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        transId: crypto.randomUUID(),
        transactionSrc: "synergy3d",
      },
      body: JSON.stringify(shipmentPayload),
    });

    if (!shipRes.ok) {
      const err = await shipRes.json();
      console.error("UPS Shipment Error:", JSON.stringify(err, null, 2));
      return NextResponse.json(
        { error: "Failed to create UPS shipment", details: err },
        { status: 500 }
      );
    }

    const shipData = await shipRes.json();

    // Temporary: log full response to see structure
    // console.log("UPS Response:", JSON.stringify(shipData, null, 2));
    
    // const packageResult =
    //   shipData.ShipmentResponse.PackageResults[0] ||
    //   shipData.ShipmentResponse.PackageResults;

    // const base64Label = packageResult.ShippingLabel.GraphicImage;
    // const trackingNumber =
    //   shipData.ShipmentResponse.ShipmentResults?.ShipmentIdentificationNumber ||
    //   packageResult.TrackingNumber;

    const packageResult = shipData.ShipmentResponse.ShipmentResults.PackageResults[0];
    const base64Label = packageResult.ShippingLabel.GraphicImage;
    const trackingNumber = shipData.ShipmentResponse.ShipmentResults.ShipmentIdentificationNumber;

    // Send the label via email
    await sendLabelEmail({
      to: email,
      practiceName,
      contactName,
      trackingNumber,
      base64Label,
      casesEnclosed,
    });

    

    return NextResponse.json({
      success: true,
      trackingNumber,
      message: `Label emailed to ${email}`,
    });
    
    return NextResponse.json({
      success: true,
      debug: shipData, // return full response for now
      trackingNumber,
      label: base64Label, // base64 PDF
      message: "Label generated successfully"
    });
  } catch (error: any) {
    console.error("Create label error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
