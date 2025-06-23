"use client";

import React, { useState } from "react";
import { Clock, Users, Star, BookOpen, Target, Filter, Search, Play, Lock, Award, TrendingUp, Calendar, BarChart2 } from "lucide-react";

const categories = [
  { id: "all", name: "All Tests", icon: BookOpen },
  { id: "verbal", name: "Verbal Reasoning", icon: Target },
  { id: "quantitative", name: "Quantitative Reasoning", icon: Award },
  { id: "awa", name: "Analytical Writing", icon: TrendingUp },
  { id: "mock", name: "Mock Tests", icon: Calendar },
  { id: "adaptive", name: "Adaptive Tests", icon: Users }
];

const assessments = [
  {
    id: 1,
    testName: "GRE Verbal Reasoning - Advanced",
    testType: "Verbal Reasoning",
    category: "verbal",
    questions: 40,
    minutes: 60,
    difficulty: "Hard",
    enrolledUsers: 15680,
    rating: 4.8,
    price: "Free",
    isPremium: false,
    lastUpdated: "2024-01-15",
    description: "Advanced verbal reasoning with complex vocabulary and reading comprehension",
    subjects: ["Text Completion", "Sentence Equivalence", "Reading Comprehension", "Critical Reasoning"],
    features: ["Official GRE Format", "Detailed Solutions", "Performance Analytics", "Score Predictor"]
  },
  {
    id: 2,
    testName: "GRE Quantitative Reasoning - Problem Solving",
    testType: "Quantitative Reasoning",
    category: "quantitative",
    questions: 40,
    minutes: 70,
    difficulty: "Hard",
    enrolledUsers: 13450,
    rating: 4.7,
    price: "₹299",
    isPremium: true,
    lastUpdated: "2024-01-14",
    description: "Comprehensive quantitative reasoning with advanced mathematics",
    subjects: ["Arithmetic", "Algebra", "Geometry", "Data Analysis", "Word Problems"],
    features: ["Problem Solving", "Data Interpretation", "Mathematical Concepts", "Expert Solutions"]
  },
  {
    id: 3,
    testName: "GRE Analytical Writing - Issue Task",
    testType: "Analytical Writing",
    category: "awa",
    questions: 1,
    minutes: 30,
    difficulty: "Medium",
    enrolledUsers: 8920,
    rating: 4.6,
    price: "₹199",
    isPremium: true,
    lastUpdated: "2024-01-13",
    description: "Issue essay writing with expert evaluation and feedback",
    subjects: ["Essay Writing", "Argument Analysis", "Critical Thinking", "Academic Topics"],
    features: ["Essay Evaluation", "Expert Feedback", "Writing Templates", "Score Analysis"]
  },
  {
    id: 4,
    testName: "GRE Analytical Writing - Argument Task",
    testType: "Analytical Writing",
    category: "awa",
    questions: 1,
    minutes: 30,
    difficulty: "Medium",
    enrolledUsers: 7560,
    rating: 4.5,
    price: "₹199",
    isPremium: true,
    lastUpdated: "2024-01-12",
    description: "Argument analysis and critique with structured writing",
    subjects: ["Argument Analysis", "Logical Fallacies", "Critical Evaluation", "Structured Writing"],
    features: ["Argument Evaluation", "Logical Analysis", "Writing Structure", "Expert Review"]
  },
  {
    id: 5,
    testName: "GRE Mock Test 1 - Complete Exam",
    testType: "Mock Test",
    category: "mock",
    questions: 82,
    minutes: 160,
    difficulty: "Hard",
    enrolledUsers: 18920,
    rating: 4.8,
    price: "₹499",
    isPremium: true,
    lastUpdated: "2024-01-10",
    description: "Complete GRE mock test simulating actual exam conditions",
    subjects: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
    features: ["Full Mock Test", "Real Exam Interface", "Detailed Analysis", "Percentile Ranking"]
  },
  {
    id: 6,
    testName: "GRE Adaptive Test - Section 1",
    testType: "Adaptive Test",
    category: "adaptive",
    questions: 20,
    minutes: 30,
    difficulty: "Hard",
    enrolledUsers: 12340,
    rating: 4.9,
    price: "₹399",
    isPremium: true,
    lastUpdated: "2024-01-08",
    description: "Computer-adaptive GRE test with dynamic difficulty adjustment",
    subjects: ["Verbal", "Quantitative"],
    features: ["Adaptive Algorithm", "Real-time Scoring", "Difficulty Adjustment", "Performance Tracking"]
  },
  {
    id: 7,
    testName: "GRE Vocabulary Builder - Advanced",
    testType: "Verbal Reasoning",
    category: "verbal",
    questions: 30,
    minutes: 25,
    difficulty: "Medium",
    enrolledUsers: 16780,
    rating: 4.6,
    price: "₹149",
    isPremium: true,
    lastUpdated: "2024-01-05",
    description: "Advanced vocabulary building for GRE verbal section",
    subjects: ["Word Lists", "Synonyms", "Antonyms", "Context Usage", "Word Roots"],
    features: ["Vocabulary Lists", "Context Learning", "Memory Techniques", "Regular Updates"]
  },
  {
    id: 8,
    testName: "GRE Data Analysis - Advanced",
    testType: "Quantitative Reasoning",
    category: "quantitative",
    questions: 25,
    minutes: 35,
    difficulty: "Very Hard",
    enrolledUsers: 9870,
    rating: 4.7,
    price: "₹249",
    isPremium: true,
    lastUpdated: "2024-01-03",
    description: "Advanced data analysis and interpretation questions",
    subjects: ["Statistics", "Probability", "Graphs", "Charts", "Data Interpretation"],
    features: ["Data Visualization", "Statistical Analysis", "Problem Solving", "Expert Solutions"]
  }
];

export default function GREQuizPage() {
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
          GRE Quiz Portal
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Master the Graduate Record Examination with our comprehensive practice series. 
          From Verbal to Quantitative, excel in every section for graduate school admissions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-primary mb-1">73</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Tests</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-green-600 mb-1">15.7K</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Active Students</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-purple-600 mb-1">80%</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Avg Score</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-orange-600 mb-1">15</div>
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
                    assessment.category === "verbal" ? "bg-blue-100 text-blue-700 dark:bg-blue-200/20 dark:text-blue-300" :
                    assessment.category === "quantitative" ? "bg-green-100 text-green-700 dark:bg-green-200/20 dark:text-green-300" :
                    assessment.category === "awa" ? "bg-purple-100 text-purple-700 dark:bg-purple-200/20 dark:text-purple-300" :
                    assessment.category === "adaptive" ? "bg-orange-100 text-orange-700 dark:bg-orange-200/20 dark:text-orange-300" :
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