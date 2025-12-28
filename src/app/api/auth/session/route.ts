import { NextResponse } from "next/server";
import { readSessionFromHeader, verifySession } from "@/lib/auth";
import { sql } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const token = readSessionFromHeader(cookieHeader);
    if (!token) return NextResponse.json({ user: null });

    const payload = verifySession(token);
    if (!payload || !payload.sub) return NextResponse.json({ user: null });

    const rows = await sql`select id, email, name, role, account_tier from users where id = ${payload.sub} limit 1`;
    const user = rows[0] ?? null;
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}


