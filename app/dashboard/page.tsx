"use client";

import React from "react";
import Image from "next/image";
import { CalendarDays, BookOpen, CheckCircle, BarChart2, TrendingUp, Clock, Target, Award, Play, Calendar, Star, Users, ArrowRight, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

const today = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Mock data for charts
const scoreTrendsData = [
  { date: 'Mon', score: 60 },
  { date: 'Tue', score: 70 },
  { date: 'Wed', score: 80 },
  { date: 'Thu', score: 75 },
  { date: 'Fri', score: 90 },
  { date: 'Sat', score: 85 },
  { date: 'Sun', score: 95 },
];

const accuracyData = [
  { name: 'Correct', value: 80 },
  { name: 'Incorrect', value: 20 },
];
const COLORS = ['#34d399', '#f87171'];

const weakTopicsData = [
  { topic: 'Quant', mistakes: 5 },
  { topic: 'Verbal', mistakes: 2 },
  { topic: 'Reasoning', mistakes: 7 },
  { topic: 'GK', mistakes: 3 },
];

const avgTimeData = [
  { topic: 'Quant', time: 42 },
  { topic: 'Verbal', time: 30 },
  { topic: 'Reasoning', time: 55 },
  { topic: 'GK', time: 25 },
];

function ScoreTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={scoreTrendsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function AccuracyChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={accuracyData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${typeof percent === 'number' && !isNaN(percent) ? (percent * 100).toFixed(0) : 0}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {accuracyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

function WeakTopicsChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={weakTopicsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="topic" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="mistakes" fill="#f59e42" />
      </BarChart>
    </ResponsiveContainer>
  );
}

function AvgTimeChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={avgTimeData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="topic" />
        <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Bar dataKey="time" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const avatar = user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random`;
  const name = user?.name || "User";
  // TODO: Replace the following with real user stats from backend when available
  const stats = {
    courses: 0,
    quizzes: 0,
    progress: 0,
    streak: 0,
    totalScore: 0,
    averageScore: 0,
  };

  return (
    <div className="w-full min-h-screen p-4">
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {name}! 👋</h1>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1">
            <CalendarDays size={18} />
            <span className="text-sm">{today}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 rounded-xl px-4 py-2 shadow">
            <Image
              src={avatar}
              alt="User Avatar"
              width={48}
              height={48}
              className="rounded-full border-2 border-primary"
            />
            <div className="hidden sm:block">
              <span className="font-semibold text-gray-800 dark:text-gray-100 block">{name}</span>
              {/* Membership info can be added here if available in session */}
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
              <p className="text-3xl font-bold">{stats.quizzes}</p>
              <p className="text-blue-100 text-sm mt-1">+0 this month</p>
            </div>
            <BookOpen size={32} className="text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Average Score</p>
              <p className="text-3xl font-bold">{stats.averageScore}%</p>
              <p className="text-green-100 text-sm mt-1">+0% improvement</p>
            </div>
            <TrendingUp size={32} className="text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Study Streak</p>
              <p className="text-3xl font-bold">{stats.streak} days</p>
              <p className="text-purple-100 text-sm mt-1">Keep it up!</p>
            </div>
            <Target size={32} className="text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Overall Progress</p>
              <p className="text-3xl font-bold">{stats.progress}%</p>
              <p className="text-orange-100 text-sm mt-1">Course completion</p>
            </div>
            <BarChart2 size={32} className="text-orange-200" />
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Score Trends (Line Chart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Score Trends</h2>
          <ScoreTrendsChart />
        </div>
        {/* Accuracy (Pie Chart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Accuracy</h2>
          <AccuracyChart />
        </div>
        {/* Weak Topics (Bar Chart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Weak Topics</h2>
          <WeakTopicsChart />
        </div>
        {/* Average Time per Question (Bar Chart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Avg. Time per Question</h2>
          <AvgTimeChart />
        </div>
      </section>

      {/* TODO: Add user activity, upcoming tests, performance, and recommendations when backend data is available */}
    </div>
  );
} 