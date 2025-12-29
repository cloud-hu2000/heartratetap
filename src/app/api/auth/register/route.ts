import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword, signSession, makeSessionCookie } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mailer";
import { randomUUID } from "crypto";

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

    console.log('💾 API /auth/register: 插入新用户到数据库（未验证邮箱）');
    const inserted = await sql`
      insert into users (email, email_verified, name, password_hash)
      values (${email}, false, ${name}, ${password_hash})
      returning id, email, name, role, account_tier
    `;

    console.log('📊 插入结果:', inserted.length, '条记录');
    if (inserted.length === 0) {
      console.error('❌ API /auth/register: 用户插入失败');
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }

    const user = inserted[0];
    console.log('👤 新用户创建成功（未验证）:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      account_tier: user.account_tier
    });

    // 生成验证token并写入 auth_tokens 表
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24小时有效
    console.log('🔑 生成邮箱验证token:', token, '，有效期至', expiresAt.toISOString());

    const insertedToken = await sql`
      insert into auth_tokens (user_id, token, type, expires_at, used)
      values (${user.id}, ${token}, 'email_verification', ${expiresAt.toISOString()}, false)
      returning id
    `;
    console.log('📊 auth_tokens 插入结果：', insertedToken.length);

    // 发送验证邮件
    console.log('📨 开始发送验证邮件到', email);
    const sendResult = await sendVerificationEmail(email, token);
    console.log('📨 发送验证邮件结果:', sendResult);

    // 不直接设置session cookie，等用户验证后再允许登录
    const res = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        account_tier: user.account_tier
      },
      verificationSent: true
    }, { status: 201 });

    console.log('🎉 API /auth/register: 已发送验证邮件，等待用户验证');
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


