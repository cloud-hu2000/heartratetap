import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { verifyPassword, signSession, makeSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || "").toLowerCase().trim();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const rows = await sql`select id, email, name, password_hash, role from users where email = ${email} limit 1`;
    const user = rows[0];
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = verifyPassword(password, user.password_hash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signSession({ sub: user.id, email: user.email, role: user.role });
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    const secure = process.env.NODE_ENV === "production";
    res.headers.set("Set-Cookie", makeSessionCookie(token, secure));
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}


