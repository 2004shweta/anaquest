export type Question = {
  id: number;
  questionText: string;
  options: string[];
  answer: number;
  solutionText: string;
  solutionVideo?: string;
  tags: string[];
  examType: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timer: number;
};

export type UserScore = {
  score: number;
  topic: string;
  testType: string;
  timestamp: Date;
};

export const questions: Question[] = [
  {
    id: 1,
    questionText: 'What is the capital of France?',
    options: ['Berlin', 'London', 'Paris', 'Madrid'],
    answer: 2,
    solutionText: 'Paris is the capital of France.',
    solutionVideo: '',
    tags: ['Geography', 'Europe'],
    examType: 'SSC',
    topic: 'General Knowledge',
    difficulty: 'Easy',
    timer: 30,
  },
  {
    id: 2,
    questionText: 'Solve: 2 + 2 * 2 = ?',
    options: ['6', '8', '4', '2'],
    answer: 0,
    solutionText: 'According to BODMAS, 2*2=4, then 2+4=6.',
    solutionVideo: '',
    tags: ['Math', 'BODMAS'],
    examType: 'CAT',
    topic: 'Quantitative Aptitude',
    difficulty: 'Easy',
    timer: 45,
  },
  // Add more sample questions as needed
]; 