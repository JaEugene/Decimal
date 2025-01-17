import { supabase } from './supabase';

export const testConnection = async () => {
  try {
    // Add delay to ensure table is ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { data, error } = await supabase
      .from('connection_test')
      .select('test_value')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Failed to connect to Supabase:', error);
      return false;
    }

    if (data?.test_value === 'connection_successful') {
      console.log('✅ Connected to Supabase successfully');
      return true;
    }

    console.error('❌ Connection test failed: Invalid test value');
    return false;
  } catch (err) {
    console.error('Supabase connection error:', err);
    return false;
  }
};