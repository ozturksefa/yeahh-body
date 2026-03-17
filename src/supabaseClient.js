import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ljonlnnhkpznmvjdicze.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqb25sbm5oa3B6bm12amRpY3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDQ4MzksImV4cCI6MjA4OTE4MDgzOX0.v1TAWpBakNDeYRGm2B6esglQkNR3cRsr0gGuuFzNVPI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
