import { FC } from 'react';
import { Info } from 'lucide-react';

interface PaymentTypeInfoProps {
  type: 'one-time' | 'quarterly' | 'milestone';
}

export const PaymentTypeInfo: FC<PaymentTypeInfoProps> = ({ type }) => {
  const getTypeInfo = () => {
    switch (type) {
      case 'one-time':
        return 'The full amount will be paid upon contract completion.';
      case 'quarterly':
        return 'The total value will be split into four equal payments over the fiscal year.';
      case 'milestone':
        return 'Payments are tied to the successful completion of pre-defined milestones.';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
      <Info size={16} />
      <span>{getTypeInfo()}</span>
    </div>
  );
};