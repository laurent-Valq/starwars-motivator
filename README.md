# 🌌 Star Wars Motivator

A **Next.js + Tailwind + OpenAI** app that generates inspiring quotes from the Star Wars universe.

🔗 [Live Demo](https://starwars-motivator.vercel.app)

---

## 🧱 Tech Stack

Next.js • TypeScript • TailwindCSS • OpenAI API • NextAuth • Prisma • PostgreSQL (Neon) • Vercel • Git/GitHub

---

## ✨ Features

- 🎬 Star Wars quote generation via **OpenAI GPT-4o-mini**
- 🌍 **FR / EN** language toggle
- 🔊 Sound toggle — space ambiance + Star Wars theme
- 📜 **Crawl animation** Star Wars style to display quotes
- ❤️ **Like system** (favorites) for logged-in users
- 🔐 Full **authentication** (login / register / forgot password)
- 👤 **Admin / user** roles
- 🛠️ **Admin dashboard** — user management (activation, deletion)
- 📱 **Responsive** — hamburger menu on mobile/tablet

---

## 🗂️ Architecture

- `src/app/` — Next.js pages (App Router)
- `src/app/api/` — API routes (generate, auth, admin, quotes)
- `src/components/` — Reusable components (Navbar, Links...)
- `src/lib/` — Prisma client
- `prisma/schema.prisma` — Data model

---

## 🚀 Getting Started
```bash
npm install
npm run dev
```

### Environment variables (`.env.local`)
```env
OPENAI_API_KEY=your_key
DATABASE_URL=your_neon_postgresql_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 🗄️ Database

Prisma + PostgreSQL hosted on **Neon**.
```bash
npx prisma migrate dev
npx prisma generate
```

---

## 📦 Deployment

Deployed on **Vercel** — automatic redeployment on every push to `main`.