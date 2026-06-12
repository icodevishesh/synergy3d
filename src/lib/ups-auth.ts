// lib/ups-auth.ts
// Fetches and caches UPS OAuth token

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

export async function getUPSToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && now < tokenExpiry - 60000) {
    return cachedToken;
  }

  const clientId = process.env.UPS_CLIENT_ID!;
  const clientSecret = process.env.UPS_CLIENT_SECRET!;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const baseUrl =
    process.env.UPS_ENV === "production"
      ? "https://onlinetools.ups.com"
      : "https://wwwcie.ups.com";

  const res = await fetch(`${baseUrl}/security/v1/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`UPS Auth failed: ${err}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000;

  return cachedToken!;
}
