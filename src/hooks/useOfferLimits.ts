import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useOfferLimits = () => {
  const [offersSubmitted, setOffersSubmitted] = useState(0);
  const offerLimit = 5;

  useEffect(() => {
    const fetchOfferCount = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const startOfFiscalYear = new Date();
      startOfFiscalYear.setMonth(0, 1); // January 1st of current year

      const { count } = await supabase
        .from('offers')
        .select('*', { count: 'exact' })
        .eq('investor_id', user.user.id)
        .gte('created_at', startOfFiscalYear.toISOString());

      setOffersSubmitted(count || 0);
    };

    fetchOfferCount();
  }, []);

  return {
    offersSubmitted,
    offerLimit,
    canSubmitOffer: offersSubmitted < offerLimit
  };
};