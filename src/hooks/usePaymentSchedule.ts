import { useState } from 'react';

interface PaymentSchedule {
  id: string;
  type: 'one-time' | 'quarterly' | 'milestone';
  amount: number;
  date?: string;
  milestoneId?: string;
}

export const usePaymentSchedule = (totalValue: number) => {
  const [schedules, setSchedules] = useState<PaymentSchedule[]>([]);

  const addSchedule = (type: PaymentSchedule['type']) => {
    const newSchedule: PaymentSchedule = {
      id: Date.now().toString(),
      type,
      amount: type === 'quarterly' ? totalValue / 4 : totalValue
    };

    setSchedules(prev => [...prev, newSchedule]);
  };

  const removeSchedule = (id: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  return {
    schedules,
    addSchedule,
    removeSchedule
  };
};