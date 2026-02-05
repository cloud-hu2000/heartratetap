'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 如果没有token，重定向到登录页面
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

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
    if (!formData.password) {
      setError('Password is required');
      setIsSubmitting(false);
      return;
    }

    // 验证密码长度
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsSubmitting(false);
      return;
    }

    // 验证密码匹配
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('🚀 ResetPasswordPage.handleSubmit: 开始重置密码');

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          password: formData.password,
        }),
      });

      console.log('📡 HTTP响应状态:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('📦 响应数据:', data);

        if (data.ok) {
          console.log('✅ 密码重置成功');
          setSuccess('Password reset successful! You are now logged in.');
          // 重定向到首页
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          console.warn('⚠️ 密码重置失败:', data.error);
          setError(data.error || 'Failed to reset password');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('💥 密码重置请求失败:', response.status, errorData);
        setError(errorData.error || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('💥 ResetPasswordPage.handleSubmit: 网络异常', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="reset-page">
        <div className="reset-container">
          <div className="reset-card">
            <div className="reset-form">
              <p className="reset-info">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-page">
      <div className="reset-container">
        {/* Header */}
        <header className="reset-header">
          <h1 className="reset-title">Reset your password</h1>
          <p className="reset-subtitle">Enter a new password for your account</p>
        </header>

        {/* Reset Form */}
        <main className="reset-main">
          <div className="reset-card">
            <form onSubmit={handleSubmit} className="reset-form">
              {/* Password Field */}
              <div className="form-field">
                <label htmlFor="password" className="form-label">
                  New password
                </label>
                <div className="form-input-container">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="form-input form-input-with-icon"
                    placeholder="Enter your new password"
                    disabled={isSubmitting}
                    autoComplete="new-password"
                    minLength={8}
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

              {/* Confirm Password Field */}
              <div className="form-field">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm new password
                </label>
                <div className="form-input-container">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="form-input form-input-with-icon"
                    placeholder="Confirm your new password"
                    disabled={isSubmitting}
                    autoComplete="new-password"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
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
                      <div className="form-message-title">Reset failed</div>
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="form-button form-button-primary"
              >
                {isSubmitting ? (
                  <>
                    <div className="form-button-spinner"></div>
                    Resetting password...
                  </>
                ) : (
                  'Reset password'
                )}
              </button>
            </form>
          </div>

          {/* Back to Login */}
          <div className="reset-footer">
            <div className="signin-section">
              <p className="signin-text">
                Remember your password?{' '}
                <Link
                  href="/login"
                  className="signin-link"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="reset-page">
        <div className="reset-container">
          <div className="reset-card">
            <div className="reset-form">
              <p className="reset-info">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <ResetPasswordPageContent />
    </Suspense>
  );
}




