# React + TypeScript Portfolio + Business Model

This project merges the original `portfolio` HTML/CSS/JS portfolio into the existing Vite React + TypeScript business website.

## Routes

- `/` — portfolio
- `/business_model` — Business Website project demo
- `/bussiness_model` — legacy redirect to `/business_model`

## Stack

- React + TypeScript + Vite
- React Router
- Framer Motion
- Supabase
- Cloudflare Pages

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare Pages

Build command: `npm run build`

Output directory: `dist`

The included `public/_redirects` keeps client-side routes working after refresh.

## Environment variables

Copy `.env.example` values into your Cloudflare Pages project settings.

Portfolio form expects:
- `VITE_PORTFOLIO_SUPABASE_URL`
- `VITE_PORTFOLIO_SUPABASE_ANON_KEY`

Business page expects:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_WHATSAPP_NUMBER`

The portfolio's existing file upload flow uses the `requirements` Storage bucket and `inquiries` table. Make sure those exist in its Supabase project.
