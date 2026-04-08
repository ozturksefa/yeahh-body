import { createClient } from '@supabase/supabase-js';

const FALLBACK_SUPABASE_URL = 'https://ljonlnnhkpznmvjdicze.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqb25sbm5oa3B6bm12amRpY3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDQ4MzksImV4cCI6MjA4OTE4MDgzOX0.v1TAWpBakNDeYRGm2B6esglQkNR3cRsr0gGuuFzNVPI';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY tanımlı değil; fallback public config kullanılıyor.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
