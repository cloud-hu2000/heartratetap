import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

    const rows = await sql`
      select id, user_id, expires_at, used from auth_tokens where token = ${token} and type = 'email_verification' limit 1
    `;
    const t = rows[0];
    if (!t) return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    if (t.used) return NextResponse.json({ ok: true, message: "Already verified" });
    const now = new Date();
    if (new Date(t.expires_at) < now) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    await sql`update users set email_verified = true where id = ${t.user_id}`;
    await sql`update auth_tokens set used = true, consumed_at = ${now} where id = ${t.id}`;

    // optional: redirect to homepage or login page
    return NextResponse.redirect(new URL("/", req.url));
  } catch (err) {
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}


