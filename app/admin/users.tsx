"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const mockUsers = [
  { id: 1, name: "Alice", quizzesTaken: 12, avgScore: 85 },
  { id: 2, name: "Bob", quizzesTaken: 8, avgScore: 72 },
];

export default function ManageUsersPage() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl mt-8">
      <h1 className="text-2xl font-bold mb-6 text-primary">Manage User Performance</h1>
      <ul className="space-y-4">
        {mockUsers.map(user => (
          <li key={user.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
            <div className="font-semibold">{user.name}</div>
            <div className="flex gap-4">
              <span>Quizzes Taken: <b>{user.quizzesTaken}</b></span>
              <span>Avg Score: <b>{user.avgScore}%</b></span>
            </div>
            <Button variant="outline">View</Button>
          </li>
        ))}
      </ul>
    </div>
  );
} 