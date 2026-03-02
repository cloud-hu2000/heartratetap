'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

function LoginPageContent() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // 如果已登录，重定向到首页
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const returnUrl = searchParams.get('returnUrl') || '/';
      router.push(returnUrl);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // 清除错误信息
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    // 验证必填字段
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setIsSubmitting(false);
      return;
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // 登录
    const result = await login(formData.email, formData.password);

    if (result.success) {
      setSuccess('Login successful! Redirecting...');
      // 重定向由Context处理
    } else {
      // 详细的调试信息
      console.error('❌ LoginPage.handleSubmit: 登录失败', {
        email: formData.email,
        password: formData.password ? '***' : 'missing',
        error: result.error,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        formData: { ...formData, password: '***' },
        result: result
      });

      // 提供更详细的用户友好的错误信息
      let errorMessage = result.error || 'Login failed';

      // 如果是网络错误或未知错误，提供更多指导
      if (!result.error || result.error === 'Network error') {
        errorMessage = 'Unable to connect to server. Please check your internet connection and try again.';
      } else if (result.error === 'Login failed') {
        errorMessage = 'Login failed. Please check your email and password, or try again later.';
      }

      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }

    setIsResettingPassword(true);
    setError('');
    setSuccess('');

    try {
      console.log('🚀 handleForgotPassword: 发送密码重置邮件');
      console.log('📤 请求邮箱:', formData.email);

      const response = await fetch('/api/auth/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      console.log('📡 HTTP响应状态:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('📦 响应数据:', data);

        if (data.ok) {
          console.log('✅ 密码重置邮件发送成功');
          setResetEmailSent(true);
          setSuccess(`Password reset email sent to ${formData.email}. Please check your inbox.`);
        } else {
          console.warn('⚠️ 密码重置邮件发送失败:', data.error);
          setError(data.error || 'Failed to send reset email');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('💥 密码重置请求失败:', response.status, errorData);
        setError(errorData.error || 'Failed to send reset email. Please try again.');
      }
    } catch (error) {
      console.error('💥 handleForgotPassword: 网络异常', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsResettingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--accent)' }}></div>
          <p className="mt-4" style={{ color: 'var(--muted)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Header */}
        <header className="login-header">
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your HeartRateTap account</p>
        </header>

        {/* Login Form */}
        <main className="login-main">
          <div className="login-card">
            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Field */}
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  autoComplete="email"
                />
              </div>

              {/* Password Field */}
              <div className="form-field">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="form-input-container">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="form-input form-input-with-icon"
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="password-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="password-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="form-message form-message-error">
                  <div className="form-message-content">
                    <svg className="form-message-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="form-message-title">Login failed</div>
                      <div className="form-message-text">{error}</div>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="form-message form-message-success">
                  <div className="form-message-content">
                    <svg className="form-message-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="form-message-text">{success}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms */}
              <div className="form-terms">
                By clicking &quot;Sign in&quot;, you agree to the Terms of Service.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.email || !formData.password}
                className="form-button form-button-primary"
              >
                {isSubmitting ? (
                  <>
                    <div className="form-button-spinner"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>

              {/* Forgot Password */}
              <div className="form-actions">
                <button
                  type="button"
                  className="form-link-button"
                  onClick={handleForgotPassword}
                  disabled={isResettingPassword}
                >
                  {isResettingPassword ? 'Sending reset email...' : 'Forgot your password?'}
                </button>
              </div>

              {/* Divider */}
              <div className="form-divider">
                <span className="form-divider-text">or</span>
              </div>

              {/* Social Login */}
              <div className="social-login">
                <button
                  type="button"
                  className="social-button social-button-google"
                  onClick={() => {
                    // 跳转到后端 Google OAuth 登录入口
                    const params = new URLSearchParams();
                    const returnUrl = searchParams.get('returnUrl');
                    if (returnUrl) {
                      params.set('returnUrl', returnUrl);
                    }
                    const url = params.toString()
                      ? `/api/auth/google?${params.toString()}`
                      : '/api/auth/google';
                    window.location.href = url;
                  }}
                >
                  <svg className="social-button-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  className="social-button social-button-github"
                  disabled
                  onClick={() => alert('GitHub login coming soon!')}
                >
                  <svg className="social-button-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>
            </form>

          </div>

          {/* Sign Up Section */}
          <div className="login-footer">
            <div className="signup-section">
              <p className="signup-text">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="signup-link"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--accent)' }}></div>
          <p className="mt-4" style={{ color: 'var(--muted)' }}>Loading...</p>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
