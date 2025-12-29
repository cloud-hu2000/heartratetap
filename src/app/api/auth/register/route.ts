import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword, signSession, makeSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  // Check if database is available (skip during build)
  if (!sql) {
    return NextResponse.json({
      error: "Database connection not available. Please configure POSTGRES_URL."
    }, { status: 503 });
  }

  try {
    const body = await req.json();
    const email = (body.email || "").toLowerCase().trim();
    const password = body.password;
    const name = body.name || null;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // check existing
    const existing = await sql`select id from users where email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const password_hash = hashPassword(password);

    const inserted = await sql`
      insert into users (email, email_verified, name, password_hash)
      values (${email}, true, ${name}, ${password_hash})
      returning id, email, name, role, account_tier
    `;

    const user = inserted[0];

    const token = signSession({ sub: user.id, email: user.email, role: user.role });

    const res = NextResponse.json({ ok: true, user }, { status: 201 });
    const secure = process.env.NODE_ENV === "production";
    res.headers.set("Set-Cookie", makeSessionCookie(token, secure));
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}


