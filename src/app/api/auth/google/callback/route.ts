import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { makeSessionCookie, signSession } from "@/lib/auth";

function getBaseUrl(req: Request) {
  const envBase =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_URL ||
    process.env.VERCEL_URL;

  if (envBase) {
    if (envBase.startsWith("http://") || envBase.startsWith("https://")) {
      return envBase.replace(/\/+$/, "");
    }
    return `https://${envBase.replace(/\/+$/, "")}`;
  }

  const host =
    req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const protocol = req.headers.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

export async function GET(req: Request) {
  try {
    if (!sql) {
      console.error("❌ 数据库连接不可用，无法完成 Google 登录");
      return NextResponse.json(
        { error: "Database connection not available. Please configure POSTGRES_URL." },
        { status: 503 }
      );
    }

    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const stateParam = url.searchParams.get("state");

    if (!code) {
      return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
    }

    let returnUrl = "/";
    if (stateParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(stateParam));
        if (parsed && typeof parsed.returnUrl === "string") {
          returnUrl = parsed.returnUrl || "/";
        }
      } catch (err) {
        console.warn("⚠️ 解析 Google OAuth state 失败:", err);
      }
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI ||
      `${getBaseUrl(req)}/api/auth/google/callback`;

    if (!clientId || !clientSecret) {
      console.error("❌ Google OAuth 环境变量未配置完备");
      return NextResponse.json(
        { error: "Google OAuth is not configured on the server" },
        { status: 500 }
      );
    }

    // 1. 使用授权码换取 access_token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errorBody = await tokenRes.text();
      console.error("❌ 交换 Google token 失败:", tokenRes.status, errorBody);
      return NextResponse.json(
        { error: "Failed to exchange Google OAuth token" },
        { status: 502 }
      );
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token as string | undefined;

    if (!accessToken) {
      console.error("❌ Google token 响应中缺少 access_token:", tokenData);
      return NextResponse.json(
        { error: "Google OAuth did not return an access token" },
        { status: 502 }
      );
    }

    // 2. 使用 access_token 获取用户信息
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userInfoRes.ok) {
      const errorBody = await userInfoRes.text();
      console.error("❌ 获取 Google 用户信息失败:", userInfoRes.status, errorBody);
      return NextResponse.json(
        { error: "Failed to fetch Google user info" },
        { status: 502 }
      );
    }

    const profile = await userInfoRes.json();

    const googleId = (profile.sub || profile.id) as string | undefined;
    const email = (profile.email || "").toLowerCase();
    const name =
      (profile.name as string | undefined) ||
      (profile.given_name as string | undefined) ||
      "";
    const picture = (profile.picture as string | undefined) || null;
    const emailVerified =
      (profile.email_verified as boolean | undefined) || true;

    if (!googleId || !email) {
      console.error("❌ Google 用户信息缺少必要字段:", profile);
      return NextResponse.json(
        { error: "Google user info is incomplete" },
        { status: 502 }
      );
    }

    // 3. 在数据库中查找或创建用户
    // 3.1 先按 provider_id 查找
    let rows = await sql`
      select id, email, name, role, account_tier
      from users
      where auth_provider = 'google' and provider_id = ${googleId}
      limit 1
    `;

    let user = rows[0] as
      | {
          id: string;
          email: string;
          name: string | null;
          role: string;
          account_tier: string;
        }
      | undefined;

    // 3.2 如果还没找到，按 email 查找并绑定 Google
    if (!user) {
      rows = await sql`
        select id, email, name, role, account_tier
        from users
        where email = ${email}
        limit 1
      `;
      user = rows[0];
    }

    if (user) {
      // 更新现有用户的 Google 相关字段
      await sql`
        update users
        set
          email = ${email},
          name = ${name || user.name},
          avatar_url = ${picture},
          auth_provider = 'google',
          provider_id = ${googleId},
          email_verified = ${emailVerified},
          updated_at = now()
        where id = ${user.id}
      `;
    } else {
      // 创建新用户
      const inserted = await sql`
        insert into users (
          email,
          email_verified,
          name,
          avatar_url,
          auth_provider,
          provider_id,
          role,
          account_tier
        )
        values (
          ${email},
          ${emailVerified},
          ${name},
          ${picture},
          'google',
          ${googleId},
          'user',
          'free'
        )
        returning id, email, name, role, account_tier
      `;
      user = inserted[0];
    }

    // 理论上上面的逻辑保证 user 一定存在，这里再做一次保护以通过类型检查
    if (!user) {
      console.error("❌ Google OAuth 回调中 user 仍为 undefined");
      return NextResponse.json(
        { error: "Failed to create or load user for Google OAuth" },
        { status: 500 }
      );
    }

    // 4. 生成会话并设置 cookie
    const token = signSession({
      sub: user.id,
      email: user.email,
      role: user.role,
      provider: "google",
    });

    const secure = process.env.NODE_ENV === "production";
    const baseUrl = getBaseUrl(req);
    const redirectTarget = new URL(returnUrl || "/", baseUrl);

    const res = NextResponse.redirect(redirectTarget.toString());
    res.headers.set("Set-Cookie", makeSessionCookie(token, secure));

    return res;
  } catch (err) {
    console.error("💥 Google OAuth 回调处理失败:", err);
    return NextResponse.json(
      { error: "Google OAuth callback failed", detail: String(err) },
      { status: 500 }
    );
  }
}

