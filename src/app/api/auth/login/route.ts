import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { verifyPassword, signSession, makeSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    console.log('🚀 API /api/auth/login: 开始处理登录请求');

    // Check if database is available (skip during build)
    if (!sql) {
      console.error('❌ 数据库连接不可用');
      return NextResponse.json({
        error: "Database connection not available. Please configure POSTGRES_URL."
      }, { status: 503 });
    }

    const body = await req.json();
    console.log('📦 请求体数据:', { email: body.email, password: body.password ? '***' : 'missing' });

    const email = (body.email || "").toLowerCase().trim();
    const password = body.password;

    console.log('🔍 处理后的邮箱:', email);

    if (!email || !password) {
      console.warn('⚠️ 缺少邮箱或密码');
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    console.log('🔍 查询用户:', email);
    const rows = await sql`select id, email, name, password_hash, role from users where email = ${email} limit 1`;
    const user = rows[0];

    if (!user) {
      console.warn('⚠️ 用户不存在:', email);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    console.log('✅ 用户找到:', { id: user.id, email: user.email, name: user.name });

    console.log('🔐 验证密码...');
    const passwordValid = verifyPassword(password, user.password_hash);

    if (!passwordValid) {
      console.warn('⚠️ 密码验证失败');
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    console.log('✅ 密码验证成功');

    console.log('🎫 生成会话token...');
    const token = signSession({ sub: user.id, email: user.email, role: user.role });

    console.log('🍪 设置会话cookie...');
    const secure = process.env.NODE_ENV === "production";
    const res = NextResponse.json({
      tokens: {
        accessToken: token,
        refreshToken: null // 如果有刷新token逻辑，可以在这里设置
      },
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

    res.headers.set("Set-Cookie", makeSessionCookie(token, secure));

    console.log('✅ 登录成功，返回响应');

    return res;
  } catch (err) {
    console.error('💥 API /api/auth/login: 服务器错误', err);
    console.error('💥 错误详情:', {
      name: err instanceof Error ? err.name : 'Unknown',
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return NextResponse.json({ error: "Server error", detail: String(err) }, { status: 500 });
  }
}


