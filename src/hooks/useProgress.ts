import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useProgress = () => {
  const [progress, setProgress] = useState({
    completedModules: 0,
    totalModules: 0,
    achievements: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data: userProgress, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', supabase.auth.getUser()?.id);

        if (error) throw error;

        const { data: totalResources } = await supabase
          .from('playbook_resources')
          .select('id', { count: 'exact' });

        setProgress({
          completedModules: userProgress?.length || 0,
          totalModules: totalResources?.length || 0,
          achievements: [] // Implement achievements logic
        });
      } catch (err) {
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return { progress, loading };
};