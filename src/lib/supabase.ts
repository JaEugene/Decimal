import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'decimal-auth'
  },
  global: {
    headers: {
      'X-Client-Info': 'decimal-app'
    }
  }
});

// Custom fetch wrapper for better error handling
export const safeFetch = async <T>(
  promise: Promise<{ data: T | null; error: any }>
): Promise<{ data: T | null; error: Error | null }> => {
  try {
    const response = await promise;
    
    if (response.error) {
      console.error('Supabase query error:', response.error);
      throw response.error;
    }
    
    return { data: response.data, error: null };
  } catch (err) {
    console.error('Database operation failed:', err);
    return { 
      data: null, 
      error: err instanceof Error ? err : new Error('An unknown error occurred')
    };
  }
};