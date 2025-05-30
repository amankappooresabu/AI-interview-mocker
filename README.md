# 🧠 AI Interview Mocker

> **Live Demo**: [https://ai-interview-mocker-two-blush.vercel.app/](https://ai-interview-mocker-two-blush.vercel.app/)

**AI Interview Mocker** is a web app that helps job seekers practice interviews with realistic, AI-generated mock questions based on their job description and experience level. It provides structured feedback and lets users track their answers — all powered by modern tech and clean UX.

---

## 🚀 Features

- 🎯 Generate tailored mock interview questions using LLMs  
- ✍️ Submit and save your answers  
- 🔍 Receive feedback and performance ratings  
- 📊 View all your mock sessions in one place  
- 🔐 Authentication using email  
- ⚙️ Built for scale with PostgreSQL (via Neon), Drizzle ORM, and serverless infrastructure  

---

## 🛠 Tech Stack

| Frontend       | Backend / Infra      | Database         | Others              |
| -------------- | --------------------| ---------------- | ------------------- |
| Next.js 14     | Next.js API Routes  | Neon PostgreSQL  | Tailwind CSS        |
| React          | Drizzle ORM         | Drizzle Migrations| Vercel Hosting      |
| ShadCN UI      | Serverless Functions|                  | GitHub + .env       |

---


## 🔧 Local Setup

```bash
git clone https://github.com/amankappooresabu/AI-interview-mocker.git
cd AI-interview-mocker

# Install dependencies
npm install

# Set up .env.local
cp .env.example .env.local
# Fill in your environment variables like DB_URL, API keys

# Run dev server
npm run dev
