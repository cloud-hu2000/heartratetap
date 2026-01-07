'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout, checkAuth } = useAuth();
  const router = useRouter();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleResendVerification = async () => {
    if (!user?.email) return;

    setResendLoading(true);
    setResendMessage(null);
    setResendError(null);

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResendMessage('Verification email sent successfully! Please check your inbox and click the verification link.');
        // Clear success message after 8 seconds
        setTimeout(() => setResendMessage(null), 8000);
      } else {
        setResendError(data.error || 'Failed to send verification email. Please try again.');
        // Clear error message after 6 seconds
        setTimeout(() => setResendError(null), 6000);
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setResendError('Network error. Please check your connection and try again.');
      setTimeout(() => setResendError(null), 6000);
    } finally {
      setResendLoading(false);
    }
  };

  const handleRefreshProfile = async () => {
    setRefreshing(true);
    try {
      await checkAuth();
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="frame">
        <div className="panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)] mx-auto"></div>
            <p className="mt-4" style={{ color: 'var(--muted)' }}>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="frame">
      {/* Header Section */}
      <section className="panel hero">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <p className="hero-sub">Personal Dashboard</p>
            <h1 className="hero-title">My Profile</h1>
            <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>
              Manage your account settings and preferences
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="pill"
            style={{
              background: '#dc3545',
              color: '#fff',
              borderColor: '#dc3545',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.background = '#c82333'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.background = '#dc3545'}
          >
            Logout
          </button>
        </div>
      </section>

      {/* Profile Information Cards */}
      <div className="canvas">
        {/* Account Information */}
        <section className="panel">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--accent)',
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.025em'
            }}>
              Account Information
            </h2>
            <p style={{ color: 'var(--muted)', margin: '0', fontSize: '0.95rem' }}>
              Your basic account details and verification status
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--ink)',
                letterSpacing: '0.01em'
              }}>
                Email Address
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '1rem', color: 'var(--ink)', fontWeight: '500' }}>
                  {user.email}
                </div>
                <button
                  onClick={handleRefreshProfile}
                  disabled={refreshing}
                  style={{
                    padding: '0.25rem 0.5rem',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    background: 'var(--card)',
                    color: 'var(--muted)',
                    fontSize: '0.75rem',
                    cursor: refreshing ? 'not-allowed' : 'pointer',
                    opacity: refreshing ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => !refreshing && ((e.target as HTMLElement).style.borderColor = 'var(--accent)')}
                  onMouseLeave={(e) => !refreshing && ((e.target as HTMLElement).style.borderColor = 'var(--line)')}
                >
                  {refreshing ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[var(--accent)]"></div>
                  ) : (
                    <svg style={{ width: '0.75rem', height: '0.75rem' }} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  )}
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
              {user.email_verified ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#16a34a',
                  fontWeight: '500'
                }}>
                  <svg style={{ width: '1rem', height: '1rem' }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Email verified
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#d97706',
                  fontWeight: '500'
                }}>
                  <svg style={{ width: '1rem', height: '1rem' }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Email not verified
                </div>
              )}
            </div>

            {user.name && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--ink)',
                  letterSpacing: '0.01em'
                }}>
                  Full Name
                </label>
                <div style={{ fontSize: '1rem', color: 'var(--ink)', fontWeight: '500' }}>
                  {user.name}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--ink)',
                letterSpacing: '0.01em'
              }}>
                Account Type
              </label>
              <div style={{
                fontSize: '1rem',
                color: 'var(--ink)',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
                {user.role}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--ink)',
                letterSpacing: '0.01em'
              }}>
                Member Since
              </label>
              <div style={{ fontSize: '1rem', color: 'var(--ink)', fontWeight: '500' }}>
                {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'N/A'}
              </div>
            </div>
          </div>
        </section>

        {/* Account Actions */}
        <section className="panel">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--accent)',
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.025em'
            }}>
              Account Actions
            </h2>
            <p style={{ color: 'var(--muted)', margin: '0', fontSize: '0.95rem' }}>
              Manage your account settings and security
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!user.email_verified && (
              <div style={{
                padding: '1rem',
                background: 'rgba(217, 119, 6, 0.05)',
                border: '1px solid rgba(217, 119, 6, 0.2)',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <svg style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    color: '#d97706',
                    flexShrink: '0',
                    marginTop: '0.125rem'
                  }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#92400e',
                      margin: '0 0 0.25rem 0'
                    }}>
                      Email Verification Required
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#a16207',
                      margin: '0 0 0.75rem 0',
                      lineHeight: '1.4'
                    }}>
                      Please verify your email address to access all features.
                    </p>

                    <button
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#92400e',
                        textDecoration: 'underline',
                        background: 'none',
                        border: 'none',
                        cursor: resendLoading ? 'not-allowed' : 'pointer',
                        padding: '0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: resendLoading ? 0.6 : 1
                      }}
                      onClick={handleResendVerification}
                      disabled={resendLoading}
                    >
                      {resendLoading && (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[#92400e]"></div>
                      )}
                      Resend verification email
                    </button>

                    {resendMessage && (
                      <div style={{
                        marginTop: '0.75rem',
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#16a34a',
                        fontWeight: '500'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <svg style={{ width: '1rem', height: '1rem', flexShrink: '0', marginTop: '0.125rem' }}
                               viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{resendMessage}</span>
                        </div>
                      </div>
                    )}

                    {resendError && (
                      <div style={{
                        marginTop: '0.75rem',
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#dc2626',
                        fontWeight: '500'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <svg style={{ width: '1rem', height: '1rem', flexShrink: '0', marginTop: '0.125rem' }}
                               viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span>{resendError}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              <button
                className="pill"
                onClick={() => alert('Change password feature coming soon!')}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: '1px solid var(--line)',
                  background: 'var(--card)',
                  color: 'var(--ink)'
                }}
              >
                Change Password
              </button>

              <button
                className="pill"
                onClick={() => alert('Update profile feature coming soon!')}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: '1px solid var(--line)',
                  background: 'var(--card)',
                  color: 'var(--ink)'
                }}
              >
                Update Profile
              </button>
            </div>

            <button
              className="pill"
              onClick={() => {
                if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  alert('Account deletion feature coming soon!');
                }
              }}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                border: '1px solid #dc3545',
                background: '#dc3545',
                color: '#fff'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = '#c82333';
                (e.target as HTMLElement).style.borderColor = '#c82333';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = '#dc3545';
                (e.target as HTMLElement).style.borderColor = '#dc3545';
              }}
            >
              Delete Account
            </button>
          </div>
        </section>

        {/* Usage Statistics */}
        <section className="panel">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--accent)',
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.025em'
            }}>
              Usage Statistics
            </h2>
            <p style={{ color: 'var(--muted)', margin: '0', fontSize: '0.95rem' }}>
              Track your heart rate monitoring activity
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--accent)',
                marginBottom: '0.5rem'
              }}>
                --
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--muted)',
                fontWeight: '500'
              }}>
                Heart Rate Readings
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#16a34a',
                marginBottom: '0.5rem'
              }}>
                --
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--muted)',
                fontWeight: '500'
              }}>
                Sessions This Month
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#7c3aed',
                marginBottom: '0.5rem'
              }}>
                --
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--muted)',
                fontWeight: '500'
              }}>
                Account Age (days)
              </div>
            </div>
          </div>

          <div style={{
            padding: '1rem',
            background: 'rgba(15, 140, 140, 0.03)',
            border: '1px solid rgba(15, 140, 140, 0.1)',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{
              margin: '0',
              fontSize: '0.875rem',
              color: 'var(--muted)',
              fontStyle: 'italic'
            }}>
              Statistics will be available once database integration is complete
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
