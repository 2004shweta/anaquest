"use client";

import React, { useState } from "react";
import { Clock, Users, Star, BookOpen, Target, Filter, Search, Play, Lock, Award, TrendingUp, Calendar, BarChart2 } from "lucide-react";

const categories = [
  { id: "all", name: "All Tests", icon: BookOpen },
  { id: "quantitative", name: "Quantitative", icon: Target },
  { id: "verbal", name: "Verbal", icon: Award },
  { id: "ir", name: "Integrated Reasoning", icon: TrendingUp },
  { id: "awa", name: "Analytical Writing", icon: Users },
  { id: "mock", name: "Mock Tests", icon: Calendar }
];

const assessments = [
  {
    id: 1,
    testName: "GMAT Quantitative - Problem Solving",
    testType: "Quantitative",
    category: "quantitative",
    questions: 31,
    minutes: 62,
    difficulty: "Hard",
    enrolledUsers: 18920,
    rating: 4.8,
    price: "Free",
    isPremium: false,
    lastUpdated: "2024-01-15",
    description: "Complete GMAT quantitative section with problem solving questions",
    subjects: ["Arithmetic", "Algebra", "Geometry", "Word Problems", "Data Sufficiency"],
    features: ["Official GMAT Format", "Detailed Solutions", "Performance Analytics", "Score Predictor"]
  },
  {
    id: 2,
    testName: "GMAT Verbal - Critical Reasoning",
    testType: "Verbal",
    category: "verbal",
    questions: 36,
    minutes: 65,
    difficulty: "Hard",
    enrolledUsers: 15680,
    rating: 4.7,
    price: "₹299",
    isPremium: true,
    lastUpdated: "2024-01-14",
    description: "Advanced critical reasoning with argument analysis",
    subjects: ["Critical Reasoning", "Reading Comprehension", "Sentence Correction"],
    features: ["Argument Analysis", "Logical Thinking", "Grammar Rules", "Expert Solutions"]
  },
  {
    id: 3,
    testName: "GMAT Integrated Reasoning - Multi-Source",
    testType: "Integrated Reasoning",
    category: "ir",
    questions: 12,
    minutes: 30,
    difficulty: "Very Hard",
    enrolledUsers: 12340,
    rating: 4.9,
    price: "₹399",
    isPremium: true,
    lastUpdated: "2024-01-13",
    description: "Complex multi-source reasoning with data interpretation",
    subjects: ["Multi-Source Reasoning", "Table Analysis", "Graphics Interpretation", "Two-Part Analysis"],
    features: ["Data Visualization", "Multi-Source Analysis", "Time Management", "Pattern Recognition"]
  },
  {
    id: 4,
    testName: "GMAT Analytical Writing - Issue Essay",
    testType: "Analytical Writing",
    category: "awa",
    questions: 1,
    minutes: 30,
    difficulty: "Medium",
    enrolledUsers: 8920,
    rating: 4.6,
    price: "₹199",
    isPremium: true,
    lastUpdated: "2024-01-12",
    description: "Issue essay writing with expert evaluation",
    subjects: ["Essay Writing", "Argument Analysis", "Critical Thinking", "Business Topics"],
    features: ["Essay Evaluation", "Expert Feedback", "Writing Templates", "Score Analysis"]
  },
  {
    id: 5,
    testName: "GMAT Mock Test 1 - Complete Exam",
    testType: "Mock Test",
    category: "mock",
    questions: 80,
    minutes: 187,
    difficulty: "Hard",
    enrolledUsers: 23450,
    rating: 4.8,
    price: "₹599",
    isPremium: true,
    lastUpdated: "2024-01-10",
    description: "Complete GMAT mock test simulating actual exam conditions",
    subjects: ["Quantitative", "Verbal", "Integrated Reasoning", "Analytical Writing"],
    features: ["Full Mock Test", "Real Exam Interface", "Detailed Analysis", "Percentile Ranking"]
  },
  {
    id: 6,
    testName: "GMAT Previous Year - 2023",
    testType: "Previous Year",
    category: "mock",
    questions: 80,
    minutes: 187,
    difficulty: "Hard",
    enrolledUsers: 28750,
    rating: 4.9,
    price: "₹299",
    isPremium: true,
    lastUpdated: "2024-01-08",
    description: "Actual GMAT 2023 questions with official solutions",
    subjects: ["Quantitative", "Verbal", "Integrated Reasoning", "Analytical Writing"],
    features: ["Official Questions", "Detailed Solutions", "Performance Comparison", "Topic Analysis"]
  },
  {
    id: 7,
    testName: "GMAT Data Sufficiency - Advanced",
    testType: "Quantitative",
    category: "quantitative",
    questions: 20,
    minutes: 40,
    difficulty: "Very Hard",
    enrolledUsers: 14560,
    rating: 4.7,
    price: "₹249",
    isPremium: true,
    lastUpdated: "2024-01-05",
    description: "Advanced data sufficiency questions with strategies",
    subjects: ["Data Sufficiency", "Logical Reasoning", "Mathematical Concepts"],
    features: ["Strategy Development", "Logical Thinking", "Practice Sets", "Expert Tips"]
  },
  {
    id: 8,
    testName: "GMAT Sentence Correction - Grammar",
    testType: "Verbal",
    category: "verbal",
    questions: 25,
    minutes: 45,
    difficulty: "Medium",
    enrolledUsers: 16780,
    rating: 4.5,
    price: "₹179",
    isPremium: true,
    lastUpdated: "2024-01-03",
    description: "Comprehensive grammar and sentence correction practice",
    subjects: ["Grammar Rules", "Sentence Structure", "Idioms", "Parallelism"],
    features: ["Grammar Rules", "Practice Questions", "Error Analysis", "Regular Updates"]
  }
];

export default function GMATQuizPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const filteredAssessments = assessments.filter(assessment => {
    const matchesCategory = selectedCategory === "all" || assessment.category === selectedCategory;
    const matchesSearch = assessment.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assessment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || assessment.difficulty.toLowerCase() === difficultyFilter;
    return matchesCategory && matchesSearch && matchesDifficulty;
  });

  return (
    <div className="w-full min-h-screen p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          GMAT Quiz Portal
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Master the Graduate Management Admission Test with our comprehensive practice series. 
          From Quantitative to Verbal, excel in every section for global B-schools.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-primary mb-1">67</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Tests</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-green-600 mb-1">18.9K</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Active Students</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-purple-600 mb-1">85%</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Avg Score</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-orange-600 mb-1">12</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">New This Month</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="very hard">Very Hard</option>
            </select>
            <button className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <IconComponent size={18} />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => (
          <div key={assessment.id} className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assessment.category === "quantitative" ? "bg-blue-100 text-blue-700 dark:bg-blue-200/20 dark:text-blue-300" :
                    assessment.category === "verbal" ? "bg-green-100 text-green-700 dark:bg-green-200/20 dark:text-green-300" :
                    assessment.category === "ir" ? "bg-purple-100 text-purple-700 dark:bg-purple-200/20 dark:text-purple-300" :
                    assessment.category === "awa" ? "bg-orange-100 text-orange-700 dark:bg-orange-200/20 dark:text-orange-300" :
                    "bg-red-100 text-red-700 dark:bg-red-200/20 dark:text-red-300"
                  }`}>
                    {assessment.testType}
                  </span>
                  {assessment.isPremium && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-200/20 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {assessment.testName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {assessment.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="text-blue-500" size={16} />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {assessment.questions} Qs
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-green-500" size={16} />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {assessment.minutes}m
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-purple-500" size={16} />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {assessment.enrolledUsers.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={16} />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {assessment.rating}
                </span>
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subjects:</h4>
              <div className="flex flex-wrap gap-1">
                {assessment.subjects.slice(0, 3).map((subject, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded">
                    {subject}
                  </span>
                ))}
                {assessment.subjects.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded">
                    +{assessment.subjects.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features:</h4>
              <ul className="space-y-1">
                {assessment.features.slice(0, 2).map((feature, index) => (
                  <li key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">{assessment.price}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Updated {new Date(assessment.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <BarChart2 size={12} />
                  {assessment.difficulty} Level
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                {assessment.isPremium ? <Lock size={16} /> : <Play size={16} />}
                {assessment.isPremium ? "Enroll" : "Start Free"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAssessments.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No tests found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
} 