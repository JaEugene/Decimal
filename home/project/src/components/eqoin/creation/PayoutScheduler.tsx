import { FC } from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { Card } from '../../ui/Card';

interface PayoutSchedule {
  id: string;
  type: 'one-time' | 'quarterly' | 'milestone';
  amount: number;
  date?: string;
  milestoneId?: string;
}

interface PayoutSchedulerProps {
  schedules: PayoutSchedule[];
  milestones: Array<{ id: string; title: string }>;
  onAddSchedule: (schedule: PayoutSchedule) => void;
  onRemoveSchedule: (id: string) => void;
  totalValue: number;
}

export const PayoutScheduler: FC<PayoutSchedulerProps> = ({
  schedules,
  milestones,
  onAddSchedule,
  onRemoveSchedule,
  totalValue
}) => {
  const calculateROI = (schedule: PayoutSchedule) => {
    return (schedule.amount / totalValue) * 100;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-blue-500/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Total Value</h3>
            <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
          </div>
          <DollarSign className="text-blue-500" size={32} />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="cursor-pointer hover:bg-gray-800/50 transition-colors"
          onClick={() => onAddSchedule({
            id: Date.now().toString(),
            type: 'one-time',
            amount: totalValue,
            date: new Date().toISOString()
          })}
        >
          <h3 className="font-semibold mb-2">One-Time Payment</h3>
          <p className="text-sm text-gray-400">Full amount paid on completion</p>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-gray-800/50 transition-colors"
          onClick={() => onAddSchedule({
            id: Date.now().toString(),
            type: 'quarterly',
            amount: totalValue / 4
          })}
        >
          <h3 className="font-semibold mb-2">Quarterly Payments</h3>
          <p className="text-sm text-gray-400">Split into 4 equal payments</p>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-gray-800/50 transition-colors"
          onClick={() => onAddSchedule({
            id: Date.now().toString(),
            type: 'milestone',
            amount: totalValue / milestones.length
          })}
        >
          <h3 className="font-semibold mb-2">Milestone-Based</h3>
          <p className="text-sm text-gray-400">Tied to achievement completion</p>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-4">Payment Schedule</h3>
        <div className="space-y-3">
          {schedules.map(schedule => (
            <Card key={schedule.id} className="bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-500" />
                    <h4 className="font-medium">
                      {schedule.type === 'one-time' ? 'One-Time Payment' :
                       schedule.type === 'quarterly' ? 'Quarterly Payment' :
                       'Milestone Payment'}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    ${schedule.amount.toLocaleString()} ({calculateROI(schedule).toFixed(1)}% of total)
                  </p>
                </div>
                <button
                  onClick={() => onRemoveSchedule(schedule.id)}
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  Remove
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};