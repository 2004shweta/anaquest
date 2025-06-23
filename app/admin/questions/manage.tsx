"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const mockQuestions = [
  { id: 1, text: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
  { id: 2, text: "Capital of France?", options: ["London", "Berlin", "Paris", "Rome"], answer: 2 },
];

export default function ManageQuestionsPage() {
  const [questions, setQuestions] = useState(mockQuestions);

  const handleEdit = (id: number) => {
    alert(`Edit question ${id} (Not implemented)`);
  };
  const handleDelete = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl mt-8">
      <h1 className="text-2xl font-bold mb-6 text-primary">Manage Questions</h1>
      <ul className="space-y-4">
        {questions.map(q => (
          <li key={q.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
            <div className="font-semibold">{q.text}</div>
            <div className="flex gap-2 flex-wrap">
              {q.options.map((opt, idx) => (
                <span key={idx} className={`px-2 py-1 rounded ${q.answer === idx ? "bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}>{opt}</span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" onClick={() => handleEdit(q.id)}><Edit className="w-4 h-4 mr-1" /> Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(q.id)}><Trash2 className="w-4 h-4 mr-1" /> Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 