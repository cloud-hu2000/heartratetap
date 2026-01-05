import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import crypto from "crypto";

// 会员等级定义 (服务器端版本，避免客户端导入问题)
const MEMBERSHIP_TIERS = {
  free: {
    name: 'EN: Free | ES: Gratis',
    price: 0,
    currency: 'USD',
    features: [
      'EN: Basic heart rate measurement | ES: Medición básica de frecuencia cardíaca',
      'EN: Real-time BPM display | ES: Visualización BPM en tiempo real',
      'EN: Local history (20 readings) | ES: Historial local (20 lecturas)',
      'EN: Basic health advice | ES: Consejos básicos de salud',
    ],
  },
  basic: {
    name: 'EN: Professional | ES: Profesional',
    price: 1.99,
    currency: 'USD',
    interval: 'month',
    features: [
      'EN: All free features | ES: Todas las funciones gratuitas',
      'EN: Data export (CSV) | ES: Exportación de datos (CSV)',
      'EN: History trend analysis | ES: Análisis de tendencias históricas',
      'EN: Advanced health insights | ES: Perspectivas avanzadas de salud',
      'EN: Ad-free experience | ES: Experiencia sin anuncios',
    ],
  },
  pro: {
    name: 'EN: Premium | ES: Premium',
    price: 6.99,
    currency: 'USD',
    interval: 'month',
    features: [
      'EN: All professional features | ES: Todas las funciones profesionales',
      'EN: Cloud data sync | ES: Sincronización de datos en la nube',
      'EN: Personalized health reports | ES: Informes de salud personalizados',
      'EN: Workout plan recommendations | ES: Recomendaciones de planes de entrenamiento',
      'EN: Health goal tracking | ES: Seguimiento de objetivos de salud',
      'EN: Advanced data visualization | ES: Visualización avanzada de datos',
      'EN: Priority customer support | ES: Soporte al cliente prioritario',
    ],
  },
  enterprise: {
    name: 'EN: Enterprise | ES: Empresarial',
    price: 29.99,
    currency: 'USD',
    interval: 'month',
    features: [
      'EN: All premium features | ES: Todas las funciones premium',
      'EN: Team management | ES: Gestión de equipos',
      'EN: Bulk data export | ES: Exportación masiva de datos',
      'EN: API access | ES: Acceso a API',
      'EN: Custom reports | ES: Informes personalizados',
      'EN: Dedicated account manager | ES: Gerente de cuenta dedicado',
      'EN: Enterprise-grade security | ES: Seguridad de nivel empresarial',
    ],
  },
} as const;

type MembershipTier = keyof typeof MEMBERSHIP_TIERS;

import { stripe } from "@/lib/stripe";

// This is a placeholder implementation
// In production, this would integrate with Stripe, PayPal, or other payment processors
export async function POST(req: Request) {
  try {
    console.log('🚀 API /api/billing/create-checkout-session: 创建结账会话');

    // Check if database is available
    if (!sql) {
      console.error('❌ 数据库连接不可用');
      return NextResponse.json({
        error: "Database connection not available. Please configure POSTGRES_URL."
      }, { status: 503 });
    }

    // 验证用户登录状态
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('hrt_session')?.value;
    console.log('🔍 Cookie检查:', {
      hasCookie: !!sessionCookie,
      cookieLength: sessionCookie?.length || 0,
      allCookies: cookieStore.getAll().map(c => ({ name: c.name, hasValue: !!c.value }))
    });

    if (!sessionCookie) {
      console.error('❌ 用户未登录 - 没有找到session cookie');
      return NextResponse.json({
        error: "Authentication required",
        debug: "No session cookie found. Please log in first."
      }, { status: 401 });
    }

    const authSession = verifySession(sessionCookie);
    console.log('🔍 Session验证结果:', {
      hasSession: !!authSession,
      sub: authSession?.sub,
      email: authSession?.email,
      role: authSession?.role,
      sessionKeys: authSession ? Object.keys(authSession) : null
    });

    if (!authSession || !authSession.sub) {
      console.error('❌ 无效的会话 - session验证失败');
      return NextResponse.json({
        error: "Invalid session",
        debug: "Session verification failed. Please log in again."
      }, { status: 401 });
    }
    // authSession 已验证为存在且包含 sub，提取为局部常量以便 TypeScript 进行类型收窄
    const userId = authSession.sub;

    const { tier, successUrl, cancelUrl } = await req.json();
    console.log('📦 请求参数:', { tier, successUrl, cancelUrl, userId: authSession.sub });

    // Validate tier
    if (!tier || !MEMBERSHIP_TIERS[tier as MembershipTier]) {
      console.error('❌ 无效的会员等级:', tier);
      return NextResponse.json({ error: "Invalid membership tier" }, { status: 400 });
    }

    const plan = MEMBERSHIP_TIERS[tier as MembershipTier];
    console.log('✅ 会员计划:', plan);
    // 解析会员等级名称 (从 "EN: xxx | ES: yyy" 格式中提取英文名称)
    const planNameMatch = plan.name.match(/EN:\s*([^|]+)/);
    const planNameEn = planNameMatch ? planNameMatch[1].trim() : plan.name.split('|')[0].trim();

    // 生成万里汇支付请求ID (格式: user_{userId}_{tier}_{timestamp})
    const timestamp = Date.now();
    const payToRequestId = `user_${userId}_${tier}_${timestamp}`;

    // 构建万里汇通知URL
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const paymentNotifyUrl = `${baseUrl}/api/billing/notify-payment`;

    console.log('📋 支付请求信息:', { payToRequestId, paymentNotifyUrl });

    // 检查万里汇API配置（开发环境跳过）
    const isProduction = process.env.NODE_ENV === 'production';
    const worldFirstClientId = process.env.WORLDFIRST_CLIENT_ID;
    const worldFirstPrivateKey = process.env.WORLDFIRST_PRIVATE_KEY;
    if (isProduction && (!worldFirstClientId || !worldFirstPrivateKey)) {
      console.error('❌ 万里汇API配置缺失（生产环境必需）');
      return NextResponse.json({
        error: "WorldFirst API configuration missing"
      }, { status: 500 });
    }

    // 使用 Stripe 创建 Checkout 会话
    if (!process.env.STRIPE_SECRET_KEY || !stripe) {
      console.error('❌ Stripe 未配置 (缺少 STRIPE_SECRET_KEY)');
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    console.log('💳 使用 Stripe 创建 Checkout 会话');
    const successRedirect = successUrl || `${baseUrl}/checkout/success?tier=${tier}&requestId=${payToRequestId}`;
    const cancelRedirect = cancelUrl || `${baseUrl}/pricing?canceled=true`;
    const unitAmount = Math.round(plan.price * 100);

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: plan.currency.toLowerCase(),
              product_data: {
                name: `HeartRateTap ${planNameEn} Membership`,
              },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successRedirect,
        cancel_url: cancelRedirect,
          metadata: {
          userId,
          tier,
          payToRequestId,
        },
      });

      console.log('✅ Stripe Checkout 会话创建成功:', { sessionId: session.id, url: session.url });
      return NextResponse.json({
        url: session.url,
        sessionId: session.id,
      });
    } catch (stripeError) {
      console.error('💥 Stripe 创建会话失败:', stripeError);
      return NextResponse.json({
        error: "Failed to create Stripe checkout session",
        details: String(stripeError)
      }, { status: 500 });
    }

    

    // 构建万里汇支付请求数据
    const worldFirstRequest = {
      orderGroup: {
        orderBuyer: {
          referenceBuyerId: authSession.sub
        },
        orderGroupDescription: `HeartRateTap ${planNameEn} Membership`,
        orderGroupId: payToRequestId,
        orders: [
          {
            orderTotalAmount: {
              currency: plan.currency,
              value: (plan.price * 100).toString() // 万里汇期望以最小货币单位（如分）表示
            },
            orderDescription: `HeartRateTap ${planNameEn} Membership - ${plan.price} ${plan.currency}`,
            referenceOrderId: payToRequestId,
            transactionTime: new Date().toISOString()
          }
        ]
      },
      payToDetails: [
        {
          payToRequestId,
          payToAmount: {
            currency: plan.currency,
            value: (plan.price * 100).toString()
          },
          payToMethod: {
            paymentMethodType: "BALANCE",
            paymentMethodDataType: "PAYMENT_ACCOUNT_NO",
            paymentMethodData: "",
            customerId: authSession.sub
          },
          paymentNotifyUrl,
          referenceOrderId: payToRequestId
        }
      ],
      paymentRedirectUrl: successUrl || `${baseUrl}/checkout/success?tier=${tier}&requestId=${payToRequestId}`,
      industryProductCode: "ONLINE_DIRECT_PAY"
    };

    try {
      // 调用万里汇API
      const worldFirstResponse = await createWorldFirstPayment(worldFirstRequest);

      console.log('✅ 万里汇API调用成功:', worldFirstResponse);

      // 检查API调用结果
      if (worldFirstResponse.result.resultStatus !== 'S') {
        console.error('❌ 万里汇API调用失败:', worldFirstResponse.result);
        return NextResponse.json({
          error: "Failed to create payment with WorldFirst",
          details: worldFirstResponse.result
        }, { status: 400 });
      }

      // 解析跳转URL
      let paymentUrl = '';
      try {
        const actionForm = JSON.parse(worldFirstResponse.actionForm);
        if (actionForm.actionFormType === 'RedirectActionForm') {
          paymentUrl = actionForm.redirectUrl;
        }
      } catch (error) {
        console.error('❌ 解析actionForm失败:', error);
        return NextResponse.json({
          error: "Failed to parse payment URL from WorldFirst response"
        }, { status: 500 });
      }

      if (!paymentUrl) {
        console.error('❌ 未获取到支付URL');
        return NextResponse.json({
          error: "No payment URL received from WorldFirst"
        }, { status: 500 });
      }

      console.log('✅ 支付会话创建成功，跳转URL:', paymentUrl);

      return NextResponse.json({
        url: paymentUrl,
        sessionId: payToRequestId,
        worldfirstData: {
          payToRequestId,
          paymentNotifyUrl,
          payToId: worldFirstResponse.payToSummaries?.[0]?.payToId,
          paymentAmount: {
            currency: plan.currency,
            value: (plan.price * 100).toString()
          }
        }
      });

    } catch (error) {
      console.error('💥 调用万里汇API失败:', error);
      return NextResponse.json({
        error: "Failed to create payment session",
        details: String(error)
      }, { status: 500 });
    }

  } catch (error) {
    console.error('💥 API /api/billing/create-checkout-session: 服务器错误', error);
    return NextResponse.json({
      error: "Failed to create checkout session",
      details: String(error)
    }, { status: 500 });
  }
}

// 调试端点：检查当前用户的登录状态
export async function GET(req: Request) {
  try {
    console.log('🔍 调试：检查用户登录状态');

    // 检查数据库连接
    if (!sql) {
      return NextResponse.json({
        error: "Database not connected",
        debug: "Check POSTGRES_URL environment variable"
      }, { status: 503 });
    }

    // 检查cookies
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('hrt_session')?.value;
    const allCookies = cookieStore.getAll().map(c => ({ name: c.name, hasValue: !!c.value }));

    console.log('🍪 Cookie信息:', {
      hasSessionCookie: !!sessionCookie,
      cookieLength: sessionCookie?.length || 0,
      allCookies
    });

    if (!sessionCookie) {
      return NextResponse.json({
        authenticated: false,
        error: "No session cookie found",
        debug: "User needs to log in first",
        cookies: allCookies
      });
    }

    // 验证session
    const session = verifySession(sessionCookie);
    console.log('🔐 Session验证:', {
      hasSession: !!session,
      sessionKeys: session ? Object.keys(session) : null,
      sub: session?.sub,
      email: session?.email
    });

    if (!session || !session.sub) {
      return NextResponse.json({
        authenticated: false,
        error: "Invalid session token",
        debug: "Session verification failed",
        sessionData: session
      });
    }

    // 检查用户是否存在
    const rows = await sql`select id, email, name, account_tier from users where id = ${session.sub} limit 1`;
    const user = rows[0];

    console.log('👤 用户信息:', {
      found: !!user,
      userId: user?.id,
      email: user?.email,
      tier: user?.account_tier
    });

    if (!user) {
      return NextResponse.json({
        authenticated: false,
        error: "User not found in database",
        debug: "Session valid but user doesn't exist",
        sessionData: { sub: session.sub, email: session.email }
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        account_tier: user.account_tier
      },
      debug: "User is properly authenticated"
    });

  } catch (error) {
    console.error('💥 调试端点错误:', error);
    return NextResponse.json({
      error: "Debug endpoint error",
      details: String(error)
    }, { status: 500 });
  }
}
