import { subDays, subMonths, subYears, startOfDay } from 'date-fns';

export const getDateRangeStart = (range: string): Date => {
  const today = startOfDay(new Date());
  
  switch (range) {
    case '1D':
      return subDays(today, 1);
    case '1W':
      return subDays(today, 7);
    case '1M':
      return subMonths(today, 1);
    case '3M':
      return subMonths(today, 3);
    case '1Y':
      return subYears(today, 1);
    case 'ALL':
      return subYears(today, 10);
    default:
      return subMonths(today, 1);
  }
};

export const calculatePriceChange = (oldPrice: number, newPrice: number): number => {
  if (oldPrice === 0) return 0;
  return ((newPrice - oldPrice) / oldPrice) * 100;
};