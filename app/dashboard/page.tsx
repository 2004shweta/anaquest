"use client";

import React from "react";
import Image from "next/image";
import { CalendarDays, BookOpen, CheckCircle, BarChart2, TrendingUp, Clock, Target, Award, Play, Calendar, Star, Users, ArrowRight, Plus } from "lucide-react";

const mockUser = {
  name: "Alex Johnson",
  avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random",
  email: "alex.johnson@email.com",
  membership: "Premium",
  joinDate: "2024-01-15",
  stats: {
    courses: 8,
    quizzes: 24,
    progress: 78,
    streak: 12,
    totalScore: 2450,
    averageScore: 82,
  },
  recentActivity: [
    { 
      type: "quiz", 
      title: "UPSC Prelims Mock Test 3", 
      date: "2024-01-15", 
      score: 85,
      totalQuestions: 100,
      timeSpent: "2h 30m",
      status: "completed"
    },
    { 
      type: "course", 
      title: "Indian Polity - Chapter 5", 
      date: "2024-01-14", 
      progress: 75,
      status: "in-progress"
    },
    { 
      type: "quiz", 
      title: "CAT Quantitative Aptitude", 
      date: "2024-01-13", 
      score: 78,
      totalQuestions: 50,
      timeSpent: "1h 45m",
      status: "completed"
    },
    { 
      type: "test-series", 
      title: "SSC CGL Test Series", 
      date: "2024-01-12", 
      progress: 60,
      status: "enrolled"
    },
  ],
  upcomingTests: [
    {
      id: 1,
      title: "UPSC Prelims Mock Test 4",
      date: "2024-01-18",
      time: "10:00 AM",
      duration: "2 hours",
      category: "UPSC",
      enrolled: 15420
    },
    {
      id: 2,
      title: "CAT Mock Test 2",
      date: "2024-01-20",
      time: "2:00 PM",
      duration: "2.5 hours",
      category: "CAT",
      enrolled: 8920
    },
    {
      id: 3,
      title: "SSC CGL Practice Test",
      date: "2024-01-22",
      time: "11:00 AM",
      duration: "1.5 hours",
      category: "SSC",
      enrolled: 12350
    }
  ],
  performance: {
    subjects: [
      { name: "General Studies", score: 85, improvement: 12 },
      { name: "Quantitative Aptitude", score: 78, improvement: 8 },
      { name: "English Language", score: 92, improvement: 15 },
      { name: "Reasoning", score: 76, improvement: 5 },
      { name: "Current Affairs", score: 88, improvement: 18 }
    ],
    weeklyProgress: [65, 72, 68, 75, 82, 78, 85]
  },
  recommendations: [
    {
      id: 1,
      title: "Weak in Reasoning",
      description: "Focus on logical reasoning questions",
      action: "Practice 20 questions daily",
      priority: "high"
    },
    {
      id: 2,
      title: "Current Affairs",
      description: "Stay updated with daily news",
      action: "Read newspaper daily",
      priority: "medium"
    },
    {
      id: 3,
      title: "Time Management",
      description: "Improve speed in quantitative section",
      action: "Take timed practice tests",
      priority: "medium"
    }
  ]
};

const today = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function DashboardPage() {
  return (
    <div className="w-full min-h-screen p-4">
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {mockUser.name}! 👋</h1>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1">
            <CalendarDays size={18} />
            <span className="text-sm">{today}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 rounded-xl px-4 py-2 shadow">
            <Image
              src={mockUser.avatar}
              alt="User Avatar"
              width={48}
              height={48}
              className="rounded-full border-2 border-primary"
            />
            <div className="hidden sm:block">
              <span className="font-semibold text-gray-800 dark:text-gray-100 block">{mockUser.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{mockUser.membership} Member</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
            <Plus size={16} />
            New Test
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Tests</p>
              <p className="text-3xl font-bold">{mockUser.stats.quizzes}</p>
              <p className="text-blue-100 text-sm mt-1">+12 this month</p>
            </div>
            <BookOpen size={32} className="text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Average Score</p>
              <p className="text-3xl font-bold">{mockUser.stats.averageScore}%</p>
              <p className="text-green-100 text-sm mt-1">+5% improvement</p>
            </div>
            <TrendingUp size={32} className="text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Study Streak</p>
              <p className="text-3xl font-bold">{mockUser.stats.streak} days</p>
              <p className="text-purple-100 text-sm mt-1">Keep it up!</p>
            </div>
            <Target size={32} className="text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Overall Progress</p>
              <p className="text-3xl font-bold">{mockUser.stats.progress}%</p>
              <p className="text-orange-100 text-sm mt-1">Course completion</p>
            </div>
            <BarChart2 size={32} className="text-orange-200" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {mockUser.recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className={`p-3 rounded-lg ${
                    item.type === "quiz" ? "bg-purple-100 dark:bg-purple-200/20" :
                    item.type === "course" ? "bg-blue-100 dark:bg-blue-200/20" :
                    "bg-green-100 dark:bg-green-200/20"
                  }`}>
                    {item.type === "quiz" ? (
                      <CheckCircle className="text-purple-600 dark:text-purple-300" size={20} />
                    ) : item.type === "course" ? (
                      <BookOpen className="text-blue-600 dark:text-blue-300" size={20} />
                    ) : (
                      <Award className="text-green-600 dark:text-green-300" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                      {item.type === "quiz" && item.score && (
                        <span className="flex items-center gap-1">
                          <Star className="text-yellow-500" size={14} />
                          {item.score}%
                        </span>
                      )}
                      {item.type === "course" && item.progress && (
                        <span className="flex items-center gap-1">
                          <BarChart2 className="text-blue-500" size={14} />
                          {item.progress}% complete
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "completed" ? "bg-green-100 text-green-700 dark:bg-green-200/20 dark:text-green-300" :
                    item.status === "in-progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-200/20 dark:text-blue-300" :
                    "bg-purple-100 text-purple-700 dark:bg-purple-200/20 dark:text-purple-300"
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tests */}
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Tests</h2>
            <button className="text-primary hover:text-primary/80 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {mockUser.upcomingTests.map((test) => (
              <div key={test.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">{test.title}</h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {test.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(test.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {test.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {test.duration} • {test.enrolled.toLocaleString()} enrolled
                  </span>
                  <button className="flex items-center gap-1 px-3 py-1 bg-primary text-white text-xs rounded-lg hover:bg-primary/90 transition">
                    <Play size={12} />
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Analytics */}
      <section className="mt-8">
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Performance by Subject</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {mockUser.performance.subjects.map((subject, idx) => (
              <div key={idx} className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="w-16 h-16 mx-auto mb-3 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray={`${subject.score}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{subject.score}%</span>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{subject.name}</h3>
                <p className={`text-xs ${subject.improvement > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {subject.improvement > 0 ? '+' : ''}{subject.improvement}% improvement
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Recommendations */}
      <section className="mt-8">
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Study Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockUser.recommendations.map((rec) => (
              <div key={rec.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">{rec.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.priority === "high" ? "bg-red-100 text-red-700 dark:bg-red-200/20 dark:text-red-300" :
                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-200/20 dark:text-yellow-300"
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{rec.action}</span>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
                    Start <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 