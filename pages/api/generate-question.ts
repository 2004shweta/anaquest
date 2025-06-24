import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { level, topic, exam, numQuestions } = req.body;
  if (!level || !topic || !exam) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const n = Math.max(1, Math.min(Number(numQuestions) || 1, 10));
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    let questions: any[] = [];
    for (let i = 0; i < n; i++) {
      const prompt = `Generate a ${level} level multiple-choice question for the topic '${topic}' suitable for the '${exam}' competitive exam. 
Return a JSON object with the following fields:
- questionText: the question
- options: an array of 4 options
- answer: the index (0-based) of the correct option
- solutionText: a brief explanation of the answer
Example:
{"questionText": "What is ...?", "options": ["A", "B", "C", "D"], "answer": 2, "solutionText": "Explanation here."}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();
      // Remove code block formatting if present
      if (text.startsWith('```json')) {
        text = text.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (text.startsWith('```')) {
        text = text.replace(/^```/, '').replace(/```$/, '').trim();
      }
      // Try to extract JSON from the response
      let questionObj;
      try {
        // If the response is not pure JSON, extract the JSON part
        const match = text.match(/\{[\s\S]*\}/);
        questionObj = match ? JSON.parse(match[0]) : JSON.parse(text);
      } catch (e) {
        throw new Error('Failed to parse question JSON: ' + text);
      }
      questions.push(questionObj);
    }
    if (n === 1) {
      res.status(200).json({ question: questions[0] });
    } else {
      res.status(200).json({ questions });
    }
  } catch (error: any) {
    console.error('Error generating question:', error);
    res.status(500).json({ error: 'Failed to generate question', details: error?.message || error });
  }
} 