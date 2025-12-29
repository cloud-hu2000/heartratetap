'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

type AuthMode = 'login' | 'register';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl focus:outline-none focus:text-gray-600"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Content */}
        <div className="p-6">
          {mode === 'login' ? (
            <LoginForm
              onSwitchToRegister={() => switchMode('register')}
              onSuccess={handleSuccess}
            />
          ) : (
            <RegisterForm
              onSwitchToLogin={() => switchMode('login')}
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}
