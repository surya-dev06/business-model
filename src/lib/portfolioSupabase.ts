import { createClient } from '@supabase/supabase-js'

/**
 * Supabase project used by the portfolio contact form ("inquiries" table +
 * "requirements" storage bucket). Set these in .env.local and in the
 * Cloudflare Pages environment variables.
 */
const url = import.meta.env.VITE_PORTFOLIO_SUPABASE_URL
const key = import.meta.env.VITE_PORTFOLIO_SUPABASE_KEY

export const portfolioSupabase =
  url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null
