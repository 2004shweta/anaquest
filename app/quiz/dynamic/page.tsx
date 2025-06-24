"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Lightbulb, ListChecks, BookOpen, Layers, Hash, Sparkles, ArrowLeft, ArrowRight, PlusCircle, Trophy } from "lucide-react";
import Image from "next/image";

const EXAMS = [
  'CAT', 'GRE', 'GMAT', 'SAT', 'SSC', 'UPSC', 'Bank PO', 'JEE', 'NEET', 'GATE', 'CLAT', 'Railways', 'Defence', 'NET', 'Other'
];
const LEVELS = ['Easy', 'Medium', 'Hard'];
const TOPICS = [
  'Algebra', 'Geometry', 'Arithmetic', 'Data Interpretation', 'Logical Reasoning', 'Verbal Ability', 'General Knowledge', 'Science', 'History', 'Geography', 'Current Affairs', 'Other'
];

export default function DynamicQuizPage() {
  const [level, setLevel] = useState('Easy');
  const [topic, setTopic] = useState('Algebra');
  const [exam, setExam] = useState('CAT');
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState<any[]>([]); // {questionText, options, answer, solutionText}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQuestions([]);
    setCurrent(0);
    setSelectedOption(null);
    setShowSolution(false);
    try {
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, topic, exam, numQuestions }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.questions) {
          setQuestions(data.questions);
        } else if (data.question) {
          setQuestions([data.question]);
        }
      } else {
        setError(data.error || 'Failed to generate question');
      }
    } catch (err) {
      setError('Failed to generate question');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (idx: number) => {
    if (showSolution) return;
    setSelectedOption(idx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || showSolution) return;
    setShowSolution(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelectedOption(null);
      setShowSolution(false);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(c => c - 1);
      setSelectedOption(null);
      setShowSolution(false);
    }
  };

  const handleGenerateNew = () => {
    setQuestions([]);
    setSelectedOption(null);
    setShowSolution(false);
    setCurrent(0);
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-center justify-center min-h-[80vh] bg-transparent gap-8 md:gap-16 px-2 md:px-8">
      {/* Left: Form */}
      <div className="flex-1 max-w-md w-full flex flex-col items-center md:items-end justify-center md:justify-center py-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" size={28} />
          Generate a Custom Question
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm">
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <Layers className="text-blue-500" size={18} /> Level
            </label>
            <select value={level} onChange={e => setLevel(e.target.value)} style={{ background: 'var(--input)', color: 'var(--foreground)' }} className="w-full border rounded p-2">
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <ListChecks className="text-green-500" size={18} /> Topic
            </label>
            <select value={topic} onChange={e => setTopic(e.target.value)} style={{ background: 'var(--input)', color: 'var(--foreground)' }} className="w-full border rounded p-2">
              {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <BookOpen className="text-purple-500" size={18} /> Exam
            </label>
            <select value={exam} onChange={e => setExam(e.target.value)} style={{ background: 'var(--input)', color: 'var(--foreground)' }} className="w-full border rounded p-2">
              {EXAMS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <Hash className="text-pink-500" size={18} /> Number of Questions
            </label>
            <Input
              type="number"
              min={1}
              max={10}
              value={numQuestions}
              onChange={e => setNumQuestions(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 justify-center text-base font-semibold shadow hover:bg-blue-700 transition-colors" disabled={loading}>
            <Sparkles className="text-yellow-200 animate-bounce" size={20} />
            {loading ? 'Generating...' : 'Generate Question'}
          </button>
        </form>
        {error && <div className="text-red-600 mt-4 text-center w-full">{error}</div>}
      </div>
      {/* Right: Question Card */}
      <div className="flex-1 max-w-xl w-full flex flex-col items-center md:items-start justify-center py-6">
        {questions.length > 0 && (
          <Card className="w-full max-w-lg shadow-lg border border-primary/20 bg-white dark:bg-gray-900 rounded-xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
              <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                <Trophy className="text-amber-400" size={22} />
                Question {current + 1} of {questions.length}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handlePrev}
                  disabled={current === 0}
                  className="flex items-center gap-1"
                >
                  <ArrowLeft size={16} /> Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleNext}
                  disabled={current === questions.length - 1}
                  className="flex items-center gap-1"
                >
                  Next <ArrowRight size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-8 px-6 text-xl font-medium text-gray-900 dark:text-gray-100 min-h-[120px] flex flex-col items-center justify-center text-center">
              <div className="mb-6">{questions[current].questionText}</div>
              <ul className="w-full max-w-md space-y-3">
                {questions[current].options && questions[current].options.map((opt: string, i: number) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = showSolution && questions[current].answer === i;
                  const isWrong = showSolution && isSelected && !isCorrect;
                  return (
                    <li key={i}>
                      <Button
                        variant="outline"
                        className={`w-full text-left px-3 py-2 rounded border transition-all duration-200 ${
                          showSolution
                            ? isCorrect
                              ? 'bg-green-100 border-green-400'
                              : isWrong
                              ? 'bg-red-100 border-red-400'
                              : ''
                            : isSelected
                            ? 'bg-blue-100 border-primary'
                            : ''
                        }`}
                        disabled={showSolution}
                        onClick={() => handleOptionSelect(i)}
                      >
                        <span className="flex items-center gap-2">
                          {showSolution && isCorrect && <span className="text-green-500 font-bold">✔</span>}
                          {showSolution && isWrong && <span className="text-red-500 font-bold">✖</span>}
                          {opt}
                        </span>
                      </Button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-end gap-2 mt-4 w-full">
                {showSolution ? (
                  <Button onClick={handleNext} disabled={current === questions.length - 1}>Next</Button>
                ) : (
                  <Button variant="default" onClick={handleAnswerSubmit} disabled={selectedOption === null}>Submit</Button>
                )}
              </div>
              {showSolution && (
                <div className="mt-4 w-full text-left">
                  <div className="font-semibold mb-1">Explanation:</div>
                  <div className="mb-2 text-gray-700">{questions[current].solutionText}</div>
                </div>
              )}
              {showSolution && selectedOption !== null && (
                <div className="mt-2 font-bold text-lg">
                  {selectedOption === questions[current].answer ? (
                    <span className="text-green-600">Correct!</span>
                  ) : (
                    <span className="text-red-600">Incorrect. Correct answer: {questions[current].options[questions[current].answer]}</span>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm" onClick={handleGenerateNew} className="flex items-center gap-1">
                <PlusCircle className="text-blue-500" size={18} /> Generate New
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
} 