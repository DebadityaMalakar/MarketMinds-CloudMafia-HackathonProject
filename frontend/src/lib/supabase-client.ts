// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// In Vite, environment variables prefixed with VITE_ are exposed
// directly through import.meta.env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create and export the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);