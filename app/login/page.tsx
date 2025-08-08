"use client";

import { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MailIcon, LockIcon, UserCircleIcon } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStep, setResetStep] = useState(1); // 1: request, 2: verify
  const [resetOtp, setResetOtp] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const isAdminLogin = searchParams?.get('admin') === '1';

  useEffect(() => {
    if (status === 'authenticated') {
      if (isAdminLogin && session?.user?.admin) {
        router.replace('/admin');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [status, router, isAdminLogin, session]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    console.log('Submitting login form');
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    console.log('Login result:', res);
    if (res?.error) {
      setError(res.error);
    } else if (res?.ok) {
      window.location.href = isAdminLogin ? '/admin' : '/dashboard';
    } else {
      setError('Unknown error occurred');
    }
  }

  // Google login removed

  async function handleForgotRequest(e: React.FormEvent) {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');
    const res = await fetch('/api/auth/request-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: resetEmail }),
    });
    const data = await res.json();
    if (res.ok) {
      setResetSuccess('OTP sent to your email.');
      setResetStep(2);
    } else {
      setResetError(data.message || 'Failed to send OTP');
    }
  }

  async function handleForgotVerify(e: React.FormEvent) {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');
    if (resetNewPassword.trim().length < 6) {
      setResetError('Password must be at least 6 characters.');
      return;
    }
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: resetEmail, otp: resetOtp, newPassword: resetNewPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setResetSuccess('Password reset successful! You can now log in.');
      setTimeout(() => {
        setShowForgot(false);
        setResetStep(1);
        setResetEmail('');
        setResetOtp('');
        setResetNewPassword('');
        setResetError('');
        setResetSuccess('');
      }, 1500);
    } else {
      setResetError(data.message || 'Failed to reset password');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 rounded-2xl shadow-2xl border border-gray-200 dark:bg-gray-800/90 dark:border-gray-700 hover:scale-[1.02] hover:shadow-3xl transition-transform duration-300">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-gray-700 rounded-full p-2 mb-1">
            <UserCircleIcon className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Login</h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">Welcome back! Please login to your account.</p>
          {isAdminLogin && (
            <span className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Admin Login</span>
          )}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <Link className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-400" href="/">Home</Link>
          </p>
        </div>
        {!showForgot ? (
          <>
            <form onSubmit={handleSubmit} autoComplete="on">
              <div className="relative mb-4">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
                <span className="absolute left-3 top-9 text-gray-400 pointer-events-none">
                  <MailIcon className="w-5 h-5" />
                </span>
                <input
                  className="mt-1 pl-10 w-full border rounded py-2"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="relative mb-4">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
                <span className="absolute left-3 top-9 text-gray-400 pointer-events-none">
                  <LockIcon className="w-5 h-5" />
                </span>
                <input
                  className="mt-1 pl-10 w-full border rounded py-2"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" className="w-full text-base font-semibold bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
            </form>
            <div className="flex justify-end mt-2">
              <button type="button" className="text-blue-600 hover:underline text-sm dark:text-blue-400" onClick={() => setShowForgot(true)}>
                Forgot Password?
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2 text-center animate-pulse">{error}</p>}
          </>
        ) : (
          <>
            {resetStep === 1 ? (
              <form className="space-y-5" onSubmit={handleForgotRequest}>
                <div className="relative">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="resetEmail">Email</label>
                  <span className="absolute left-3 top-9 text-gray-400 pointer-events-none">
                    <MailIcon className="w-5 h-5" />
                  </span>
                  <Input className="mt-1 pl-10" id="resetEmail" placeholder="you@example.com" type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full text-base font-semibold">Send OTP</Button>
              </form>
            ) : (
              <form className="space-y-5" onSubmit={handleForgotVerify}>
                <div className="relative">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="resetOtp">OTP</label>
                  <Input className="mt-1" id="resetOtp" placeholder="6-digit code" type="text" value={resetOtp} onChange={e => setResetOtp(e.target.value)} required maxLength={6} />
                </div>
                <div className="relative">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="resetNewPassword">New Password</label>
                  <span className="absolute left-3 top-9 text-gray-400 pointer-events-none">
                    <LockIcon className="w-5 h-5" />
                  </span>
                  <Input className="mt-1 pl-10" id="resetNewPassword" placeholder="••••••••" type="password" value={resetNewPassword} onChange={e => setResetNewPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full text-base font-semibold">Reset Password</Button>
              </form>
            )}
            <div className="flex justify-end mt-2">
              <button type="button" className="text-blue-600 hover:underline text-sm dark:text-blue-400" onClick={() => setShowForgot(false)}>
                Back to Login
              </button>
            </div>
          </>
        )}
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>
  {/* Google login removed */}
        {resetError && <p className="text-red-500 text-sm mt-2 text-center animate-pulse">{resetError}</p>}
        {resetSuccess && <p className="text-green-500 text-sm mt-2 text-center animate-pulse">{resetSuccess}</p>}
        {isAdminLogin && status === 'authenticated' && !session?.user?.admin && (
          <p className="text-red-500 text-sm mt-2 text-center animate-pulse">You are not authorized to login as admin.</p>
        )}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <Link className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-400" href="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
} 