"use client";
import React, { useState } from "react";
import QuizSettings, { QuizSettingsForm } from "../../../components/QuizSettings";

// Placeholder question data
const sampleQuestions = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    explanation: "2 + 2 equals 4."
  },
  {
    id: 2,
    question: "Which is a prime number?",
    options: ["4", "6", "7", "8"],
    correctAnswer: "7",
    explanation: "7 is a prime number."
  }
];

function QuestionTimer({ seconds, onTimeUp }: { seconds: number; onTimeUp: () => void }) {
  const [time, setTime] = React.useState(seconds);
  React.useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, onTimeUp]);
  React.useEffect(() => { setTime(seconds); }, [seconds]);
  return <div className="text-right text-sm text-gray-500">Time left: {time}s</div>;
}

export default function DynamicQuizPage() {
  const [settings, setSettings] = useState<QuizSettingsForm | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showReview, setShowReview] = useState(false);

  const startQuiz = (s: QuizSettingsForm) => {
    setSettings(s);
    // TODO: fetch questions based on settings
    setQuestions(sampleQuestions.slice(0, s.numQuestions));
    setCurrent(0);
    setAnswers([]);
    setShowReview(false);
  };

  const handleAnswer = (ans: string) => {
    const newAnswers = [...answers];
    newAnswers[current] = ans;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
    else setShowReview(true);
  };

  const handleTimeUp = () => {
    nextQuestion();
  };

  if (!settings) return <QuizSettings onStart={startQuiz} />;
  if (showReview) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Quiz Review</h2>
        {questions.map((q, i) => (
          <div key={q.id} className="mb-4">
            <div className="font-semibold">Q{i + 1}: {q.question}</div>
            <div>Your answer: {answers[i] || <span className="text-gray-400">No answer</span>}</div>
            <div>Correct answer: {q.correctAnswer}</div>
            <div className="text-green-700">Explanation: {q.explanation}</div>
          </div>
        ))}
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded" onClick={() => setSettings(null)}>Try Again</button>
      </div>
    );
  }
  const q = questions[current];
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <div className="mb-2 flex justify-between items-center">
        <div>Question {current + 1} of {questions.length}</div>
        <QuestionTimer seconds={30} onTimeUp={handleTimeUp} />
      </div>
      <div className="mb-4 font-semibold">{q.question}</div>
      <div className="mb-4 space-y-2">
        {q.options.map((opt: string) => (
          <button
            key={opt}
            className={`block w-full text-left p-2 border rounded ${answers[current] === opt ? "bg-blue-100 border-blue-400" : ""}`}
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="bg-gray-300 py-2 px-4 rounded"
          onClick={() => setSettings(null)}
        >Back</button>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded"
          onClick={nextQuestion}
        >{current === questions.length - 1 ? "Submit" : "Next"}</button>
      </div>
    </div>
  );
} 