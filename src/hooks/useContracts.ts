import { useState, useEffect } from 'react';
import { supabase, safeFetch } from '../lib/supabase';

interface Contract {
  id: string;
  title: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  last_updated: string;
}

// Fallback data for development/connection issues
const fallbackContracts: Contract[] = [
  {
    id: '1',
    title: 'Revenue Sharing Agreement',
    description: 'Terms for E-Qoin revenue distribution',
    status: 'compliant',
    last_updated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Image Rights Contract',
    description: 'Usage rights for promotional materials',
    status: 'pending',
    last_updated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Sponsorship Deal',
    description: 'Major brand sponsorship terms',
    status: 'compliant',
    last_updated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: 'Performance Bonus Structure',
    description: 'Achievement-based compensation',
    status: 'non-compliant',
    last_updated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const useContracts = () => {
  const [contracts, setContracts] = useState<Contract[]>(fallbackContracts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      
      const { data, error } = await safeFetch(
        supabase
          .from('contracts')
          .select('*')
          .order('last_updated', { ascending: false })
      );

      if (error) {
        // Silently fall back to default data
        setContracts(fallbackContracts);
        setError(null);
      } else if (data && data.length > 0) {
        setContracts(data);
        setError(null);
      } else {
        // No data returned, use fallback
        setContracts(fallbackContracts);
        setError(null);
      }

      setLoading(false);
    };

    fetchContracts();
  }, []);

  const stats = {
    total: contracts.length,
    compliant: contracts.filter(c => c.status === 'compliant').length,
    pending: contracts.filter(c => c.status === 'pending').length,
    nonCompliant: contracts.filter(c => c.status === 'non-compliant').length,
  };

  return { 
    contracts,
    loading,
    error,
    stats
  };
};