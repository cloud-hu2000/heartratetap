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

    const rows = await sql`select id, email_verified from users where email = ${email} limit 1`;
    const user = rows[0];
    if (!user) return NextResponse.json({ ok: true }); // do not reveal existence

    if (user.email_verified) return NextResponse.json({ ok: true });

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await sql`
      insert into auth_tokens (user_id, token, type, expires_at)
      values (${user.id}, ${token}, 'email_verification', ${expiresAt})
    `;

    await sendVerificationEmail(email, token);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-verification handler error", err);
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}


