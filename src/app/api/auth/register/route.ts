import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword, signSession, makeSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  console.log('🚀 API /auth/register: 开始处理注册请求');

  // Check if database is available (skip during build)
  if (!sql) {
    console.error('❌ API /auth/register: 数据库连接不可用');
    return NextResponse.json({
      error: "Database connection not available. Please configure POSTGRES_URL."
    }, { status: 503 });
  }

  try {
    console.log('📥 API /auth/register: 解析请求体');
    const body = await req.json();
    console.log('📦 请求体数据:', { ...body, password: '***' }); // 隐藏密码

    const email = (body.email || "").toLowerCase().trim();
    const password = body.password;
    const name = body.name || null;

    console.log('🔍 API /auth/register: 验证输入数据');
    console.log('  - Email:', email);
    console.log('  - Password length:', password ? password.length : 0);
    console.log('  - Name:', name);

    if (!email || !password) {
      console.warn('❌ API /auth/register: 缺少必需字段');
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('❌ API /auth/register: 邮箱格式无效', email);
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    console.log('🔍 API /auth/register: 检查邮箱是否已存在');
    const existing = await sql`select id from users where email = ${email}`;
    console.log('📊 现有用户查询结果:', existing.length, '个记录');

    if (existing.length > 0) {
      console.warn('❌ API /auth/register: 邮箱已被注册', email);
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    console.log('🔐 API /auth/register: 哈希密码');
    const password_hash = hashPassword(password);
    console.log('✅ 密码哈希完成');

    console.log('💾 API /auth/register: 插入新用户到数据库');
    const inserted = await sql`
      insert into users (email, email_verified, name, password_hash)
      values (${email}, true, ${name}, ${password_hash})
      returning id, email, name, role, account_tier
    `;

    console.log('📊 插入结果:', inserted.length, '条记录');
    if (inserted.length === 0) {
      console.error('❌ API /auth/register: 用户插入失败');
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }

    const user = inserted[0];
    console.log('👤 新用户创建成功:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      account_tier: user.account_tier
    });

    console.log('🎫 API /auth/register: 生成JWT token');
    const token = signSession({ sub: user.id, email: user.email, role: user.role });
    console.log('✅ JWT token生成成功');

    console.log('🍪 API /auth/register: 设置session cookie');
    const res = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        account_tier: user.account_tier
      },
      tokens: true // 向前端表示有token
    }, { status: 201 });

    const secure = process.env.NODE_ENV === "production";
    res.headers.set("Set-Cookie", makeSessionCookie(token, secure));
    console.log('✅ Cookie设置完成，安全模式:', secure);

    console.log('🎉 API /auth/register: 注册成功完成');
    return res;

  } catch (err) {
    console.error('💥 API /auth/register: 服务器错误', err);
    console.error('💥 错误详情:', {
      name: err instanceof Error ? err.name : 'Unknown',
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return NextResponse.json({
      error: "Server error",
      detail: err instanceof Error ? err.message : String(err)
    }, { status: 500 });
  }
}


