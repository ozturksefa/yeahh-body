import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  const msg = '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY tanımlı değil. .env dosyanızı kontrol edin.';
  if (import.meta.env.PROD) {
    throw new Error(msg);
  }
  console.warn(msg);
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');
