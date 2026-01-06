import { NextResponse } from "next/server";
import { readSessionFromHeader, verifySession } from "@/lib/auth";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  console.log('🚀 API /auth/update-profile: 开始处理profile更新请求');

  // Check if database is available (skip during build)
  if (!sql) {
    console.log('❌ API /auth/update-profile: 数据库连接不可用');
    return NextResponse.json({
      error: "Database connection not available. Please configure POSTGRES_URL."
    }, { status: 503 });
  }

  console.log('✅ API /auth/update-profile: 数据库连接正常');

  try {
    console.log('🔍 API /auth/update-profile: 检查认证信息');

    const cookieHeader = req.headers.get("cookie");
    console.log('🍪 API /auth/update-profile: Cookie头是否存在:', !!cookieHeader);

    const token = readSessionFromHeader(cookieHeader);
    console.log('🔑 API /auth/update-profile: Token是否存在:', !!token);

    if (!token) {
      console.log('❌ API /auth/update-profile: 未找到token，返回401');
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log('🔐 API /auth/update-profile: 验证token');
    const payload = verifySession(token);
    console.log('🔐 API /auth/update-profile: Token payload:', payload);

    if (!payload || !payload.sub) {
      console.log('❌ API /auth/update-profile: Token无效或缺少sub字段');
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    console.log('✅ API /auth/update-profile: 认证成功，用户ID:', payload.sub);

    console.log('📥 API /auth/update-profile: 解析请求体');
    const { name } = await req.json();
    console.log('📦 API /auth/update-profile: 请求数据:', { name: name ? '***' : null });

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      console.log('❌ API /auth/update-profile: 名称验证失败 - 名称为空');
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (name.length > 100) {
      console.log('❌ API /auth/update-profile: 名称验证失败 - 名称过长');
      return NextResponse.json({ error: "Name too long (max 100 characters)" }, { status: 400 });
    }

    console.log('✅ API /auth/update-profile: 输入验证通过');

    console.log('💾 API /auth/update-profile: 更新数据库');
    const updateResult = await sql`
      UPDATE users
      SET name = ${name.trim()}, updated_at = NOW()
      WHERE id = ${payload.sub}
    `;
    console.log('💾 API /auth/update-profile: 更新结果:', updateResult);

    console.log('🔍 API /auth/update-profile: 查询更新后的用户数据');
    const rows = await sql`
      SELECT id, email, name, role, account_tier, email_verified, created_at, updated_at
      FROM users
      WHERE id = ${payload.sub}
      LIMIT 1
    `;
    const user = rows[0] ?? null;
    console.log('🔍 API /auth/update-profile: 查询结果:', user ? '找到用户' : '未找到用户');

    console.log('🎉 API /auth/update-profile: Profile更新成功');
    return NextResponse.json({ user, success: true });
  } catch (err) {
    console.error('💥 API /auth/update-profile: 处理过程中发生异常', err);
    console.error('💥 错误详情:', {
      name: err instanceof Error ? err.name : 'Unknown',
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return NextResponse.json({
      error: "Failed to update profile",
      detail: String(err)
    }, { status: 500 });
  }
}
