import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Athlete {
  id: string;
  name: string;
  sport: string;
  team: string;
  profile_image_url: string;
  equity_qoins: {
    price_usd: number;
    available_supply: number;
  };
}

export const useAthletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const { data, error } = await supabase
          .from('athletes')
          .select(`
            *,
            equity_qoins (
              price_usd,
              available_supply
            )
          `);

        if (error) throw error;
        setAthletes(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  return { athletes, loading, error };
};