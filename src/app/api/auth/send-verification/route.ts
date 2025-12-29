import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { randomBytes } from "crypto";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST(req: Request) {
    // Check if database is available (skip during build)
  if (!sql) {
    return NextResponse.json({
      error: "Database connection not available. Please configure POSTGRES_URL."
    }, { status: 503 });
  }

  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });

    console.log('📨 API /auth/send-verification: request for', email);

    const rows = await sql`select id, email_verified from users where email = ${email} limit 1`;
    const user = rows[0];
    if (!user) {
      console.log('ℹ️ API /auth/send-verification: user not found, returning ok to avoid enumeration');
      return NextResponse.json({ ok: true });
    }

    if (user.email_verified) {
      console.log('ℹ️ API /auth/send-verification: user already verified', user.id);
      return NextResponse.json({ ok: true });
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await sql`
      insert into auth_tokens (user_id, token, type, expires_at)
      values (${user.id}, ${token}, 'email_verification', ${expiresAt})
    `;

    console.log('🔑 API /auth/send-verification: token generated for user', user.id);

    const sendResult = await sendVerificationEmail(email, token);
    console.log('📨 API /auth/send-verification: sendResult=', sendResult);

    // In development, return the token for easier debugging (do NOT enable in production)
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ ok: true, debugToken: token });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-verification handler error", err);
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}


