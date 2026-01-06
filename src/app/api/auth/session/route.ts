import { NextResponse } from "next/server";
import { readSessionFromHeader, verifySession } from "@/lib/auth";
import { sql } from "@/lib/db";

export async function GET(req: Request) {
    console.log('🚀 API /auth/session: 开始处理session请求');

    // Check if database is available (skip during build)
    if (!sql) {
      console.log('❌ API /auth/session: 数据库连接不可用');
      return NextResponse.json({
        error: "Database connection not available. Please configure POSTGRES_URL."
      }, { status: 503 });
    }

    try {
      console.log('🍪 API /auth/session: 检查cookie');
      const cookieHeader = req.headers.get("cookie");
      console.log('🍪 Cookie header present:', !!cookieHeader);

      const token = readSessionFromHeader(cookieHeader);
      console.log('🔑 API /auth/session: Token present:', !!token);

      if (!token) {
        console.log('❌ API /auth/session: 未找到token');
        return NextResponse.json({ user: null });
      }

      console.log('🔐 API /auth/session: 验证token');
      const payload = verifySession(token);
      console.log('🔐 API /auth/session: Token payload:', payload);

      if (!payload || !payload.sub) {
        console.log('❌ API /auth/session: Token无效');
        return NextResponse.json({ user: null });
      }

      console.log('🔍 API /auth/session: 查询用户数据，用户ID:', payload.sub);
      const rows = await sql`select id, email, name, role, account_tier, email_verified, created_at, updated_at from users where id = ${payload.sub} limit 1`;
      const user = rows[0] ?? null;
      console.log('🔍 API /auth/session: 查询结果:', user ? { id: user.id, email: user.email, name: user.name } : '未找到用户');

      console.log('✅ API /auth/session: Session验证成功');
      return NextResponse.json({ user });
    } catch (err) {
      console.error('💥 API /auth/session: 处理异常', err);
      return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
    }
}


