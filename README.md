# NexaFlow — React + TypeScript Business Website

A responsive, animated business website template inspired by the supplied visual reference, rebuilt as an original React + TypeScript UI.

## Stack
- React + TypeScript + Vite
- Framer Motion
- Supabase
- Cloudflare Pages
- GitHub

## Local setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Set your Supabase values in `.env.local`, then open `/bussiness_model`.

## Supabase
1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy Project URL and Publishable Key into `.env.local`.
5. Never put a Supabase secret/service-role key in frontend code.

## WhatsApp
Set `VITE_WHATSAPP_NUMBER` to your full WhatsApp number with country code and no `+`, spaces or punctuation.

## GitHub

```bash
git init
git add .
git commit -m "Initial business model website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/business-model-react.git
git push -u origin main
```

## Cloudflare Pages
Build command: `npm run build`
Output directory: `dist`
Production branch: `main`

Add the same `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` and `VITE_WHATSAPP_NUMBER` values in Cloudflare Pages environment variables.

## URL
The app is intentionally routed to:

`https://suryadevs.in/bussiness_model`

If you deploy it as a separate Cloudflare Pages project, the easiest production setup is to make it the project serving `suryadevs.in`. If `suryadevs.in` already serves another app, keep both experiences in one React project and add this route to that app, or use Cloudflare routing/proxy rules.

## Design
The uploaded reference was used only as visual direction: dark premium UI, neon accent, cards, stats, services, testimonials, CTA and strong hero composition. Replace demo copy/art with your client brand and licensed photos before commercial use.
