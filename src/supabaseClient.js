import { createClient } from '@supabase/supabase-js';

// NOTE: The Supabase anon key is a PUBLIC key — it is meant to ship in the
// client bundle. Row-level security policies are what protect data, not the
// key. Keeping a fallback here so the app works out-of-the-box; override with
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY env vars when rotating.
const FALLBACK_SUPABASE_URL = 'https://ljonlnnhkpznmvjdicze.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqb25sbm5oa3B6bm12amRpY3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDQ4MzksImV4cCI6MjA4OTE4MDgzOX0.v1TAWpBakNDeYRGm2B6esglQkNR3cRsr0gGuuFzNVPI';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
