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
  {/* Google signup removed */}
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