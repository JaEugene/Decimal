import { FC } from 'react';
import { Widget } from './Widget';
import { DollarSign, Users, Briefcase } from 'lucide-react';

interface EQoinDistributionWidgetProps {
  id: string;
  size: 'normal' | 'expanded';
  onResize: () => void;
}

const distributionData = [
  { 
    label: 'Available for Trading',
    amount: 500000,
    icon: <DollarSign className="text-green-500" />,
    color: 'bg-green-500'
  },
  { 
    label: 'Locked by Investors',
    amount: 300000,
    icon: <Users className="text-blue-500" />,
    color: 'bg-blue-500'
  },
  { 
    label: 'Reserved for Future',
    amount: 200000,
    icon: <Briefcase className="text-purple-500" />,
    color: 'bg-purple-500'
  }
];

export const EQoinDistributionWidget: FC<EQoinDistributionWidgetProps> = ({
  id,
  size,
  onResize
}) => {
  const total = distributionData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Widget
      id={id}
      title="E-Qoin Distribution"
      type="distribution"
      size={size}
      onResize={onResize}
    >
      <div className="space-y-6 text-gray-900">
        {distributionData.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-gray-900">{item.label}</span>
              </div>
              <span className="font-semibold text-gray-900">{item.amount.toLocaleString()} E-Qoins</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color}`}
                style={{ width: `${(item.amount / total) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-700 text-right">
              {((item.amount / total) * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </Widget>
  );
};