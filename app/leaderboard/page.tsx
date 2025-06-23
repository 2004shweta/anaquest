"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Select } from "@/components/ui/select";

const periods = ["Weekly", "Monthly", "All Time"];
const topics = ["All", "Quant", "Verbal", "Reasoning"];
const testTypes = ["All", "CAT", "GRE", "SSC"];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("Weekly");
  const [topic, setTopic] = useState("All");
  const [testType, setTestType] = useState("All");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchLeaderboard = async () => {
      const res = await fetch(`/api/leaderboard?period=${encodeURIComponent(period.toLowerCase())}&topic=${encodeURIComponent(topic)}&testType=${encodeURIComponent(testType)}`);
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    };
    fetchLeaderboard();
  }, [period, topic, testType]);

  return (
    <div className="w-full min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <select value={period} onChange={e => setPeriod(e.target.value)} className="border rounded px-3 py-2">
          {periods.map(p => <option key={p}>{p}</option>)}
        </select>
        <select value={topic} onChange={e => setTopic(e.target.value)} className="border rounded px-3 py-2">
          {topics.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={testType} onChange={e => setTestType(e.target.value)} className="border rounded px-3 py-2">
          {testTypes.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <ol className="space-y-6">
            {users.length === 0 && <div className="text-center text-gray-500">No users found.</div>}
            {users.map((user, idx) => (
              <li key={user.name} className="flex items-center gap-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 shadow">
                <span className="text-2xl font-bold w-8 text-center">{idx + 1}</span>
                <Image src={user.photo} alt={user.name} width={56} height={56} className="rounded-full border-4 border-primary" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{user.name}</div>
                  <div className="text-sm text-gray-500">XP: {user.xp}</div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">{user.xp} XP</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
} 