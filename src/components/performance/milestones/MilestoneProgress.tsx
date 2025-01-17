import { FC } from 'react';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface MilestoneProgressProps {
  milestone: {
    id: string;
    title: string;
    description: string;
    target_date: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    progress: number;
  };
  onComplete: (id: string) => void;
}

export const MilestoneProgress: FC<MilestoneProgressProps> = ({
  milestone,
  onComplete
}) => {
  const statusConfig = {
    pending: { color: 'text-yellow-500', bgColor: 'bg-yellow-500', icon: Clock },
    in_progress: { color: 'text-[#0000FF]', bgColor: 'bg-[#0000FF]', icon: Clock },
    completed: { color: 'text-green-500', bgColor: 'bg-green-500', icon: CheckCircle },
    failed: { color: 'text-red-500', bgColor: 'bg-red-500', icon: AlertTriangle }
  };

  const StatusIcon = statusConfig[milestone.status].icon;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-[#0000FF]/20 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h4 className="text-lg font-semibold text-gray-900">{milestone.title}</h4>
          <p className="text-gray-900">{milestone.description}</p>
        </div>
        <StatusIcon className={statusConfig[milestone.status].color} size={24} />
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-900 font-medium">Progress</span>
            <span className="text-gray-900 font-medium">{milestone.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${statusConfig[milestone.status].bgColor}`}
              style={{ width: `${milestone.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-900">
            Due: {format(new Date(milestone.target_date), 'MMM d, yyyy')}
          </span>
          {milestone.status !== 'completed' && (
            <button
              onClick={() => onComplete(milestone.id)}
              className="px-4 py-2 bg-[#0000FF] text-white rounded-lg hover:bg-[#0000CC] transition-colors"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};