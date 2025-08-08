# 📚 AnaQuest – AI-Powered Analytical Practice & Feedback Platform

## 🚀 Project Overview

**AnaQuest** is a smart EdTech platform that empowers students to practice analytical questions for competitive exams and placements with real-time feedback and adaptive learning. It combines **full-stack software development** with **Generative AI** to deliver **personalized quizzes, AI-generated explanations, and dynamic performance summaries.**

---

## 🌟 Key Features

* ✅ **Dynamic Question Bank**: Categorized by exam type, topic, and difficulty.
* ✅ **Custom Quiz Builder**: Create quizzes based on selected topics and difficulty levels.
* ✅ **AI-Powered Question Generation**: New analytical questions are auto-generated using LLMs.
* ✅ **Instant AI-Generated Explanations**: Get detailed solutions from the AI immediately after answering.
* ✅ **Performance Dashboard**: Track accuracy, time, and weak topics through visual analytics.
* ✅ **Adaptive Quiz Recommendations**: Next quiz is tailored based on weak areas using AI.
* ✅ **Natural Language Summaries**: AI-generated personalized feedback reports.
* ✅ **Leaderboard**: Compare your performance with peers.
* ✅ **Secure Authentication**: User login and session management using NextAuth.

---

## ⚙️ Tech Stack

| Layer            | Technology                                     |
| ---------------- | ---------------------------------------------- |
| Frontend         | Next.js (TypeScript), Tailwind CSS, ShadCN UI  |
| Backend          | Next.js API Routes, Node.js     |
| Database         | MongoDB                    |
| LLM API          | OpenAI GPT API (can be extended to local LLMs) |
| State Management | React Query / Zustand                          |
| Deployment       | Vercel (Frontend + Backend), MongoDB Atlas     |

---

## 💻 Folder Structure

```
anaquest/
├── app/              # Next.js App Router
├── components/       # Reusable UI Components
├── features/         # Auth, Quiz, Dashboard, LLM Integration
├── lib/              # API, Auth, Utilities
├── public/           # Static Assets
├── styles/           # TailwindCSS
├── types/            # TypeScript Types
├── middleware.ts     # Auth Middleware
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## 🛠️ Major Modules

### Frontend:

* Responsive UI with ShadCN components.
* Quiz Interface with timer and options.
* Dashboard with progress charts.
* Leaderboard with live user rankings.

### Backend:

* User authentication using NextAuth.
* Quiz logic (create, fetch, submit).
* API integration with OpenAI for question/explanation generation.

### Generative AI (LLM):(Future)

* **Dynamic Question Generator:** Prompt-based LLM to create new analytical questions.
* **AI Explanations:** Real-time generation of step-by-step solutions.
* **Performance Summarizer:** LLM-generated natural language summaries based on quiz results.

---



## 🚀 How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/anaquest.git
   cd anaquest
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Setup `.env.local`:

   Create a file named `.env.local` in the project root with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_random_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CONTACT_GMAIL_USER=your_gmail_address
   CONTACT_GMAIL_PASS=your_gmail_app_password
   ```
   - For production, set `NEXTAUTH_URL` to your deployed URL (e.g., `https://anaquest-ixfp.vercel.app`).
   - All variables are required for authentication and email to work.
4. Run the project:

   ```bash
   npm run dev
   ```

---

## 📢 Future Enhancements

* Mobile App version.
* Real-time collaborative quizzes.
* Multi-language support.
* Voice-based question interactions.
* AI-driven personalized learning paths.

---

## ✨ Why This Project is Unique

AnaQuest is not just a static practice tool. It integrates:

* **Full-stack engineering** (frontend + backend + database)
* **Generative AI capabilities**
* **Personalized learning strategies**
* **Interactive and adaptive UX**

This makes it a powerful showcase of **both software development and AI application skills**.

---

