import { NextResponse } from "next/server";
import { readSessionFromHeader, verifySession } from "@/lib/auth";
import { sql } from "@/lib/db";

// Use Node.js runtime for better performance and lower edge function usage
export const runtime = 'nodejs';

export async function GET(req: Request) {
    // Check if database is available (skip during build)
  if (!sql) {
    return NextResponse.json({
      error: "Database connection not available. Please configure POSTGRES_URL."
    }, { status: 503 });
  }

  try {
    const cookieHeader = req.headers.get("cookie");
    const token = readSessionFromHeader(cookieHeader);
    if (!token) return NextResponse.json({ user: null });

    const payload = verifySession(token);
    if (!payload || !payload.sub) return NextResponse.json({ user: null });

    const rows = await sql`select id, email, name, role, account_tier, email_verified, created_at, updated_at from users where id = ${payload.sub} limit 1`;
    const user = rows[0] ?? null;
    const response = NextResponse.json({ user });
    // 禁用缓存，确保总是返回最新的用户数据
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  } catch (err) {
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}
