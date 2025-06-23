"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Clock, Target, TrendingUp, BookOpen, Award, Star, ArrowRight } from "lucide-react";

const exams = [
  {
    name: "UPSC",
    path: "/quiz/upsc",
    description: "Civil Services Examination - India's premier competitive exam",
    icon: "🏛️",
    totalTests: 156,
    enrolledUsers: 45230,
    avgScore: 78,
    difficulty: "Very High",
    duration: "2-3 years",
    subjects: ["General Studies", "CSAT", "Optional Papers"],
    features: ["Full Length Tests", "Previous Year Papers", "Current Affairs", "Interview Prep"]
  },
  {
    name: "CAT",
    path: "/quiz/cat",
    description: "Common Admission Test for IIMs and top B-schools",
    icon: "🎓",
    totalTests: 89,
    enrolledUsers: 28750,
    avgScore: 82,
    difficulty: "High",
    duration: "6-12 months",
    subjects: ["Quantitative Aptitude", "Verbal Ability", "Data Interpretation", "Logical Reasoning"],
    features: ["Sectional Tests", "Mock Tests", "Performance Analytics", "Expert Doubt Support"]
  },
  {
    name: "GMAT",
    path: "/quiz/gmat",
    description: "Graduate Management Admission Test for global B-schools",
    icon: "🌍",
    totalTests: 67,
    enrolledUsers: 18920,
    avgScore: 85,
    difficulty: "High",
    duration: "3-6 months",
    subjects: ["Quantitative", "Verbal", "Integrated Reasoning", "Analytical Writing"],
    features: ["Official GMAT Format", "Score Analysis", "Business School Focus", "International Standards"]
  },
  {
    name: "GRE",
    path: "/quiz/gre",
    description: "Graduate Record Examination for graduate school admissions",
    icon: "🎯",
    totalTests: 73,
    enrolledUsers: 15680,
    avgScore: 80,
    difficulty: "High",
    duration: "3-6 months",
    subjects: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
    features: ["Adaptive Tests", "Official GRE Format", "Score Predictor", "International Standards"]
  },
  {
    name: "SAT",
    path: "/quiz/sat",
    description: "Scholastic Assessment Test for US college admissions",
    icon: "🇺🇸",
    totalTests: 45,
    enrolledUsers: 12340,
    avgScore: 88,
    difficulty: "Medium",
    duration: "3-6 months",
    subjects: ["Evidence-Based Reading", "Writing and Language", "Math"],
    features: ["College Board Format", "Practice Tests", "Score Improvement", "US College Focus"]
  },
  {
    name: "Bank PO",
    path: "/quiz/bank-po",
    description: "Bank Probationary Officer examinations",
    icon: "🏦",
    totalTests: 92,
    enrolledUsers: 34120,
    avgScore: 75,
    difficulty: "Medium",
    duration: "6-12 months",
    subjects: ["Reasoning", "Quantitative Aptitude", "English", "General Awareness"],
    features: ["Bank-specific Tests", "Current Affairs", "Interview Preparation", "Study Material"]
  },
  {
    name: "SSC",
    path: "/quiz/ssc",
    description: "Staff Selection Commission examinations",
    icon: "👨‍💼",
    totalTests: 134,
    enrolledUsers: 52340,
    avgScore: 72,
    difficulty: "Medium",
    duration: "6-12 months",
    subjects: ["General Intelligence", "General Knowledge", "Quantitative Aptitude", "English Language"],
    features: ["Tier I & II Tests", "Previous Year Questions", "Performance Reports", "Mobile App Access"]
  }
];

const QuizPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Header Section */}
      <div className="w-full max-w-6xl text-center mb-12 mt-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400 drop-shadow-lg mb-4">
          Quiz Portal
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 font-medium mb-6 max-w-3xl mx-auto">
          Master competitive exams with our comprehensive quiz platform. Practice with real exam patterns, 
          track your progress, and boost your confidence.
        </p>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary via-purple-300 to-pink-300 rounded-full mb-8 animate-pulse" />
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="text-primary" size={20} />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">656</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Tests</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="text-green-500" size={20} />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">207K</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Active Users</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="text-purple-500" size={20} />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">79%</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Avg Score</p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="text-orange-500" size={20} />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">7</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Exam Types</p>
          </div>
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4 pb-12">
        {exams.map((exam) => (
          <div
            key={exam.name}
            className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-800 hover:scale-105 transform-gpu group"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{exam.icon}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors duration-300">
                  {exam.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{exam.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{exam.totalTests}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Tests</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{exam.enrolledUsers.toLocaleString()}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Students</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{exam.avgScore}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Avg Score</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{exam.difficulty}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Level</div>
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subjects:</h4>
              <div className="flex flex-wrap gap-1">
                {exam.subjects.slice(0, 3).map((subject, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {subject}
                  </span>
                ))}
                {exam.subjects.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                    +{exam.subjects.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features:</h4>
              <ul className="space-y-1">
                {exam.features.slice(0, 2).map((feature, index) => (
                  <li key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <Link href={exam.path} className="w-full">
              <Button className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-primary via-purple-300 to-pink-300 text-white shadow-md hover:from-pink-300 hover:to-primary hover:via-purple-400 transition-all duration-300 rounded-xl group-hover:shadow-lg">
                <span>Start {exam.name} Quiz</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="w-full max-w-4xl mx-auto text-center mb-12">
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Ace Your Exam?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of students who have improved their scores with our comprehensive quiz platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition">
              Browse All Tests
            </Button>
            <Button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition">
              View Performance
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizPage; 