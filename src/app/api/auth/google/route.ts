import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const credential = body?.credential;
    if (!credential) {
      return NextResponse.json({ error: "Missing credential" }, { status: 400 });
    }

    // Verify the ID token with Google's tokeninfo endpoint
    const tokenInfoRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
    );

    if (!tokenInfoRes.ok) {
      const text = await tokenInfoRes.text();
      return NextResponse.json({ error: "Invalid token", detail: text }, { status: 401 });
    }

    const payload = await tokenInfoRes.json();

    const expectedClientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!expectedClientId) {
      return NextResponse.json({ error: "Server not configured: missing GOOGLE_CLIENT_ID" }, { status: 500 });
    }

    if (payload.aud !== expectedClientId && payload.aud !== process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      return NextResponse.json({ error: "Invalid audience" }, { status: 401 });
    }

    // At this point the token is valid. You may create a server session here.
    // For now return basic user info; integrate session creation as a next step.
    const user = {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };

    return NextResponse.json({ ok: true, user });
  } catch (err) {
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}


