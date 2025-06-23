"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pencil, Mail, User, CalendarDays, Award, LogOut, CheckCircle, BarChart2, BookOpen, TrendingUp, Lock } from "lucide-react";

const mockUser = {
  name: "Alex Johnson",
  avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random",
  email: "alex.johnson@email.com",
  membership: "Premium",
  joinDate: "2024-01-15",
  stats: {
    quizzes: 24,
    avgScore: 82,
    streak: 12,
    progress: 78,
    rank: 5,
    badges: ["Top Scorer", "Streak Master", "Quiz Pro"]
  },
  bio: "Passionate learner and quiz enthusiast. Preparing for competitive exams with Anaquest.",
  interests: ["UPSC", "CAT", "Current Affairs", "Math Puzzles"],
  achievements: [
    { title: "Top 1% in UPSC Mock", date: "2024-03-10" },
    { title: "30-Day Study Streak", date: "2024-02-20" },
    { title: "CAT Quant Champion", date: "2024-01-30" }
  ]
};

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(mockUser.bio);
  const [interests, setInterests] = useState(mockUser.interests.join(", "));

  const handleSave = () => {
    setEditMode(false);
    // Here you would update the user profile in your backend
  };

  return (
    <div className="w-full min-h-screen p-4">
      {/* Profile Header */}
      <div className="w-full max-w-6xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 flex flex-col sm:flex-row items-center gap-8 mb-10">
        <div className="relative">
          <Image
            src={mockUser.avatar}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full border-4 border-primary shadow-lg"
          />
          <button className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow hover:bg-primary/90 transition">
            <Pencil size={16} />
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            {mockUser.name}
            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-200/20 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full">
              {mockUser.membership}
            </span>
          </h1>
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 mb-2">
            <Mail size={16} />
            <span>{mockUser.email}</span>
            <CalendarDays size={16} />
            <span>Joined {new Date(mockUser.joinDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {mockUser.stats.badges.map((badge, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-200/20 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                {badge}
              </span>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg text-center">
          <BookOpen size={28} className="mx-auto mb-2" />
          <div className="text-2xl font-bold">{mockUser.stats.quizzes}</div>
          <div className="text-sm">Quizzes</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg text-center">
          <TrendingUp size={28} className="mx-auto mb-2" />
          <div className="text-2xl font-bold">{mockUser.stats.avgScore}%</div>
          <div className="text-sm">Avg Score</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg text-center">
          <CheckCircle size={28} className="mx-auto mb-2" />
          <div className="text-2xl font-bold">{mockUser.stats.streak}</div>
          <div className="text-sm">Day Streak</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg text-center">
          <BarChart2 size={28} className="mx-auto mb-2" />
          <div className="text-2xl font-bold">{mockUser.stats.progress}%</div>
          <div className="text-sm">Progress</div>
        </div>
      </div>

      {/* Editable Bio & Interests */}
      <div className="w-full max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">About Me</h2>
          {!editMode && (
            <button className="text-primary hover:underline flex items-center gap-1" onClick={() => setEditMode(true)}>
              <Pencil size={16} /> Edit
            </button>
          )}
        </div>
        {editMode ? (
          <>
            <textarea
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
            <input
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={interests}
              onChange={e => setInterests(e.target.value)}
              placeholder="Interests (comma separated)"
            />
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg" onClick={handleSave}>Save</button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{bio}</p>
            <div className="flex flex-wrap gap-2">
              {interests.split(",").map((interest, idx) => (
                <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {interest.trim()}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Achievements */}
      <div className="w-full max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Achievements</h2>
        <ul className="space-y-3">
          {mockUser.achievements.map((ach, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <Award className="text-yellow-500" size={22} />
              <span className="font-medium text-gray-900 dark:text-white">{ach.title}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(ach.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 