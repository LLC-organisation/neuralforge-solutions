# Rychlo Technology Solutions — Landing Page

Marketing and lead-capture site for Rychlo Technology Solutions. Built with Next.js 15 App Router, Prisma, and Resend.

## What it does

- Public landing page (hero, services, how-it-works, about, contact)
- Consultation and automation request forms that write to Postgres and email the team via Resend
- Published case studies section pulled from the database
- Password-protected admin dashboard to manage consultations, automation requests, case studies, and site settings

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via Prisma 6 |
| Email | Resend |
| Auth | JWT (jose) — cookie-based admin session |
| UI primitives | Radix UI + shadcn/ui components |
| Animations | Motion (Framer Motion v12) |
| Forms | react-hook-form + Zod |
| Testing | Vitest + Testing Library |
| Deployment | Vercel |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (pooled, for Prisma) |
| `DIRECT_URL` | Direct PostgreSQL connection (for migrations) |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `RESEND_TO_EMAIL` | Address that receives lead notifications |
| `RESEND_FROM_EMAIL` | Sender address (must be from a verified Resend domain) |
| `ADMIN_PASSWORD` | Password for the `/admin` dashboard |
| `SESSION_SECRET` | Random 32-char string used to sign JWT sessions |
| `NEXT_PUBLIC_APP_URL` | Public URL of the site (used for Open Graph) |

### 3. Set up the database

```bash
npm run db:push       # push schema to your database
npm run db:seed       # seed initial data (site settings)
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev           # start dev server
npm run build         # generate Prisma client + production build
npm run start         # start production server
npm run lint          # run ESLint

npm run test          # run tests in watch mode
npm run test:run      # run tests once

npm run db:generate   # regenerate Prisma client
npm run db:push       # push schema changes (no migration file)
npm run db:migrate    # create and apply a migration
npm run db:seed       # seed the database
npm run db:studio     # open Prisma Studio
```

## Project structure

```
app/
  page.tsx                  # public landing page
  admin/                    # protected dashboard
    login/                  # admin login
    consultations/          # view consultation requests
    automation-requests/    # view automation requests
    case-studies/           # create / edit case studies
    settings/               # edit site contact info
components/
  navigation.tsx            # top nav bar
  sections/                 # landing page sections (hero, services, etc.)
  forms/                    # consultation, automation, and case study forms
  ui/                       # shared UI primitives (button, card, input, etc.)
lib/
  actions/                  # Next.js server actions (auth, forms, case studies)
  schemas/                  # Zod validation schemas
  email.ts                  # Resend email helpers
  db.ts                     # Prisma client singleton
prisma/
  schema.prisma             # database schema
  seed.ts                   # seed script
```

## Admin dashboard

Navigate to `/admin/login` and enter the password set in `ADMIN_PASSWORD`. The session is stored as a signed JWT cookie and expires after 7 days.

## Deployment (Vercel)

The `build` script runs `prisma generate` before `next build`, so no extra Vercel configuration is needed for Prisma. Set all environment variables from `.env.example` in your Vercel project settings, using the pooled connection string for `DATABASE_URL` and the direct string for `DIRECT_URL` (required for migrations on Supabase / PgBouncer).
