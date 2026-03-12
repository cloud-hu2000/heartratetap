'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// 用户类型定义
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  account_tier: 'free' | 'pro' | 'premium' | 'enterprise';
  email_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

// 会员等级定义
export const MEMBERSHIP_TIERS = {
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
  pro: {
    name: 'EN: Professional | ES: Profesional',
    price: 1.99,
    currency: 'USD',
    features: [
      'EN: All free features | ES: Todas las funciones gratuitas',
      'EN: Data export (CSV) | ES: Exportación de datos (CSV)',
      'EN: History trend analysis | ES: Análisis de tendencias históricas',
      'EN: Advanced health insights | ES: Perspectivas avanzadas de salud',
      'EN: Ad-free experience | ES: Experiencia sin anuncios',
      'EN: Lifetime access | ES: Acceso de por vida',
    ],
  },
  premium: {
    name: 'EN: Premium | ES: Premium',
    price: 6.99,
    currency: 'USD',
    features: [
      'EN: All professional features | ES: Todas las funciones profesionales',
      'EN: Cloud data sync | ES: Sincronización de datos en la nube',
      'EN: Personalized health reports | ES: Informes de salud personalizados',
      'EN: Workout plan recommendations | ES: Recomendaciones de planes de entrenamiento',
      'EN: Health goal tracking | ES: Seguimiento de objetivos de salud',
      'EN: Advanced data visualization | ES: Visualización avanzada de datos',
      'EN: Priority customer support | ES: Soporte al cliente prioritario',
      'EN: Lifetime access | ES: Acceso de por vida',
    ],
  },
  enterprise: {
    name: 'EN: Enterprise | ES: Empresarial',
    price: 29.99,
    currency: 'USD',
    features: [
      'EN: All premium features | ES: Todas las funciones premium',
      'EN: Team management | ES: Gestión de equipos',
      'EN: Bulk data export | ES: Exportación masiva de datos',
      'EN: API access | ES: Acceso a API',
      'EN: Custom reports | ES: Informes personalizados',
      'EN: Dedicated account manager | ES: Gerente de cuenta dedicado',
      'EN: Enterprise-grade security | ES: Seguridad de nivel empresarial',
      'EN: Lifetime access | ES: Acceso de por vida',
    ],
  },
} as const;

export type MembershipTier = keyof typeof MEMBERSHIP_TIERS;

// 认证状态类型
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Context类型定义
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  hasPermission: (feature: string) => boolean;
  upgradeMembership: (tier: MembershipTier) => Promise<{ success: boolean; error?: string; paymentUrl?: string }>;
}

// 创建Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider组件
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // 检查认证状态
  const checkAuth = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // 添加时间戳参数确保每次都获取最新数据
      const response = await fetch(`/api/auth/session?t=${Date.now()}`, { 
        credentials: 'include', 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await response.json();

      if (data.user) {
        setAuthState({
          user: data.user,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Failed to check auth status:', error);
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  // 登录函数
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('🚀 AuthContext.login: 开始登录请求');
      console.log('📤 登录参数:', { email, password: '***' }); // 隐藏密码

      setAuthState(prev => ({ ...prev, isLoading: true }));

      const apiUrl = '/api/auth/login';
      console.log('🌐 请求URL:', apiUrl);

      const requestData = { email, password };
      console.log('📤 请求体:', { email, password: '***' });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('📡 HTTP响应状态:', response.status, response.statusText);
      console.log('📡 响应头:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('📦 响应数据:', data);

      if (data.tokens) {
        console.log('✅ 登录成功，获取到tokens');
        console.log('🔑 Tokens信息:', {
          accessToken: data.tokens.accessToken ? 'present' : 'missing',
          refreshToken: data.tokens.refreshToken ? 'present' : 'missing',
        });

        // 登录成功，重新检查认证状态
        console.log('🔍 重新检查认证状态...');
        await checkAuth();

        // 重定向到首页
        console.log('🔄 重定向到首页');
        router.push('/');
        return { success: true };
      } else {
        console.warn('⚠️ 登录失败：', data.error || 'Unknown error');
        console.warn('⚠️ 响应数据详情:', data);

        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('💥 AuthContext.login: 网络请求异常', error);
      console.error('💥 错误详情:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Network error' };
    }
  };

  // 注册函数
  const register = async (userData: {
    email: string;
    password: string;
    name?: string;
  }): Promise<{ success: boolean; error?: string; needsVerification?: boolean }> => {
    try {
      console.log('🚀 AuthContext.register: 开始注册请求');
      console.log('📤 请求数据:', { ...userData, password: '***' }); // 隐藏密码

      setAuthState(prev => ({ ...prev, isLoading: true }));

      const apiUrl = '/api/auth/register';
      console.log('🌐 请求URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('📡 HTTP响应状态:', response.status, response.statusText);
      console.log('📡 响应头:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('📦 响应数据:', data);

      // 如果后端返回 verificationSent，说明邮件已发送，需用户点击邮件完成验证
      if (data.verificationSent) {
        console.log('📨 注册已收到：验证邮件已发送，等待用户验证');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: true, needsVerification: true };
      }

      // 兼容老逻辑：如果直接返回 tokens 则认为已直接登录/注册成功
      if (data.tokens) {
        console.log('✅ 注册成功，获取到tokens');
        // 注册成功，重新检查认证状态
        await checkAuth();
        // 重定向到首页
        console.log('🔄 重定向到首页');
        router.push('/');
        return { success: true };
      }

      console.warn('⚠️ 注册未成功：', data.error || 'Unknown');
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: data.error || 'Registration failed' };
    } catch (error) {
      console.error('💥 AuthContext.register: 网络请求异常', error);
      console.error('💥 错误详情:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Network error' };
    }
  };

  // 登出函数
  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      // 无论API调用结果如何，都清除本地状态
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      // 即使API调用失败，也要清除本地状态
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  // 初始化时检查认证状态
  useEffect(() => {
    checkAuth();
  }, []);

  // 当页面变为可见时（用户切换回标签页），刷新用户状态
  // 这样可以确保如果数据库中的用户信息被更改，前端状态会及时更新
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && authState.isAuthenticated) {
        // 页面变为可见且用户已登录时，刷新用户状态
        checkAuth().catch(err => console.warn('Failed to refresh auth on visibility change:', err));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [authState.isAuthenticated, checkAuth]);

  // 权限检查函数
  const hasPermission = (feature: string): boolean => {
    if (!authState.user) return false;

    const tier = authState.user.account_tier;

    // 功能权限映射
    const featurePermissions: Record<string, MembershipTier[]> = {
      // 免费功能
      'basic_measurement': ['free', 'pro', 'premium', 'enterprise'],
      'local_history': ['free', 'pro', 'premium', 'enterprise'],
      'basic_analysis': ['free', 'pro', 'premium', 'enterprise'],

      // 专业功能 ($1.99)
      'export_data': ['pro', 'premium', 'enterprise'],
      'advanced_analysis': ['pro', 'premium', 'enterprise'],
      'trend_analysis': ['pro', 'premium', 'enterprise'],

      // 高级功能 ($6.99)
      'cloud_sync': ['premium', 'enterprise'],
      'personalized_reports': ['premium', 'enterprise'],
      'workout_plans': ['premium', 'enterprise'],
      'health_goals': ['premium', 'enterprise'],
      'advanced_visualization': ['premium', 'enterprise'],
      // 企业功能 ($29.99)
      'team_management': ['enterprise'],
      'api_access': ['enterprise'],
      'custom_reports': ['enterprise'],
      'priority_support': ['enterprise'],
    };

    const allowedTiers = featurePermissions[feature];
    return allowedTiers ? allowedTiers.includes(tier) : false;
  };

  // 会员升级函数
  const upgradeMembership = async (tier: MembershipTier): Promise<{ success: boolean; error?: string; paymentUrl?: string }> => {
    try {
      console.log('🚀 upgradeMembership: 开始会员升级', { tier });
      console.log('🔍 当前用户信息:', { userId: authState.user?.id, userTier: authState.user?.account_tier });

      const response = await fetch('/api/billing/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 包含cookies以进行身份验证
        body: JSON.stringify({
          tier,
          successUrl: `${window.location.origin}/profile?upgrade=success`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      });

      console.log('📡 API响应状态:', response.status, response.statusText);
      console.log('📡 响应头:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        console.log('✅ 升级会话创建成功:', data);
        return { success: true, paymentUrl: data.url };
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ 升级会话创建失败:', errorData);
        return { success: false, error: errorData.error || errorData.debug || 'Failed to create checkout session' };
      }
    } catch (error) {
      console.error('💥 upgradeMembership: 网络异常', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    checkAuth,
    hasPermission,
    upgradeMembership,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 使用认证Context的hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 便捷的认证状态hooks
export function useUser(): User | null {
  const { user } = useAuth();
  return user;
}

export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

export function useIsLoading(): boolean {
  const { isLoading } = useAuth();
  return isLoading;
}
