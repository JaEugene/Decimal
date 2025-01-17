import { FC } from 'react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';

interface ContractCardProps {
  title: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  lastUpdated: string;
}

export const ContractCard: FC<ContractCardProps> = ({
  title,
  description,
  status,
  lastUpdated,
}) => {
  const statusColors = {
    compliant: 'text-green-400',
    'non-compliant': 'text-red-400',
    pending: 'text-yellow-400'
  };

  const StatusIcon = status === 'compliant' ? CheckCircle : AlertCircle;

  return (
    <Card>
      <div className="flex items-start gap-3">
        <FileText className="text-gray-400" size={24} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <StatusIcon className={statusColors[status]} size={20} />
          </div>
          <p className="text-gray-400 mt-1">{description}</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>
    </Card>
  );
};