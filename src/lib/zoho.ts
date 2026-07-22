let cachedToken: { token: string; expiresAt: number } | null = null;

async function getZohoAccessToken(): Promise<string> {
  // Reuse token if still valid (with 60s buffer)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
  });

  const res = await fetch(`${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    console.error("Zoho token refresh failed:", data);
    throw new Error("Failed to refresh Zoho access token");
  }

  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };

  return data.access_token;
}

interface ZohoLeadPayload {
  firstName: string;
  lastName: string;
  practice: string;
  phone: string;
  email?: string;
  state?: string;
  callTime?: string;
  notes?: string;
  helpWith?: string[];
}

export async function pushLeadToZoho(payload: ZohoLeadPayload) {
  const accessToken = await getZohoAccessToken();

  const leadRecord = {
    First_Name: payload.firstName,
    Last_Name: payload.lastName || payload.firstName, // Last_Name is mandatory in Zoho
    Company: payload.practice || "Not Provided", // Company is mandatory for Leads
    Phone: payload.phone,
    Email: payload.email || undefined,
    Lead_Source: "Website Callback Form",
    Description: payload.notes || "",
    // Custom fields — create these in Zoho CRM Setup > Modules > Leads > Fields first
    State: payload.state || "",
    Preferred_Call_Time: payload.callTime || "",
    Help_Needed_With: Array.isArray(payload.helpWith) ? payload.helpWith.join(", ") : "",
  };

  const res = await fetch(`${process.env.ZOHO_API_DOMAIN}/crm/v6/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: [leadRecord] }),
  });

  const result = await res.json();

  if (!res.ok || result?.data?.[0]?.status !== "success") {
    console.error("Zoho lead creation failed:", JSON.stringify(result));
    // Don't throw — we don't want a Zoho failure to break the user-facing request
    return { success: false, error: result };
  }

  return { success: true, zohoId: result.data[0].details.id };
}