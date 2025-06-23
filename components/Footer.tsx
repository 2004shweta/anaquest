import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white/90 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-bold text-primary mb-1">Anaquest</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Empowering your exam journey</span>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <Link href="/dashboard" className="hover:text-primary transition">Dashboard</Link>
          <Link href="/quiz" className="hover:text-primary transition">Quiz</Link>
          <Link href="/test-series" className="hover:text-primary transition">Test Series</Link>
          <Link href="/contact" className="hover:text-primary transition">Contact</Link>
          <Link href="/profile" className="hover:text-primary transition">Profile</Link>
        </nav>
        <div className="flex gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" aria-label="Twitter">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M22 5.924c-.793.352-1.646.59-2.54.697a4.48 4.48 0 0 0 1.964-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 12.03 9.5c0 .352.04.695.116 1.022C8.728 10.37 5.7 8.74 3.671 6.25a4.48 4.48 0 0 0-.607 2.257c0 1.557.793 2.933 2.002 3.74a4.47 4.47 0 0 1-2.03-.56v.057a4.48 4.48 0 0 0 3.6 4.393c-.193.053-.397.08-.607.08-.148 0-.292-.014-.432-.04.293.915 1.142 1.58 2.148 1.597A8.98 8.98 0 0 1 2 19.07a12.67 12.67 0 0 0 6.88 2.017c8.253 0 12.77-6.835 12.77-12.77 0-.195-.004-.39-.013-.583A9.13 9.13 0 0 0 24 4.59a8.98 8.98 0 0 1-2.6.713Z"/></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" aria-label="Facebook">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" aria-label="Instagram">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163Zm0-2.163C8.741 0 8.332.014 7.052.072 5.771.13 4.659.388 3.678 1.37c-.98.98-1.24 2.092-1.298 3.374C2.014 8.332 2 8.741 2 12c0 3.259.014 3.668.072 4.948.058 1.282.318 2.394 1.298 3.374.98.98 2.092 1.24 3.374 1.298C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.282-.058 2.394-.318 3.374-1.298.98-.98 1.24-2.092 1.298-3.374.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.058-1.282-.318-2.394-1.298-3.374-.98-.98-2.092-1.24-3.374-1.298C15.668.014 15.259 0 12 0Zm0 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838Zm0 10.162A3.999 3.999 0 1 1 12 8a3.999 3.999 0 0 1 0 7.999Zm7.2-11.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/></svg>
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-2 border-t border-gray-100 dark:border-gray-800">
        &copy; {new Date().getFullYear()} Anaquest. All rights reserved.
      </div>
    </footer>
  );
} 