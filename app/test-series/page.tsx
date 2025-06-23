"use client";

import React, { useState } from "react";
import { Clock, Users, Star, BookOpen, Target, TrendingUp, Calendar, Award, Play, Lock } from "lucide-react";

// Mock data for test series
const testSeriesData = [
  {
    id: 1,
    title: "UPSC Civil Services 2024",
    category: "UPSC",
    description: "Comprehensive test series for UPSC Civil Services Examination 2024",
    totalTests: 25,
    duration: "3 hours per test",
    enrolledUsers: 15420,
    rating: 4.8,
    price: "₹2999",
    originalPrice: "₹3999",
    discount: "25% OFF",
    isPremium: true,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    subjects: ["General Studies", "CSAT", "Optional Papers"],
    features: ["Full Length Tests", "Subject-wise Tests", "Previous Year Papers", "Detailed Solutions"]
  },
  {
    id: 2,
    title: "CAT 2024 Complete Series",
    category: "CAT",
    description: "Complete test series for Common Admission Test 2024",
    totalTests: 20,
    duration: "2.5 hours per test",
    enrolledUsers: 8920,
    rating: 4.7,
    price: "₹1999",
    originalPrice: "₹2499",
    discount: "20% OFF",
    isPremium: true,
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    subjects: ["Quantitative Aptitude", "Verbal Ability", "Data Interpretation", "Logical Reasoning"],
    features: ["Sectional Tests", "Mock Tests", "Performance Analytics", "Expert Doubt Support"]
  },
  {
    id: 3,
    title: "SSC CGL 2024 Test Series",
    category: "SSC",
    description: "Specialized test series for SSC Combined Graduate Level Examination",
    totalTests: 18,
    duration: "2 hours per test",
    enrolledUsers: 12350,
    rating: 4.6,
    price: "₹1499",
    originalPrice: "₹1999",
    discount: "25% OFF",
    isPremium: false,
    startDate: "2024-01-20",
    endDate: "2024-10-31",
    subjects: ["General Intelligence", "General Knowledge", "Quantitative Aptitude", "English Language"],
    features: ["Tier I & II Tests", "Previous Year Questions", "Performance Reports", "Mobile App Access"]
  },
  {
    id: 4,
    title: "Bank PO 2024 Series",
    category: "Bank PO",
    description: "Complete preparation for Bank Probationary Officer examinations",
    totalTests: 22,
    duration: "2.5 hours per test",
    enrolledUsers: 9870,
    rating: 4.5,
    price: "₹1799",
    originalPrice: "₹2299",
    discount: "22% OFF",
    isPremium: true,
    startDate: "2024-02-10",
    endDate: "2024-11-30",
    subjects: ["Reasoning", "Quantitative Aptitude", "English", "General Awareness"],
    features: ["Bank-specific Tests", "Current Affairs", "Interview Preparation", "Study Material"]
  },
  {
    id: 5,
    title: "GRE 2024 Test Series",
    category: "GRE",
    description: "Comprehensive GRE preparation with adaptive testing",
    totalTests: 15,
    duration: "3.5 hours per test",
    enrolledUsers: 5670,
    rating: 4.9,
    price: "₹3999",
    originalPrice: "₹4999",
    discount: "20% OFF",
    isPremium: true,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    subjects: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
    features: ["Adaptive Tests", "Official GRE Format", "Score Predictor", "International Standards"]
  },
  {
    id: 6,
    title: "GMAT 2024 Complete Series",
    category: "GMAT",
    description: "Full GMAT preparation with integrated reasoning",
    totalTests: 12,
    duration: "3 hours per test",
    enrolledUsers: 4230,
    rating: 4.8,
    price: "₹4499",
    originalPrice: "₹5499",
    discount: "18% OFF",
    isPremium: true,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    subjects: ["Quantitative", "Verbal", "Integrated Reasoning", "Analytical Writing"],
    features: ["Official GMAT Format", "Score Analysis", "Business School Focus", "Expert Mentoring"]
  }
];

const categories = [
  { id: "all", name: "All Tests", icon: BookOpen },
  { id: "upsc", name: "UPSC", icon: Target },
  { id: "cat", name: "CAT", icon: TrendingUp },
  { id: "ssc", name: "SSC", icon: Award },
  { id: "bank-po", name: "Bank PO", icon: Users },
  { id: "gre", name: "GRE", icon: Star },
  { id: "gmat", name: "GMAT", icon: Clock }
];

export default function TestSeriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTests = testSeriesData.filter(test => {
    const matchesCategory = selectedCategory === "all" || test.category.toLowerCase() === selectedCategory;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen p-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Test Series
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Master your exams with our comprehensive test series. Practice with real exam patterns, 
          track your progress, and boost your confidence before the actual test.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search test series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
              Sort by Popularity
            </button>
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              Filter
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
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

      {/* Test Series Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div key={test.id} className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {test.category}
                    </span>
                    {test.isPremium && (
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-200/20 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {test.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {test.description}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-blue-500" size={16} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {test.totalTests} Tests
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-green-500" size={16} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {test.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-purple-500" size={16} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {test.enrolledUsers.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500" size={16} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {test.rating}
                  </span>
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subjects:</h4>
                <div className="flex flex-wrap gap-1">
                  {test.subjects.slice(0, 3).map((subject, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded">
                      {subject}
                    </span>
                  ))}
                  {test.subjects.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded">
                      +{test.subjects.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features:</h4>
                <ul className="space-y-1">
                  {test.features.slice(0, 2).map((feature, index) => (
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
                    <span className="text-2xl font-bold text-primary">{test.price}</span>
                    <span className="text-sm text-gray-500 line-through">{test.originalPrice}</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-200/20 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                      {test.discount}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Calendar size={12} />
                    Valid till {new Date(test.endDate).toLocaleDateString()}
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                  {test.isPremium ? <Lock size={16} /> : <Play size={16} />}
                  {test.isPremium ? "Enroll Now" : "Start Free"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No test series found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Ace Your Exam?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of students who have improved their scores with our test series
          </p>
          <button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition">
            Browse All Test Series
          </button>
        </div>
      </div>
    </div>
  );
} 