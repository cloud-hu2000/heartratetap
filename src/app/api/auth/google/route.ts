import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getBaseUrl(req: Request) {
  // 优先使用显式配置的 BASE_URL
  const envBase =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_URL ||
    process.env.VERCEL_URL;

  if (envBase) {
    if (envBase.startsWith("http://") || envBase.startsWith("https://")) {
      return envBase.replace(/\/+$/, "");
    }
    return `https://${envBase.replace(/\/+$/, "")}`;
  }

  const host =
    req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const protocol = req.headers.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

export async function GET(req: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("❌ GOOGLE_CLIENT_ID 未配置");
    return NextResponse.json(
      { error: "Google OAuth is not configured on the server" },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const baseUrl = getBaseUrl(req);

  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    `${baseUrl}/api/auth/google/callback`;

  const returnUrl = url.searchParams.get("returnUrl") || "/";
  const stateFromClient = url.searchParams.get("state") || "";

  const state = encodeURIComponent(
    JSON.stringify({
      returnUrl,
      state: stateFromClient,
    })
  );

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");
  authUrl.searchParams.set("state", state);

  return NextResponse.redirect(authUrl.toString());
}

