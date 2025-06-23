import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-center p-8">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Sorry, the page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="inline-block px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-blue-600 transition">Go Home</Link>
    </div>
  );
} 