import { FC } from 'react';
import { Calendar, DollarSign, Flag, Info } from 'lucide-react';
import { Card } from '../../ui/Card';

interface PaymentTypeProps {
  type: 'one-time' | 'quarterly' | 'milestone';
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
  icon: typeof Calendar;
}

const PaymentType: FC<PaymentTypeProps> = ({
  type,
  selected,
  onSelect,
  title,
  description,
  icon: Icon
}) => (
  <Card
    className={`cursor-pointer transition-all ${
      selected ? 'ring-2 ring-[#0000FF]' : ''
    }`}
    onClick={onSelect}
  >
    <div className="flex items-start gap-3 p-4">
      <Icon className={selected ? 'text-[#0000FF]' : 'text-gray-400'} size={24} />
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  </Card>
);

interface PaymentTypeSelectorProps {
  selectedType: 'one-time' | 'quarterly' | 'milestone';
  onTypeSelect: (type: 'one-time' | 'quarterly' | 'milestone') => void;
}

export const PaymentTypeSelector: FC<PaymentTypeSelectorProps> = ({
  selectedType,
  onTypeSelect
}) => {
  const paymentTypes = [
    {
      type: 'one-time' as const,
      title: 'One-Time Payment',
      description: 'The full amount will be paid upon contract completion.',
      icon: DollarSign,
      tooltip: 'Best for short-term contracts and immediate value realization'
    },
    {
      type: 'quarterly' as const,
      title: 'Quarterly Payments',
      description: 'The total value will be split into four equal payments over the fiscal year.',
      icon: Calendar,
      tooltip: 'Ideal for long-term partnerships and steady cash flow'
    },
    {
      type: 'milestone' as const,
      title: 'Milestone-Based',
      description: 'Payments are tied to the successful completion of pre-defined milestones.',
      icon: Flag,
      tooltip: 'Perfect for performance-based agreements and goal-oriented contracts'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Payment Type</h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Info size={16} />
          <span>Choose how you want to structure the payments</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentTypes.map(({ type, title, description, icon, tooltip }) => (
          <div key={type} className="relative group">
            <PaymentType
              type={type}
              selected={selectedType === type}
              onSelect={() => onTypeSelect(type)}
              title={title}
              description={description}
              icon={icon}
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 rounded text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {tooltip}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};