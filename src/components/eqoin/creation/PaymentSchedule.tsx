import { FC } from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { Card } from '../../ui/Card';

interface PaymentScheduleProps {
  type: 'one-time' | 'quarterly' | 'milestone';
  amount: number;
  totalValue: number;
  onRemove: () => void;
}

export const PaymentSchedule: FC<PaymentScheduleProps> = ({
  type,
  amount,
  totalValue,
  onRemove
}) => {
  const calculateROI = () => (amount / totalValue) * 100;

  return (
    <Card className="bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#0000FF]" />
            <h4 className="font-medium">
              {type === 'one-time' ? 'One-Time Payment' :
               type === 'quarterly' ? 'Quarterly Payment' :
               'Milestone Payment'}
            </h4>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            ${amount.toLocaleString()} ({calculateROI().toFixed(1)}% of total)
          </p>
        </div>
        <button
          onClick={onRemove}
          className="text-sm text-[#0000FF] hover:text-[#0000CC]"
        >
          Remove
        </button>
      </div>
    </Card>
  );
};