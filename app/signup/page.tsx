"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { UserIcon, MailIcon, LockIcon, UserPlusIcon } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setOtpError('');
    setOtpSuccess('');
    if (password.trim().length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email: email.trim().toLowerCase(), password }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess('OTP sent to your email. Please verify.');
      setShowOtp(true);
    } else {
      setError(data.message || 'Registration failed');
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOtpError('');
    setOtpSuccess('');
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (res.ok) {
      setOtpSuccess('Account verified! Redirecting to login...');
      setTimeout(() => router.push('/login'), 1500);
    } else {
      setOtpError(data.message || 'OTP verification failed');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 rounded-2xl shadow-2xl border border-gray-200 dark:bg-gray-800/90 dark:border-gray-700 hover:scale-[1.02] hover:shadow-3xl transition-transform duration-300">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-gray-700 rounded-full p-2 mb-1">
            <UserPlusIcon className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Sign Up</h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">Create your account to get started.</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <Link className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-400" href="/">Home</Link>
          </p>
        </div>
        {!showOtp ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="name">Name</label>
              <span className="absolute left-3 top-9 text-gray-400 pointer-events-none">
                <UserIcon className="w-5 h-5" />
              </span>
              <Input className="mt-1 pl-10" id="name" placeholder="John Doe" type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
              <span className="absolute left-3 top-9 text-gray-400 pointer-events-none">
                <MailIcon className="w-5 h-5" />
              </span>
              <Input className="mt-1 pl-10" id="email" placeholder="you@example.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
              <span className="absolute left-3 top-9 text-gray-400 pointer-events-none">
                <LockIcon className="w-5 h-5" />
              </span>
              <Input className="mt-1 pl-10" id="password" placeholder="••••••••" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button className="w-full text-base font-semibold" type="submit">Sign Up</Button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleOtpSubmit}>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="otp">Enter OTP</label>
              <Input className="mt-1" id="otp" placeholder="6-digit code" type="text" value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6} />
            </div>
            <Button className="w-full text-base font-semibold" type="submit">Verify OTP</Button>
            {otpError && <p className="text-red-500 text-sm mt-2 text-center animate-pulse">{otpError}</p>}
            {otpSuccess && <p className="text-green-500 text-sm mt-2 text-center animate-pulse">{otpSuccess}</p>}
          </form>
        )}
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 transition-colors duration-200"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_17_40)">
              <path d="M47.5 24.5C47.5 22.8 47.3 21.2 47 19.7H24V28.3H37.3C36.7 31.2 34.8 33.6 32 35.1V40.1H39.6C44.1 36.1 47.5 30.1 47.5 24.5Z" fill="#4285F4"/>
              <path d="M24 48C30.5 48 36.1 45.9 39.6 40.1L32 35.1C30.2 36.2 27.9 36.9 24 36.9C17.7 36.9 12.2 32.7 10.3 27.1H2.5V32.3C6.1 40.1 14.3 48 24 48Z" fill="#34A853"/>
              <path d="M10.3 27.1C9.8 25.9 9.5 24.6 9.5 23.2C9.5 21.8 9.8 20.5 10.3 19.3V14.1H2.5C0.9 17.2 0 20.5 0 23.2C0 25.9 0.9 29.2 2.5 32.3L10.3 27.1Z" fill="#FBBC05"/>
              <path d="M24 9.1C27.2 9.1 29.7 10.2 31.4 11.8L39.7 4.1C36.1 1 30.5 0 24 0C14.3 0 6.1 7.9 2.5 14.1L10.3 19.3C12.2 13.7 17.7 9.1 24 9.1Z" fill="#EA4335"/>
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          Sign up with Google
        </Button>
        {error && <p className="text-red-500 text-sm mt-2 text-center animate-pulse">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2 text-center animate-pulse">{success}</p>}
        <div className="text-center mt-4">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400">Login</Link>
        </div>
        <div className="text-center mt-2">
          <Link href="/login?admin=1" className="text-red-600 font-semibold hover:underline dark:text-red-400">Login as Admin</Link>
        </div>
      </div>
    </div>
  );
} 