"use client";

import React, { useState } from "react";
import { Clock, Users, Star, BookOpen, Target, Filter, Search, Play, Lock, Award, TrendingUp, Calendar, BarChart2 } from "lucide-react";

const categories = [
  { id: "all", name: "All Tests", icon: BookOpen },
  { id: "quantitative", name: "Quantitative", icon: Target },
  { id: "verbal", name: "Verbal", icon: Award },
  { id: "di", name: "Data Interpretation", icon: TrendingUp },
  { id: "lr", name: "Logical Reasoning", icon: Users },
  { id: "mock", name: "Mock Tests", icon: Calendar }
];

const assessments = [
  {
    id: 1,
    testName: "CAT Quantitative Aptitude - Full Length",
    testType: "Quantitative",
    category: "quantitative",
    questions: 34,
    minutes: 60,
    difficulty: "Hard",
    enrolledUsers: 28750,
    rating: 4.8,
    price: "Free",
    isPremium: false,
    lastUpdated: "2024-01-15",
    description: "Complete quantitative aptitude test covering all major topics",
    subjects: ["Number System", "Algebra", "Geometry", "Arithmetic", "Modern Math"],
    features: ["Full Length Test", "Detailed Solutions", "Performance Analytics", "Topic-wise Analysis"]
  },
  {
    id: 2,
    testName: "CAT Verbal Ability - Reading Comprehension",
    testType: "Verbal",
    category: "verbal",
    questions: 24,
    minutes: 40,
    difficulty: "Medium",
    enrolledUsers: 23450,
    rating: 4.6,
    price: "₹199",
    isPremium: true,
    lastUpdated: "2024-01-14",
    description: "Advanced reading comprehension with critical reasoning",
    subjects: ["Reading Comprehension", "Verbal Logic", "Para Jumbles", "Sentence Completion"],
    features: ["Passage Analysis", "Speed Reading", "Vocabulary Builder", "Expert Solutions"]
  },
  {
    id: 3,
    testName: "CAT Data Interpretation - Advanced",
    testType: "Data Interpretation",
    category: "di",
    questions: 20,
    minutes: 35,
    difficulty: "Very Hard",
    enrolledUsers: 18920,
    rating: 4.9,
    price: "₹299",
    isPremium: true,
    lastUpdated: "2024-01-13",
    description: "Complex data interpretation with multiple data sets",
    subjects: ["Tables", "Graphs", "Charts", "Caselets", "Data Sufficiency"],
    features: ["Data Visualization", "Calculation Techniques", "Time Management", "Pattern Recognition"]
  },
  {
    id: 4,
    testName: "CAT Logical Reasoning - Puzzles",
    testType: "Logical Reasoning",
    category: "lr",
    questions: 16,
    minutes: 25,
    difficulty: "Hard",
    enrolledUsers: 15680,
    rating: 4.7,
    price: "₹249",
    isPremium: true,
    lastUpdated: "2024-01-12",
    description: "Advanced logical reasoning with puzzle solving",
    subjects: ["Blood Relations", "Direction Sense", "Seating Arrangement", "Coding-Decoding"],
    features: ["Puzzle Solving", "Logical Thinking", "Speed Techniques", "Practice Sets"]
  },
  {
    id: 5,
    testName: "CAT Mock Test 1 - Complete Paper",
    testType: "Mock Test",
    category: "mock",
    questions: 66,
    minutes: 120,
    difficulty: "Hard",
    enrolledUsers: 45230,
    rating: 4.8,
    price: "₹399",
    isPremium: true,
    lastUpdated: "2024-01-10",
    description: "Complete CAT mock test simulating actual exam conditions",
    subjects: ["Quantitative", "Verbal", "Data Interpretation", "Logical Reasoning"],
    features: ["Full Mock Test", "Real Exam Interface", "Detailed Analysis", "Percentile Ranking"]
  },
  {
    id: 6,
    testName: "CAT Previous Year - 2023",
    testType: "Previous Year",
    category: "mock",
    questions: 66,
    minutes: 120,
    difficulty: "Hard",
    enrolledUsers: 52340,
    rating: 4.9,
    price: "₹199",
    isPremium: true,
    lastUpdated: "2024-01-08",
    description: "Actual CAT 2023 paper with official solutions",
    subjects: ["Quantitative", "Verbal", "Data Interpretation", "Logical Reasoning"],
    features: ["Official Paper", "Detailed Solutions", "Performance Comparison", "Topic Analysis"]
  },
  {
    id: 7,
    testName: "CAT Speed Math - Quick Calculations",
    testType: "Quantitative",
    category: "quantitative",
    questions: 20,
    minutes: 15,
    difficulty: "Medium",
    enrolledUsers: 18750,
    rating: 4.5,
    price: "Free",
    isPremium: false,
    lastUpdated: "2024-01-05",
    description: "Speed mathematics techniques for quick calculations",
    subjects: ["Mental Math", "Shortcuts", "Approximation", "Vedic Math"],
    features: ["Speed Techniques", "Mental Calculation", "Time Saving", "Practice Drills"]
  },
  {
    id: 8,
    testName: "CAT Vocabulary Builder - Advanced",
    testType: "Verbal",
    category: "verbal",
    questions: 30,
    minutes: 20,
    difficulty: "Medium",
    enrolledUsers: 12340,
    rating: 4.6,
    price: "₹149",
    isPremium: true,
    lastUpdated: "2024-01-03",
    description: "Advanced vocabulary building for CAT verbal section",
    subjects: ["Word Lists", "Synonyms", "Antonyms", "Context Usage", "Word Roots"],
    features: ["Vocabulary Lists", "Context Learning", "Memory Techniques", "Regular Updates"]
  }
];

export default function CATQuizPage() {
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
          CAT Quiz Portal
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Master the Common Admission Test with our comprehensive practice series. 
          From Quantitative to Verbal, excel in every section.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-primary mb-1">89</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Tests</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-green-600 mb-1">28.7K</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Active Students</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-purple-600 mb-1">82%</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Avg Score</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 text-center shadow-lg">
          <div className="text-2xl font-bold text-orange-600 mb-1">18</div>
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
                    assessment.category === "di" ? "bg-purple-100 text-purple-700 dark:bg-purple-200/20 dark:text-purple-300" :
                    assessment.category === "lr" ? "bg-orange-100 text-orange-700 dark:bg-orange-200/20 dark:text-orange-300" :
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