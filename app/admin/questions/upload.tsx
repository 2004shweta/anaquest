"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadQuestionPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState(0);

  const handleOptionChange = (idx: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === idx ? value : opt)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add backend logic
    alert("Question submitted! (Backend not implemented)");
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl mt-8">
      <h1 className="text-2xl font-bold mb-6 text-primary">Upload New Question</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-semibold">Question</label>
        <textarea
          className="p-2 border rounded"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          required
        />
        <label className="font-semibold">Options</label>
        {options.map((opt, idx) => (
          <input
            key={idx}
            className="p-2 border rounded"
            value={opt}
            onChange={e => handleOptionChange(idx, e.target.value)}
            placeholder={`Option ${idx + 1}`}
            required
          />
        ))}
        <label className="font-semibold">Correct Answer</label>
        <select
          className="p-2 border rounded"
          value={answer}
          onChange={e => setAnswer(Number(e.target.value))}
        >
          {options.map((_, idx) => (
            <option key={idx} value={idx}>{`Option ${idx + 1}`}</option>
          ))}
        </select>
        <Button type="submit" className="mt-4">Submit</Button>
      </form>
    </div>
  );
} 