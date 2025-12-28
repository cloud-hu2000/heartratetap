import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword, signSession, makeSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) return NextResponse.json({ error: "Missing token or password" }, { status: 400 });

    const rows = await sql`
      select id, user_id, expires_at, used from auth_tokens where token = ${token} and type = 'password_reset' limit 1
    `;
    const t = rows[0];
    if (!t) return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    if (t.used) return NextResponse.json({ error: "Token already used" }, { status: 400 });
    const now = new Date();
    if (new Date(t.expires_at) < now) return NextResponse.json({ error: "Token expired" }, { status: 400 });

    const password_hash = hashPassword(password);
    await sql`update users set password_hash = ${password_hash} where id = ${t.user_id}`;
    await sql`update auth_tokens set used = true, consumed_at = ${now} where id = ${t.id}`;

    // sign session and set cookie
    const rowsUser = await sql`select id, email, name, role from users where id = ${t.user_id} limit 1`;
    const user = rowsUser[0];
    const tokenJwt = signSession({ sub: user.id, email: user.email, role: user.role });
    const res = NextResponse.json({ ok: true });
    const secure = process.env.NODE_ENV === "production";
    res.headers.set("Set-Cookie", makeSessionCookie(tokenJwt, secure));
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}


