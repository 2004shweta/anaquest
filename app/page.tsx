"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, BarChart3, Timer, GraduationCap, User, ShieldCheck, Globe, Trophy, Linkedin, Twitter, Github } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const fontClass = html.className.replace(/\bdark\b/g, '').trim();
    if (theme === 'dark') {
      setTheme('light');
      html.className = fontClass;
    } else {
      setTheme('dark');
      html.className = fontClass + ' dark';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[var(--background)] to-[#1e293b] text-[var(--foreground)]">
      {/* Dark mode toggle button at top right */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-36 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 animate-gradient bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-blue-300/10 to-transparent" />
          <div className="container mx-auto px-4 md:px-8 flex flex-col-reverse md:flex-row items-center gap-16 relative z-10">
            {/* Text */}
            <div className="flex-1 flex flex-col gap-8 items-start animate-fade-in">
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xl">
                Master Your <span className="bg-gradient-to-r from-primary to-blue-300 bg-clip-text text-transparent">Analytical</span> Skills
              </h1>
              <p className="max-w-lg text-xl text-white/80 animate-fade-in-delay">
                Your ultimate platform for mastering analytical questions for competitive exams and placements. Interactive, beautiful, and fun!
              </p>
              <div className="flex gap-4 mt-2">
                <Link href="/signup">
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-300 text-white rounded-full px-6 py-3 text-lg font-semibold shadow-xl hover:scale-105 hover:from-blue-200 hover:to-primary/80 transition-all">
                    <User className="w-5 h-5" /> Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" className="flex items-center gap-2 border border-white/20 text-white/80 bg-white/10 hover:bg-white/20 rounded-full px-6 py-3 text-lg font-semibold shadow hover:scale-105 transition-all">
                    <ShieldCheck className="w-5 h-5" /> Login
                  </Button>
                </Link>
              </div>
            </div>
            {/* Illustration */}
            <div className="flex-1 flex justify-center items-center animate-fade-in-delay">
              <img
                src="/globe.svg"
                alt="Analytics Illustration"
                className="w-[340px] h-[340px] drop-shadow-2xl animate-float rounded-3xl bg-white/5 p-6 border border-white/10 shadow-xl"
                style={{ filter: "drop-shadow(0 8px 32px rgba(0, 200, 255, 0.15))" }}
              />
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="w-full py-20 md:py-28 bg-transparent">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-base font-semibold text-primary mb-4 animate-fade-in">Key Features</span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white animate-fade-in">Why Choose AnaQuest?</h2>
              <p className="max-w-2xl mx-auto text-lg text-white/60 mt-4 animate-fade-in-delay">
                We provide a comprehensive set of tools and resources to help you excel in your analytical assessments.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 hover:scale-105 transition-transform group animate-fade-in-delay border border-white/10">
                <BookOpen className="w-12 h-12 text-primary group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-white">Comprehensive Question Bank</h3>
                <p className="text-base text-white/70 text-center">
                  Access a vast library of analytical questions from various competitive exams and company placement papers.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 hover:scale-105 transition-transform group animate-fade-in-delay border border-white/10">
                <BarChart3 className="w-12 h-12 text-primary group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-white">Detailed Analytics</h3>
                <p className="text-base text-white/70 text-center">
                  Track your progress with our in-depth performance analytics and identify your areas of improvement.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 hover:scale-105 transition-transform group animate-fade-in-delay border border-white/10">
                <Timer className="w-12 h-12 text-primary group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-white">Timed Quizzes</h3>
                <p className="text-base text-white/70 text-center">
                  Simulate real exam conditions with our timed quizzes and improve your speed and accuracy.
                </p>
              </div>
              {/* New Feature Cards */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 hover:scale-105 transition-transform group animate-fade-in-delay border border-white/10">
                <GraduationCap className="w-12 h-12 text-primary group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-white">Exam Coverage</h3>
                <p className="text-base text-white/70 text-center">
                  Practice for UPSC, CAT, GMAT, GRE, SAT, Bank PO, SSC, and more with tailored quizzes.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 hover:scale-105 transition-transform group animate-fade-in-delay border border-white/10">
                <Trophy className="w-12 h-12 text-primary group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-white">Achievements & Badges</h3>
                <p className="text-base text-white/70 text-center">
                  Earn badges and achievements as you progress and master new skills.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 hover:scale-105 transition-transform group animate-fade-in-delay border border-white/10">
                <User className="w-12 h-12 text-primary group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-white">Personalized Profile</h3>
                <p className="text-base text-white/70 text-center">
                  Track your progress, review your answers, and customize your learning journey.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 hover:scale-105 transition-transform group animate-fade-in-delay border border-white/10">
                <ShieldCheck className="w-12 h-12 text-primary group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-white">Secure & Private</h3>
                <p className="text-base text-white/70 text-center">
                  Your data is protected with industry-standard security and privacy practices.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Exams Section */}
        <section className="w-full py-20 md:py-28 bg-gradient-to-br from-primary/5 via-blue-900/10 to-transparent">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white animate-fade-in">Exams We Cover</h2>
              <p className="max-w-xl mx-auto text-lg text-white/60 mt-4 animate-fade-in-delay">
                Practice questions for a wide range of competitive exams.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="rounded-2xl border border-primary/30 bg-white/5 px-8 py-5 text-lg font-semibold shadow-lg flex items-center gap-3 hover:bg-primary/10 transition-colors animate-fade-in-delay text-white">
                <GraduationCap className="w-6 h-6 text-primary" /> UPSC
              </div>
              <div className="rounded-2xl border border-primary/30 bg-white/5 px-8 py-5 text-lg font-semibold shadow-lg flex items-center gap-3 hover:bg-primary/10 transition-colors animate-fade-in-delay text-white">
                <Trophy className="w-6 h-6 text-primary" /> CAT
              </div>
              <div className="rounded-2xl border border-primary/30 bg-white/5 px-8 py-5 text-lg font-semibold shadow-lg flex items-center gap-3 hover:bg-primary/10 transition-colors animate-fade-in-delay text-white">
                <BarChart3 className="w-6 h-6 text-primary" /> GMAT
              </div>
              <div className="rounded-2xl border border-primary/30 bg-white/5 px-8 py-5 text-lg font-semibold shadow-lg flex items-center gap-3 hover:bg-primary/10 transition-colors animate-fade-in-delay text-white">
                <BarChart3 className="w-6 h-6 text-primary" /> GRE
              </div>
              <div className="rounded-2xl border border-primary/30 bg-white/5 px-8 py-5 text-lg font-semibold shadow-lg flex items-center gap-3 hover:bg-primary/10 transition-colors animate-fade-in-delay text-white">
                <BookOpen className="w-6 h-6 text-primary" /> SAT
              </div>
              <div className="rounded-2xl border border-primary/30 bg-white/5 px-8 py-5 text-lg font-semibold shadow-lg flex items-center gap-3 hover:bg-primary/10 transition-colors animate-fade-in-delay text-white">
                <ShieldCheck className="w-6 h-6 text-primary" /> Bank PO
              </div>
              <div className="rounded-2xl border border-primary/30 bg-white/5 px-8 py-5 text-lg font-semibold shadow-lg flex items-center gap-3 hover:bg-primary/10 transition-colors animate-fade-in-delay text-white">
                <BookOpen className="w-6 h-6 text-primary" /> SSC
              </div>
            </div>
          </div>
        </section>
        {/* Profile/Avatar Section */}
        <section className="w-full py-20 md:py-28 bg-transparent">
          <div className="container mx-auto px-4 md:px-8 flex flex-col items-center gap-10">
            <div className="rounded-full border-8 border-primary/30 shadow-2xl p-3 bg-white/10 animate-fade-in">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User Avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-lg"
              />
            </div>
            <div className="text-center animate-fade-in-delay">
              <h3 className="text-3xl font-bold text-white">Welcome, Future Analyst!</h3>
              <p className="text-lg text-white/70 max-w-md mx-auto">
                Sign up to track your progress, earn badges, and join a vibrant community of learners.
              </p>
            </div>
          </div>
        </section>
      </main>
      {/* Animations */}
      <style jsx global>{`
        .animate-fade-in { animation: fadeIn 1s ease; }
        .animate-fade-in-delay { animation: fadeIn 1.5s ease; }
        .animate-float { animation: float 3s ease-in-out infinite alternate; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-16px); } }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 8s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
