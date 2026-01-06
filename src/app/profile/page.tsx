'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MEMBERSHIP_TIERS } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, upgradeMembership, checkAuth, updateUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // 监听用户状态变化
  useEffect(() => {
    console.log('🔄 ProfilePage: user状态发生变化');
    console.log('👤 ProfilePage: 当前用户信息:', {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      account_tier: user?.account_tier
    });
  }, [user]);

  // 添加调试日志
  console.log('🔍 ProfilePage渲染:', {
    isLoading,
    isAuthenticated,
    user: user ? { id: user.id, email: user.email, name: user.name } : null
  });

  const openEditModal = () => {
    console.log('🔓 ProfilePage.openEditModal: 打开编辑模态框');
    console.log('👤 当前用户信息:', user);
    setEditName(user?.name || '');
    setIsEditModalOpen(true);
    setUpdateError('');
  };


  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditName('');
    setUpdateError('');
  };

  const handleUpdateProfile = async () => {
    console.log('🚀 ProfilePage.handleUpdateProfile: 开始更新profile');
    console.log('📝 当前editName值:', editName);
    console.log('👤 当前用户信息:', { user: user, isAuthenticated });

    if (!editName.trim()) {
      console.log('❌ ProfilePage.handleUpdateProfile: 名称为空，设置错误');
      setUpdateError('Name is required');
      return;
    }

    console.log('✅ ProfilePage.handleUpdateProfile: 前端验证通过，开始API调用');
    setIsUpdating(true);
    setUpdateError('');

    try {
      console.log('🌐 ProfilePage.handleUpdateProfile: 发送API请求');
      console.log('📤 请求数据:', { name: editName.trim() });
      console.log('🌐 请求URL:', window.location.origin + '/api/auth/update-profile');
      console.log('🍪 Credentials设置为include');

      const requestStartTime = Date.now();
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name: editName.trim() }),
      });
      const requestDuration = Date.now() - requestStartTime;

      console.log('📡 ProfilePage.handleUpdateProfile: 收到响应');
      console.log('📡 HTTP状态码:', response.status, response.statusText);
      console.log('⏱️ 请求耗时:', requestDuration + 'ms');
      console.log('📡 响应头:', Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log('📄 ProfilePage.handleUpdateProfile: 原始响应文本:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('📦 ProfilePage.handleUpdateProfile: 解析后的响应数据:', data);
      } catch (parseError) {
        console.error('❌ ProfilePage.handleUpdateProfile: 响应解析失败:', parseError);
        console.log('📄 原始响应内容:', responseText);
        throw new Error('Invalid response format');
      }

      if (data.success) {
        console.log('✅ ProfilePage.handleUpdateProfile: 更新成功');
        console.log('👤 ProfilePage.handleUpdateProfile: API返回的用户数据:', data.user);

        // 直接使用API返回的用户数据更新AuthContext状态
        console.log('🔄 ProfilePage.handleUpdateProfile: 直接更新AuthContext用户状态');
        updateUser(data.user);

        // 立即关闭模态框，不需要等待异步操作
        console.log('🔄 ProfilePage.handleUpdateProfile: 关闭编辑模态框');
        closeEditModal();
      } else {
        console.log('❌ ProfilePage.handleUpdateProfile: API返回错误:', data.error);
        setUpdateError(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('💥 ProfilePage.handleUpdateProfile: 网络异常', error);
      console.error('💥 错误详情:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      setUpdateError('Network error. Please try again.');
    } finally {
      console.log('🔄 ProfilePage.handleUpdateProfile: 清理加载状态');
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="profile-error">
        <div className="error-icon">🔒</div>
        <h2>Please sign in to view your profile</h2>
        <p>You need to be logged in to access this page.</p>
      </div>
    );
  }

  const currentTier = MEMBERSHIP_TIERS[user.account_tier];
  const userInitials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  const handleUpgrade = async (tier: keyof typeof MEMBERSHIP_TIERS) => {
    const result = await upgradeMembership(tier);
    if (result.success && result.paymentUrl) {
      window.location.href = result.paymentUrl;
    }
  };

  return (
    <div className="profile-page">

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {userInitials}
            </div>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">
              {user.name || user.email.split('@')[0]}
            </h1>
            <p className="profile-email">{user.email}</p>
            <div className="profile-status">
              <span className={`status-badge ${user.account_tier}`}>
                {currentTier.name.split(' | ')[0]}
              </span>
              {user.email_verified && (
                <span className="verified-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>


        {/* Profile Sections */}
        <div className="profile-sections">
          {/* Account Settings */}
          <section className="profile-section">
            <h2 className="section-title">Account Settings</h2>
            <div className="section-content">

              <div className="setting-item">
                <div className="setting-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <h3>Profile Information</h3>
                  <p>Update your personal information and preferences</p>
                </div>
                <button className="setting-action" onClick={openEditModal}>Edit</button>
              </div>

              <div className="setting-item">
                <div className="setting-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="m7 11 2-2-2-2"/>
                    <path d="m17 11-2-2 2-2"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <h3>Security</h3>
                  <p>Manage your password and security settings</p>
                </div>
                <button className="setting-action">Manage</button>
              </div>

              <div className="setting-item">
                <div className="setting-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <h3>Data Export</h3>
                  <p>Download your heart rate data and history</p>
                </div>
                <button className="setting-action">Export</button>
              </div>
            </div>
          </section>

          {/* Membership Section */}
          <section className="profile-section">
            <h2 className="section-title">Membership</h2>
            <div className="membership-card">
              <div className="membership-header">
                <div className="current-plan">
                  <h3>Current Plan</h3>
                  <div className="plan-info">
                    <span className="plan-name">{currentTier.name.split(' | ')[0]}</span>
                    <span className="plan-price">
                      {currentTier.price === 0 ? 'Free' : `$${currentTier.price}`}
                      {currentTier.price > 0 ? ' lifetime' : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div className="plan-features">
                {currentTier.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="feature-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    {feature.split(' | ')[0]}
                  </div>
                ))}
              </div>

              {user.account_tier !== 'enterprise' && (
                <div className="upgrade-options">
                  {Object.entries(MEMBERSHIP_TIERS)
                    .filter(([tier]) => tier !== 'free' && tier !== user.account_tier)
                    .map(([tier, info]) => (
                      <button
                        key={tier}
                        className="upgrade-button"
                        onClick={() => handleUpgrade(tier as keyof typeof MEMBERSHIP_TIERS)}
                      >
                        Upgrade to {info.name.split(' | ')[0]}
                        <span className="upgrade-price">${info.price} lifetime</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </section>

        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="modal-close" onClick={closeEditModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="modal-body">

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={editName}
                  onChange={(e) => {
                    console.log('⌨️ ProfilePage: 名称输入变化:', e.target.value);
                    setEditName(e.target.value);
                  }}
                  placeholder="Enter your full name"
                  maxLength={100}
                  className="form-input"
                  onFocus={() => console.log('🎯 ProfilePage: 名称输入框获得焦点')}
                  onBlur={() => console.log('🎯 ProfilePage: 名称输入框失去焦点')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="form-input disabled"
                />
                <p className="form-help">Email address cannot be changed</p>
              </div>

              {updateError && (
                <div className="error-message">
                  {updateError}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={closeEditModal}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  console.log('🖱️ ProfilePage: Save Changes按钮被点击');
                  console.log('📝 当前表单状态:', {
                    editName,
                    editNameTrimmed: editName.trim(),
                    isUpdating,
                    isDisabled: isUpdating || !editName.trim()
                  });
                  handleUpdateProfile();
                }}
                disabled={isUpdating || !editName.trim()}
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          background: var(--bg);
          padding: 2rem 1rem;
        }

        .profile-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .profile-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1rem;
          color: var(--muted);
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--line);
          border-top: 3px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .profile-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1rem;
          text-align: center;
          color: var(--muted);
        }

        .error-icon {
          font-size: 3rem;
          opacity: 0.5;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          background: var(--card);
          border-radius: 16px;
          border: 1px solid var(--line);
          box-shadow: 0 4px 12px rgba(15, 43, 51, 0.04);
        }

        .profile-avatar {
          flex-shrink: 0;
        }

        .avatar-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--accent);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 600;
          border: 3px solid var(--accent-soft);
        }

        .profile-info {
          flex: 1;
        }

        .profile-name {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: var(--ink);
          letter-spacing: -0.02em;
        }

        .profile-email {
          font-size: 1rem;
          color: var(--muted);
          margin: 0 0 1rem 0;
        }

        .profile-status {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .status-badge {
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-badge.free {
          background: var(--accent-soft);
          color: var(--accent);
        }

        .status-badge.basic {
          background: #fef3c7;
          color: #d97706;
        }

        .status-badge.pro {
          background: #ddd6fe;
          color: #7c3aed;
        }

        .status-badge.enterprise {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
        }

        .verified-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          background: #dcfce7;
          color: #16a34a;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .profile-sections {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .profile-section {
          background: var(--card);
          border-radius: 16px;
          border: 1px solid var(--line);
          box-shadow: 0 4px 12px rgba(15, 43, 51, 0.04);
          overflow: hidden;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--line);
          color: var(--ink);
        }

        .section-content {
          padding: 0;
        }

        .setting-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--line);
          transition: background-color 0.15s ease;
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-item:hover {
          background: rgba(15, 140, 140, 0.02);
        }

        .setting-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--accent-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
        }

        .setting-content {
          flex: 1;
        }

        .setting-content h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
          color: var(--ink);
        }

        .setting-content p {
          font-size: 0.875rem;
          color: var(--muted);
          margin: 0;
        }

        .setting-action {
          padding: 0.5rem 1rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: transparent;
          color: var(--ink);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .setting-action:hover {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        .membership-card {
          padding: 2rem;
        }

        .membership-header {
          margin-bottom: 1.5rem;
        }

        .current-plan h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: var(--ink);
        }

        .plan-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .plan-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--ink);
        }

        .plan-price {
          font-size: 1rem;
          color: var(--muted);
          font-weight: 500;
        }

        .plan-features {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--muted);
        }

        .feature-item svg {
          color: var(--accent);
          flex-shrink: 0;
        }

        .upgrade-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .upgrade-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border: 1px solid var(--accent);
          border-radius: 12px;
          background: transparent;
          color: var(--accent);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .upgrade-button:hover {
          background: var(--accent);
          color: white;
        }

        .upgrade-price {
          font-size: 0.875rem;
          font-weight: 500;
        }


        @media (max-width: 640px) {
          .profile-page {
            padding: 1rem 0.5rem;
          }

          .profile-header {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
            padding: 1.5rem;
          }

          .avatar-circle {
            width: 64px;
            height: 64px;
            font-size: 1.25rem;
          }

          .profile-name {
            font-size: 1.5rem;
          }

          .profile-status {
            justify-content: center;
          }

          .section-title {
            padding: 1rem 1.5rem;
            font-size: 1.125rem;
          }

          .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 1rem 1.5rem;
          }

          .setting-action {
            align-self: flex-end;
          }

          .membership-card {
            padding: 1.5rem;
          }

        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--card);
          border-radius: 16px;
          border: 1px solid var(--line);
          box-shadow: 0 25px 70px rgba(15, 43, 51, 0.15);
          max-width: 480px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--line);
        }

        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: var(--ink);
        }

        .modal-close {
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .modal-close:hover {
          background: rgba(15, 140, 140, 0.1);
          color: var(--accent);
        }

        .modal-body {
          padding: 2rem;
          flex: 1;
          overflow-y: auto;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group:last-child {
          margin-bottom: 0;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          font-size: 1rem;
          color: var(--ink);
          background: var(--card);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(15, 140, 140, 0.1);
        }

        .form-input.disabled {
          background: rgba(15, 43, 51, 0.05);
          color: var(--muted);
          cursor: not-allowed;
        }

        .form-help {
          font-size: 0.75rem;
          color: var(--muted);
          margin: 0.25rem 0 0 0;
        }

        .error-message {
          padding: 0.75rem 1rem;
          background: #fef2f2;
          color: #dc2626;
          border-radius: 8px;
          font-size: 0.875rem;
          border: 1px solid #fecaca;
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
          padding: 1.5rem 2rem;
          border-top: 1px solid var(--line);
          justify-content: flex-end;
        }

        .btn-secondary {
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: transparent;
          color: var(--ink);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-secondary:hover {
          background: rgba(15, 43, 51, 0.05);
        }

        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--accent);
          border-radius: 8px;
          background: var(--accent);
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-primary:hover:not(:disabled) {
          background: #0a7a7a;
          border-color: #0a7a7a;
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .modal-overlay {
            padding: 0.5rem;
          }

          .modal-header {
            padding: 1rem 1.5rem;
          }

          .modal-body {
            padding: 1.5rem;
          }

          .modal-footer {
            padding: 1rem 1.5rem;
            flex-direction: column-reverse;
          }

          .btn-secondary,
          .btn-primary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
