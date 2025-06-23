import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
} 