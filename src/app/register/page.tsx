'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

function RegisterPageContent() {
  const { register, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 如果已登录，重定向到首页
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const returnUrl = searchParams.get('returnUrl') || '/';
      router.push(returnUrl);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  // 密码强度检查
  const checkPasswordStrength = (password: string) => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score++;
    else feedback.push('At least 8 characters');

    if (/[A-Z]/.test(password)) score++;
    else feedback.push('One uppercase letter');

    if (/[a-z]/.test(password)) score++;
    else feedback.push('One lowercase letter');

    if (/\d/.test(password)) score++;
    else feedback.push('One number');

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
    else feedback.push('One special character');

    setPasswordStrength({ score, feedback });
    return score >= 4; // 需要至少4个条件满足
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // 清除错误信息
    if (error) setError('');
    if (success) setSuccess('');

    // 检查密码强度
    if (field === 'password') {
      checkPasswordStrength(value);
    }
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

    // 验证密码强度
    if (!checkPasswordStrength(formData.password)) {
      setError('Password does not meet requirements');
      setIsSubmitting(false);
      return;
    }

    // 验证密码确认
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // 注册
    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name || undefined,
    });

    if (result.success) {
      setSuccess('Registration successful! Welcome to HeartRateTap!');
      // 重定向由Context处理
    } else {
      setError(result.error || 'Registration failed');
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    const { score } = passwordStrength;
    if (score < 2) return '#ef4444'; // red
    if (score < 4) return '#f59e0b'; // yellow
    return '#22c55e'; // green
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
            Create Account
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            Join HeartRateTap to track your heart health
          </p>
        </header>

        {/* Register Form */}
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

              {/* Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--ink)' }}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    background: 'var(--card)',
                    color: 'var(--ink)'
                  }}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                  autoComplete="name"
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
                  placeholder="Create a strong password"
                  disabled={isSubmitting}
                  autoComplete="new-password"
                />

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>Password Strength:</span>
                      <span className="text-xs font-medium" style={{ color: getPasswordStrengthColor() }}>
                        {passwordStrength.score < 2 ? 'Weak' :
                         passwordStrength.score < 4 ? 'Fair' : 'Strong'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2" style={{ backgroundColor: 'var(--line)' }}>
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      ></div>
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <ul className="mt-2 text-xs space-y-1">
                        {passwordStrength.feedback.map((item, index) => (
                          <li key={index} className="flex items-center" style={{ color: 'var(--muted)' }}>
                            <span style={{ color: '#ef4444' }} className="mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: 'var(--ink)' }}>
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    background: 'var(--card)',
                    color: 'var(--ink)'
                  }}
                  placeholder="Confirm your password"
                  disabled={isSubmitting}
                  autoComplete="new-password"
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-2 text-xs" style={{ color: '#ef4444' }}>Passwords do not match</p>
                )}
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
                disabled={isSubmitting || !formData.email || !formData.password || !formData.confirmPassword}
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
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="px-8 pb-8 text-center">
              <p style={{ color: 'var(--muted)' }}>
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold hover:underline transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  Sign in
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

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--accent)' }}></div>
          <p className="mt-4" style={{ color: 'var(--muted)' }}>Loading...</p>
        </div>
      </div>
    }>
      <RegisterPageContent />
    </Suspense>
  );
}
