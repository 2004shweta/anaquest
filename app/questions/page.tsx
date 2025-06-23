"use client";
import { useState } from 'react';
import { questions, Question } from '../../lib/questions';

const unique = (arr: string[]) => Array.from(new Set(arr));

export default function QuestionsPage() {
  const [examType, setExamType] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [tag, setTag] = useState('');

  const examTypes = unique(questions.map(q => q.examType));
  const topics = unique(questions.map(q => q.topic));
  const difficulties = unique(questions.map(q => q.difficulty));
  const tags = unique(questions.flatMap(q => q.tags));

  const filtered = questions.filter(q =>
    (!examType || q.examType === examType) &&
    (!topic || q.topic === topic) &&
    (!difficulty || q.difficulty === difficulty) &&
    (!tag || q.tags.includes(tag))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-2">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-8 drop-shadow">Question Bank</h1>
        <div className="flex flex-wrap gap-4 mb-10 justify-center bg-white/80 rounded-xl shadow-lg p-4">
          <select value={examType} onChange={e => setExamType(e.target.value)} className="border-2 border-primary/30 focus:border-primary p-2 rounded-lg transition w-48">
            <option value="">All Exam Types</option>
            {examTypes.map(et => <option key={et} value={et}>{et}</option>)}
          </select>
          <select value={topic} onChange={e => setTopic(e.target.value)} className="border-2 border-primary/30 focus:border-primary p-2 rounded-lg transition w-48">
            <option value="">All Topics</option>
            {topics.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="border-2 border-primary/30 focus:border-primary p-2 rounded-lg transition w-48">
            <option value="">All Difficulties</option>
            {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={tag} onChange={e => setTag(e.target.value)} className="border-2 border-primary/30 focus:border-primary p-2 rounded-lg transition w-48">
            <option value="">All Tags</option>
            {tags.map(tg => <option key={tg} value={tg}>{tg}</option>)}
          </select>
        </div>
        <ul className="space-y-8">
          {filtered.map(q => (
            <li key={q.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow p-6 border border-primary/10">
              <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
                <span className="font-semibold text-primary text-lg flex items-center gap-2">
                  <span className="inline-block px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">{q.examType}</span>
                  <span className="inline-block px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide">{q.topic}</span>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${q.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{q.difficulty}</span>
                </span>
                <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">⏱ {q.timer}s</span>
              </div>
              <div className="mb-4 text-lg font-medium text-gray-800">{q.questionText}</div>
              <ul className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, i) => (
                  <li key={i} className="">
                    <span className="block px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-primary/10 transition cursor-pointer select-none">
                      {opt}
                    </span>
                  </li>
                ))}
              </ul>
              <span className="font-semibold text-primary">Solution:</span> <span className="text-gray-700">{q.solutionText}</span>
              {q.solutionVideo && q.solutionVideo !== '' && (
                <div className="mt-2">
                  <video src={q.solutionVideo} controls className="w-full max-w-xs rounded-lg border border-primary/20 shadow" />
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {q.tags.map(tag => (
                  <span key={tag} className="bg-gradient-to-r from-primary/10 to-purple-100 text-primary px-3 py-1 rounded-full text-xs font-semibold shadow-sm hover:from-primary/20 hover:to-purple-200 transition">
                    #{tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
          {filtered.length === 0 && <li className="text-center text-gray-500 text-lg">No questions found.</li>}
        </ul>
      </div>
    </div>
  );
} 