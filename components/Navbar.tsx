"use client"
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center h-16 px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-purple-600 dark:text-purple-300 tracking-tight hover:opacity-80 transition-opacity">
          <span className="ml-2">AnaQuest</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-200" href="/">Home</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-200" href="/quiz">Quiz</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-200" href="/dashboard">Dashboard</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-200" href="/test-series">Test Series</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-200" href="/contact">Contact</Link>
          <Link href="/profile">
            <Button variant="outline">Profile</Button>
          </Link>
          {session ? (
            <button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button>
          ) : (
            <a href="/login">Login</a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar; 