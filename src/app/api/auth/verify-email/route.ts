import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { signSession, makeSessionCookie } from "@/lib/auth";

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    // Check if database is available (skip during build)
  if (!sql) {
    return NextResponse.json({
      error: "Database connection not available. Please configure POSTGRES_URL."
    }, { status: 503 });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    console.log('📥 API /auth/verify-email: incoming token=', token);
    if (!token) {
      console.warn('❌ API /auth/verify-email: missing token in request');
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const rows = await sql`
      select id, user_id, expires_at, used from auth_tokens where token = ${token} and type = 'email_verification' limit 1
    `;
    const t = rows[0];
    if (!t) {
      console.warn('❌ API /auth/verify-email: invalid token', token);
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    if (t.used) {
      console.log('ℹ️ API /auth/verify-email: token already used for user_id=', t.user_id);
      return NextResponse.json({ ok: true, message: "Already verified" });
    }
    const now = new Date();
    if (new Date(t.expires_at) < now) {
      console.warn('❌ API /auth/verify-email: token expired', { token, expires_at: t.expires_at });
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    console.log('✅ API /auth/verify-email: token valid, marking user verified:', t.user_id);
    await sql`update users set email_verified = true where id = ${t.user_id}`;
    await sql`update auth_tokens set used = true, consumed_at = ${now} where id = ${t.id}`;

    // 查找用户信息，用于签发 session
    const userRows = await sql`select id, email, role from users where id = ${t.user_id} limit 1`;
    const user = userRows[0];

    if (user) {
      try {
        console.log('🎫 API /auth/verify-email: 签发 session token for user', user.id);
        const sessionToken = signSession({ sub: user.id, email: user.email, role: user.role });
        const secure = process.env.NODE_ENV === "production";
        const res = NextResponse.redirect(new URL("/", req.url));
        res.headers.set("Set-Cookie", makeSessionCookie(sessionToken, secure));
        console.log('🍪 API /auth/verify-email: session cookie set, secure=', secure);
        return res;
      } catch (err) {
        console.error('⚠️ API /auth/verify-email: failed to create session', err);
        // still redirect even if session creation failed
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // optional: redirect to homepage or login page
    return NextResponse.redirect(new URL("/", req.url));
  } catch (err) {
    console.error('💥 API /auth/verify-email: server error', err);
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}


