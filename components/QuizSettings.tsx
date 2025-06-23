import React from "react";
import { useForm, Controller } from "react-hook-form";

const topics = [
  "Logical Reasoning",
  "Data Interpretation",
  "Quantitative Aptitude",
  "Verbal Ability",
  "General Knowledge"
];
const difficulties = ["Easy", "Medium", "Hard"];

export type QuizSettingsForm = {
  topic: string;
  difficulty: string;
  numQuestions: number;
};

export default function QuizSettings({ onStart }: { onStart: (settings: QuizSettingsForm) => void }) {
  const { control, handleSubmit } = useForm<QuizSettingsForm>({
    defaultValues: { topic: topics[0], difficulty: difficulties[0], numQuestions: 5 }
  });

  return (
    <form
      onSubmit={handleSubmit(onStart)}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-10 p-6 border rounded shadow"
    >
      <label>
        Topic
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border rounded">
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          )}
        />
      </label>
      <label>
        Difficulty
        <Controller
          name="difficulty"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border rounded">
              {difficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          )}
        />
      </label>
      <label>
        Number of Questions
        <Controller
          name="numQuestions"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              min={1}
              max={20}
              {...field}
              className="w-full p-2 border rounded"
            />
          )}
        />
      </label>
      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Start Quiz</button>
    </form>
  );
} 