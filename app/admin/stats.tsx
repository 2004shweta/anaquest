"use client";

import React from "react";
import { Users, BookOpen, BarChart2, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Users", value: 1200, icon: <Users className="w-8 h-8 text-primary" /> },
  { label: "Total Questions", value: 3400, icon: <BookOpen className="w-8 h-8 text-green-600" /> },
  { label: "Quizzes Taken", value: 5400, icon: <BarChart2 className="w-8 h-8 text-blue-600" /> },
  { label: "Average Score", value: "78%", icon: <TrendingUp className="w-8 h-8 text-orange-600" /> },
];

export default function PlatformStatsPage() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl mt-8">
      <h1 className="text-2xl font-bold mb-6 text-primary">Platform Stats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map(stat => (
          <div key={stat.label} className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            {stat.icon}
            <div>
              <div className="text-lg font-semibold">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 