"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { questions, Question } from '../../lib/questions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Flag, Bookmark } from "lucide-react";

const unique = (arr: string[]) => Array.from(new Set(arr));

const modes = [
  { key: 'topic', label: 'Topic-wise Practice' },
  { key: 'timed', label: 'Timed Practice' },
  { key: 'custom', label: 'Custom Quiz Generator' },
] as const;

type Mode = typeof modes[number]['key'];

export default function PracticePage() {
  // --- Global State ---
  const [mode, setMode] = useState<Mode>('topic');
  const [quizStatus, setQuizStatus] = useState<'configuring' | 'active' | 'finished'>('configuring');

  // --- Unified Quiz State ---
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  
  // Performance tracking
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [savedForLater, setSavedForLater] = useState<number[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(0);

  // --- Mode-specific configuration state ---
  const topics = unique(questions.map(q => q.topic));
  const difficulties = unique(questions.map(q => q.difficulty));

  const [selectedTopic, setSelectedTopic] = useState(topics[0] || '');
  const [timePerQuestion, setTimePerQuestion] = useState(60);
  const [timer, setTimer] = useState(timePerQuestion);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [customTopics, setCustomTopics] = useState<string[]>([]);
  const [customDifficulty, setCustomDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | ''>('');
  const [customNumQuestions, setCustomNumQuestions] = useState(10);

  // --- Timer Effect ---
  useEffect(() => {
    if (mode !== 'timed' || quizStatus !== 'active' || showSolution) {
      timerRef.current && clearInterval(timerRef.current);
      return;
    }
    
    setTimer(timePerQuestion); // Reset timer for each new question

    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [current, quizStatus, showSolution, mode, timePerQuestion]);

  // --- Core Quiz Logic ---

  const startQuiz = useCallback((questionsToStart: Question[]) => {
    setActiveQuestions(questionsToStart);
    setQuizStatus('active');
    setCurrent(0);
    setUserAnswers(Array(questionsToStart.length).fill(null));
    setShowSolution(false);
    setScore(0);
    setReviewMode(false);
    setPerformanceData([]);
    setFlaggedQuestions([]);
    setSavedForLater([]);
    setQuestionStartTime(Date.now());
    if (mode === 'timed') {
      setTimer(timePerQuestion);
    }
  }, [mode, timePerQuestion]);

  const recordPerformance = useCallback((status: 'answered' | 'skipped' | 'timeout', answerIdx: number | null) => {
    const timeTaken = (mode === 'timed') 
      ? timePerQuestion - timer 
      : (Date.now() - questionStartTime) / 1000;
    
    if (current >= activeQuestions.length) return;

    const currentQuestion = activeQuestions[current];
    const isCorrect = answerIdx === currentQuestion.answer;

    setPerformanceData(prev => [...prev, {
        questionId: currentQuestion.id,
        timeTaken,
        isCorrect: status === 'answered' ? isCorrect : false,
        status,
        selectedOption: answerIdx
    }]);

    if (status === 'answered' && isCorrect) {
        setScore(s => s + 1);
    }
  }, [activeQuestions, current, mode, questionStartTime, timePerQuestion, timer]);

  const handleSelectOption = (idx: number) => {
    if (showSolution) return;
    const newUserAnswers = [...userAnswers];
    newUserAnswers[current] = idx;
    setUserAnswers(newUserAnswers);
  };

  const handleSubmit = () => {
    const selectedAnswer = userAnswers[current];
    if (selectedAnswer === null || showSolution) return;
    setShowSolution(true);
    recordPerformance('answered', selectedAnswer);
  };

  const handleTimedSubmit = (idx: number) => {
    if (showSolution) return;
    const newUserAnswers = [...userAnswers];
    newUserAnswers[current] = idx;
    setUserAnswers(newUserAnswers);
    setShowSolution(true);
    recordPerformance('answered', idx);
  }

  const handleNext = () => {
    if (current + 1 < activeQuestions.length) {
      setShowSolution(false);
      setCurrent(c => c + 1);
      setQuestionStartTime(Date.now());
    } else {
      setQuizStatus('finished');
    }
  };
  
  const handleSkip = () => {
    if (showSolution) return;
    recordPerformance('skipped', null);
    handleNext();
  };

  const handleTimeout = () => {
    if (showSolution) return;
    recordPerformance('timeout', -1);
    setShowSolution(true);
  };

  const resetToConfig = () => {
    setQuizStatus('configuring');
    setActiveQuestions([]);
  };

  // --- Mode-specific Start Handlers ---
  
  const handleStartTopicQuiz = () => {
    const topicQuestions = questions.filter(q => q.topic === selectedTopic);
    startQuiz(topicQuestions);
  };

  const handleStartTimedQuiz = () => {
    startQuiz(questions); // Using all questions for timed practice for now
  };
  
  const handleGenerateCustomQuiz = () => {
    let filteredQuestions = questions;
    if (customTopics.length > 0) {
      filteredQuestions = filteredQuestions.filter(q => customTopics.includes(q.topic));
    }
    if (customDifficulty) {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === customDifficulty);
    }
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, customNumQuestions);
    startQuiz(selected);
  };

  // --- Render Functions ---

  const renderQuizConfiguration = () => {
    switch(mode) {
      case 'topic':
        return (
          <div className="flex flex-col gap-4 items-center">
            <label className="block w-full max-w-xs">
              <span className="block mb-1 font-medium">Select Topic:</span>
              <select className="border p-2 rounded w-full" value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <Button className="w-full max-w-xs" onClick={handleStartTopicQuiz} disabled={!selectedTopic}>Start Practice</Button>
          </div>
        );
      case 'timed':
        return (
          <div className="flex flex-col gap-4 items-center">
            <label className="block w-full max-w-xs">
              <span className="block mb-1 font-medium">Time per Question (seconds):</span>
              <Input type="number" min={10} max={300} value={timePerQuestion} onChange={e => setTimePerQuestion(Number(e.target.value))} className="w-full"/>
            </label>
            <Button className="w-full max-w-xs" onClick={handleStartTimedQuiz}>Start Timed Practice</Button>
          </div>
        );
      case 'custom':
        return (
          <div className="flex flex-col gap-4 items-center">
            <label className="block w-full max-w-xs">
              <span className="block mb-1 font-medium">Select Topics:</span>
              <select multiple className="border p-2 rounded w-full h-32" value={customTopics} onChange={e => setCustomTopics(Array.from(e.target.selectedOptions, option => option.value))}>
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <label className="block w-full max-w-xs">
              <span className="block mb-1 font-medium">Select Difficulty:</span>
              <select className="border p-2 rounded w-full" value={customDifficulty} onChange={e => setCustomDifficulty(e.target.value as any)}>
                <option value="">Any</option>
                {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </label>
            <label className="block w-full max-w-xs">
              <span className="block mb-1 font-medium">Number of Questions:</span>
              <Input type="number" min={1} max={50} value={customNumQuestions} onChange={e => setCustomNumQuestions(Number(e.target.value))} className="w-full"/>
            </label>
            <Button className="w-full max-w-xs" onClick={handleGenerateCustomQuiz}>Generate Quiz</Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderQuizSession = () => {
    if (activeQuestions.length === 0) {
      return <div className="text-center text-gray-500">No questions available for this configuration. Click <Button variant="link" onClick={resetToConfig}>here</Button> to go back.</div>;
    }
    const question = activeQuestions[current];
    return (
      <div className="border rounded-xl p-6 bg-background/30 border-primary/20 shadow-glow animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Question {current + 1} of {activeQuestions.length}</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setFlaggedQuestions(p => p.includes(question.id) ? p.filter(id => id !== question.id) : [...p, question.id])} title="Flag question">
              <Flag size={20} className={flaggedQuestions.includes(question.id) ? 'text-yellow-500 fill-current' : 'text-gray-400'} />
            </button>
            <button onClick={() => setSavedForLater(p => p.includes(question.id) ? p.filter(id => id !== question.id) : [...p, question.id])} title="Save for later">
              <Bookmark size={20} className={savedForLater.includes(question.id) ? 'text-blue-500 fill-current' : 'text-gray-400'} />
            </button>
            {mode === 'timed' && <span className="text-sm text-red-600 font-semibold">Time Left: {timer}s</span>}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className={`${mode === 'timed' ? 'bg-red-500' : 'bg-primary'} h-2 rounded-full transition-all`}
            style={{ width: mode === 'timed' ? `${(timer / timePerQuestion) * 100}%` : `${((current + 1) / activeQuestions.length) * 100}%` }}
          />
        </div>
        
        <div className="mb-4 text-lg font-medium">{question.questionText}</div>
        <ul className="mb-4 space-y-3">
          {question.options.map((opt, i) => {
            const isSelected = userAnswers[current] === i;
            const isCorrect = question.answer === i;
            return (
              <li key={i}>
                <Button
                  variant="outline"
                  className={`w-full text-left px-3 py-2 rounded border transition-all duration-200 ${
                    showSolution ? (isCorrect ? 'bg-green-100 border-green-400' : isSelected ? 'bg-red-100 border-red-400' : '')
                                 : (isSelected ? 'bg-blue-100 border-primary' : '')
                  }`}
                  disabled={showSolution}
                  onClick={mode === 'timed' ? () => handleTimedSubmit(i) : () => handleSelectOption(i)}
                >
                  <span className="flex items-center gap-2">
                    {showSolution && isCorrect && <CheckCircle className="text-green-500" size={20} />}
                    {showSolution && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
                    {opt}
                  </span>
                </Button>
              </li>
            );
          })}
        </ul>

        <div className="flex justify-end gap-2 mt-4">
          {showSolution ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleSkip}>Skip</Button>
              {mode !== 'timed' && <Button onClick={handleSubmit} disabled={userAnswers[current] === null}>Submit</Button>}
            </>
          )}
        </div>

        {showSolution && (
          <div className="mt-4 animate-fade-in">
            <div className="font-semibold mb-1">Solution:</div>
            <div className="mb-2 text-gray-700">{question.solutionText}</div>
            {question.solutionVideo && (
              <div className="mt-2"><video src={question.solutionVideo} controls className="w-full max-w-xs rounded-lg shadow" /></div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderQuizResults = () => {
    return (
      <div className="border rounded-xl p-6 bg-background/30 border-primary/20 shadow-glow animate-fade-in">
        {reviewMode ? (
          <>
            <h3 className="text-xl font-semibold mb-4 text-primary">Review Answers</h3>
            <ul className="space-y-4 mb-6">
              {activeQuestions.map((q, idx) => {
                const userIdx = userAnswers[idx];
                const isCorrect = userIdx === q.answer;
                return (
                  <li key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                      <span className="font-semibold">Q{idx + 1}:</span>
                      <span>{q.questionText}</span>
                    </div>
                    <div className="ml-7">
                      <div>Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>{userIdx !== null && userIdx > -1 ? q.options[userIdx] : 'No answer'}</span></div>
                      {!isCorrect && <div>Correct answer: <span className="text-green-700">{q.options[q.answer]}</span></div>}
                      <div className="mt-1 text-gray-600">{q.solutionText}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Button variant="default" className="w-full" onClick={resetToConfig}>Back to Configuration</Button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-green-700 flex items-center justify-center gap-2">
              <CheckCircle className="text-green-500" /> Practice Complete!
            </h3>
            <div className="mb-2 text-lg">Score: <span className="font-bold">{score}</span> / {activeQuestions.length}</div>
            <div className="mb-2">Accuracy: <span className="font-bold">{activeQuestions.length > 0 ? ((score / activeQuestions.length) * 100).toFixed(1) : 0}%</span></div>
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="default" onClick={resetToConfig}>Try Again</Button>
              <Button variant="outline" onClick={() => setReviewMode(true)}>Review Answers</Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-transparent">
      <h1 className="text-3xl font-bold mb-6 text-center">Practice Modes</h1>
      {quizStatus === 'configuring' && (
        <div className="flex gap-4 mb-8 justify-center">
          {modes.map(m => (
            <Button key={m.key} variant={mode === m.key ? "default" : "outline"} onClick={() => setMode(m.key)}>{m.label}</Button>
          ))}
        </div>
      )}
      
      <div className="space-y-6">
        {quizStatus === 'configuring' && (
          <>
            <h2 className="text-xl font-semibold text-primary text-center">{modes.find(m => m.key === mode)?.label}</h2>
            {renderQuizConfiguration()}
          </>
        )}
        {quizStatus === 'active' && renderQuizSession()}
        {quizStatus === 'finished' && renderQuizResults()}
      </div>
    </div>
  );
} 