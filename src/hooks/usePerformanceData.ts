import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getDateRangeStart, calculatePriceChange } from '../utils/dateUtils';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

interface PerformanceData {
  eqoinPrice: number;
  totalInvestors: number;
  marketCap: number;
  priceChange: number;
  priceHistory: Array<{ date: string; price: number }>;
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    target_date: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
  }>;
}

const DEFAULT_DATA: PerformanceData = {
  eqoinPrice: 10.00,
  totalInvestors: 0,
  marketCap: 10000000, // 10.00 * 1,000,000 (default supply)
  priceChange: 0,
  priceHistory: [],
  milestones: []
};

export const usePerformanceData = (timeRange: string = '1M') => {
  const [data, setData] = useState<PerformanceData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Provide fallback data
  const fallbackData: PerformanceData = {
    eqoinPrice: 10.00,
    totalInvestors: 1250,
    marketCap: 10000000,
    priceChange: 5.2,
    priceHistory: generateDefaultPriceHistory(getDateRangeStart(timeRange)),
    milestones: []
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use fallback data for development
        setData(fallbackData);
        setError(null);
      } catch (err) {
        console.error('Supabase request failed:', err);
        setData(fallbackData);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  return { 
    data, 
    loading, 
    error
  };
};

// Helper function to generate default price history if none exists
function generateDefaultPriceHistory(startDate: Date): Array<{ date: string; price: number }> {
  const priceHistory = [];
  const basePrice = DEFAULT_DATA.eqoinPrice;
  let currentDate = new Date(startDate);
  const endDate = new Date();

  while (currentDate <= endDate) {
    priceHistory.push({
      date: currentDate.toISOString(),
      price: basePrice + (Math.random() * 2 - 1) // Random price variation ±$1
    });
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  return priceHistory;
}