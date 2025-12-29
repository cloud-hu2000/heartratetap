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
      setError(result.error || 'Login failed');
      setIsSubmitting(false);
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
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="frame">
        {/* Header */}
        <header className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-4xl mb-2 block">❤️</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            Sign in to your HeartRateTap account
          </p>
        </header>

        {/* Login Form */}
        <main className="flex justify-center">
          <div className="panel" style={{ maxWidth: '400px', width: '100%' }}>
            <form onSubmit={handleSubmit} className="p-8">
              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--ink)' }}>
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    background: 'var(--card)',
                    color: 'var(--ink)'
                  }}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--ink)' }}>
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    background: 'var(--card)',
                    color: 'var(--ink)'
                  }}
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                  autoComplete="current-password"
                />
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="mb-6 p-4 rounded-xl" style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#ef4444'
                }}>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 rounded-xl" style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  color: '#22c55e'
                }}>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {success}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.email || !formData.password}
                className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                style={{
                  backgroundColor: 'var(--accent)',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = 'var(--ink)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = 'var(--accent)';
                  }
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Additional Options */}
              <div className="space-y-4">
                {/* Forgot Password */}
                <div className="text-center">
                  <button
                    className="text-sm hover:underline transition-colors"
                    style={{ color: 'var(--accent)' }}
                    onClick={() => {
                      alert('Forgot password feature coming soon!');
                    }}
                  >
                    Forgot your password?
                  </button>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="border-t" style={{ borderColor: 'var(--line)' }}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2" style={{ backgroundColor: 'var(--card)', color: 'var(--muted)' }}>or</span>
                  </div>
                </div>

                {/* Social Login Options (Future Enhancement) */}
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-3 px-4 border rounded-xl hover:bg-opacity-50 transition-colors disabled:opacity-50"
                    style={{
                      borderColor: 'var(--line)',
                      backgroundColor: 'var(--card)',
                      color: 'var(--ink)'
                    }}
                    disabled
                    onClick={() => alert('Google login coming soon!')}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-3 px-4 border rounded-xl hover:bg-opacity-50 transition-colors disabled:opacity-50"
                    style={{
                      borderColor: 'var(--line)',
                      backgroundColor: 'var(--card)',
                      color: 'var(--ink)'
                    }}
                    disabled
                    onClick={() => alert('GitHub login coming soon!')}
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Continue with GitHub
                  </button>
                </div>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="px-8 pb-8 text-center">
              <p style={{ color: 'var(--muted)' }}>
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="font-semibold hover:underline transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </main>

        {/* Back to Home */}
        <footer className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm hover:underline transition-colors"
            style={{ color: 'var(--muted)' }}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </footer>
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
