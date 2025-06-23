"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header className="w-full sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center h-16 px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-purple-600 dark:text-purple-300 tracking-tight hover:opacity-80 transition-opacity">
          <Image src="/globe.svg" alt="AnaQuest Logo" width={32} height={32} />
          <span className="ml-2">AnaQuest</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-200" href="/">Home</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-200" href="/quiz">Quiz</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-blue-700 dark:text-blue-300" href="/quiz/dynamic">Custom Quiz</Link>
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
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="ml-2 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; 