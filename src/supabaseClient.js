import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cjzclmzlxyawgxxsozjy.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqemNsbXpseHlhd2d4eHNvemp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDkwODcsImV4cCI6MjA5NjgyNTA4N30.e6IAkfxLbNnW9Vtl7liLrR9UcErIiidneR1pJg2osTE';

if (!globalThis.supabaseInstance) {
  globalThis.supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = globalThis.supabaseInstance;
