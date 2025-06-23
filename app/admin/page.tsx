"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, BarChart2, Upload, Edit, Trash2 } from "lucide-react";

const adminFeatures = [
  {
    title: "Upload New Questions",
    description: "Add new questions to the platform.",
    icon: <Upload className="w-8 h-8 text-primary" />,
    href: "/admin/questions/upload",
  },
  {
    title: "Edit/Delete Questions",
    description: "Modify or remove existing questions.",
    icon: <Edit className="w-8 h-8 text-green-600" />,
    href: "/admin/questions/manage",
  },
  {
    title: "Manage User Performance",
    description: "View and manage user quiz results.",
    icon: <Users className="w-8 h-8 text-blue-600" />,
    href: "/admin/users",
  },
  {
    title: "Platform Stats",
    description: "View overall platform statistics.",
    icon: <BarChart2 className="w-8 h-8 text-orange-600" />,
    href: "/admin/stats",
  },
];

export default function AdminPanelPage() {
  return (
    <div className="w-full min-h-screen p-8 bg-gradient-to-br from-gray-50 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {adminFeatures.map((feature) => (
          <Link href={feature.href} key={feature.title}>
            <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 border border-gray-200 dark:border-gray-800 hover:scale-105 transition-transform cursor-pointer">
              {feature.icon}
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{feature.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 