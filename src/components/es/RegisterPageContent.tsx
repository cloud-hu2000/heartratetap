'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
export default function RegisterPageContent() {
  const {
    register,
    isAuthenticated,
    isLoading
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const returnUrl = searchParams.get('returnUrl') || '/es';
      router.push(returnUrl);
    }
  }, [isLoading, isAuthenticated, router, searchParams]);
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
    setSuccess(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    if (!formData.email || !formData.password) {
      setError("Se requiere correo electrónico y contraseña");
      setIsSubmitting(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsSubmitting(false);
      return;
    }
    try {
      const res = await register({
        email: formData.email,
        password: formData.password,
        name: formData.name || undefined
      });
      if (res.success && (res as any).needsVerification) {
        setSuccess("Por favor, compruebe su buzón de entrada.");
      } else if (res.success) {
        setSuccess("Registro exitoso.");
      } else {
        // 调试信息
        console.error("El registro falló:", {
          email: formData.email,
          name: formData.name,
          error: res.error,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        });
        setError(res.error || "Falló el registro");
      }
    } catch (err) {
      // 调试信息
      console.error("Error de red de registro:", {
        email: formData.email,
        name: formData.name,
        error: err,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
      setError("Error de red. Por favor, intente de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="register-page">
       <div className="register-container">
         {/* Header */}
         <header className="register-header">
           <h1 className="register-title">Cree su cuenta</h1>
           <p className="register-subtitle">Empieza tu viaje de ritmo cardíaco hoy</p>
         </header>

         {/* Register Form */}
         <main className="register-main">
           <div className="register-card">
             <form onSubmit={handleSubmit} className="register-form">
               {/* Email Field */}
               <div className="form-field">
                 <label htmlFor="email" className="form-label">
                   Dirección de correo electrónico
                 </label>
                 <input id="email" type="email" required value={formData.email} onChange={e => handleChange('email', e.target.value)} className="form-input" placeholder="Introduzca su correo electrónico" disabled={isSubmitting} autoComplete="email" />
               </div>

               {/* Name Field */}
               <div className="form-field">
                 <label htmlFor="name" className="form-label">
                   Nombre completo
                 </label>
                 <input id="name" type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} className="form-input" placeholder="Introduzca su nombre completo" disabled={isSubmitting} autoComplete="name" />
               </div>

               {/* Password Field */}
               <div className="form-field">
                 <label htmlFor="password" className="form-label">
                   Contraseña
                 </label>
                 <div className="form-input-container">
                   <input id="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={e => handleChange('password', e.target.value)} className="form-input form-input-with-icon" placeholder="Crear una contraseña" disabled={isSubmitting} autoComplete="new-password" />
                   <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} disabled={isSubmitting} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                     {showPassword ? <svg className="password-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                       </svg> : <svg className="password-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                       </svg>}
                   </button>
                 </div>
               </div>

               {/* Confirm Password Field */}
               <div className="form-field">
                 <label htmlFor="confirmPassword" className="form-label">
                   Confirme contraseña
                 </label>
                 <div className="form-input-container">
                   <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} required value={formData.confirmPassword} onChange={e => handleChange('confirmPassword', e.target.value)} className="form-input form-input-with-icon" placeholder="Confirme su contraseña" disabled={isSubmitting} autoComplete="new-password" />
                   <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isSubmitting} aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                     {showConfirmPassword ? <svg className="password-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                       </svg> : <svg className="password-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                       </svg>}
                   </button>
                 </div>
               </div>

               {/* Error/Success Messages */}
               {error && <div className="form-message form-message-error">
                   <div className="form-message-content">
                     <svg className="form-message-icon" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                     </svg>
                     <div>
                       <div className="form-message-title">Falló el registro</div>
                       <div className="form-message-text">{error}</div>
                     </div>
                   </div>
                 </div>}

               {success && <div className="form-message form-message-success">
                   <div className="form-message-content">
                     <svg className="form-message-icon" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                     </svg>
                     <div>
                       <div className="form-message-text">{success}</div>
                     </div>
                   </div>
                 </div>}

               {/* Terms */}
               <div className="form-terms">
                 Al crear una cuenta, usted acepta los Términos de Servicio.
               </div>

               {/* Submit Button */}
               <button type="submit" disabled={isSubmitting} className="form-button form-button-primary">
                 {isSubmitting ? <>
                     <div className="form-button-spinner"></div>
                     Crear cuenta...
                   </> : "Crear cuenta"}
               </button>
             </form>
           </div>

           {/* Sign In Section */}
           <div className="register-footer">
             <div className="signin-section">
               <p className="signin-text">
                 ¿Ya tienes una cuenta?{' '}
                 <Link href="/es/login" className="signin-link">
                   Iniciar sesión
                 </Link>
               </p>
             </div>
           </div>
         </main>
       </div>
     </div>;
}
