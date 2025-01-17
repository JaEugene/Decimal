import { FC } from 'react';
import { Widget } from './Widget';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface MilestoneWidgetProps {
  id: string;
  size: 'normal' | 'expanded';
  onResize: () => void;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'in_progress' | 'at_risk';
  progress: number;
}

const milestones: Milestone[] = [
  {
    id: '1',
    title: 'Brand Partnership Launch',
    description: 'Launch major sportswear collaboration campaign',
    dueDate: '2024-04-15',
    status: 'in_progress',
    progress: 65
  },
  {
    id: '2',
    title: 'Community Training Program',
    description: 'Establish youth development initiative',
    dueDate: '2024-05-01',
    status: 'at_risk',
    progress: 30
  },
  {
    id: '3',
    title: 'Charity Tournament',
    description: 'Host charity exhibition matches',
    dueDate: '2024-03-20',
    status: 'completed',
    progress: 100
  }
];

const statusConfig = {
  completed: { icon: CheckCircle, color: 'text-green-400' },
  in_progress: { icon: Clock, color: 'text-blue-400' },
  at_risk: { icon: AlertTriangle, color: 'text-red-400' }
};

export const MilestoneWidget: FC<MilestoneWidgetProps> = ({
  id,
  size,
  onResize
}) => {
  const displayMilestones = size === 'expanded' ? milestones : milestones.slice(0, 2);

  return (
    <Widget
      id={id}
      title="Milestone Progress"
      type="timeline"
      size={size}
      onResize={onResize}
    >
      <div className="space-y-4">
        {displayMilestones.map((milestone) => {
          const StatusIcon = statusConfig[milestone.status].icon;
          return (
            <div key={milestone.id} className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={statusConfig[milestone.status].color} size={20} />
                    <h4 className="font-semibold text-white">{milestone.title}</h4>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{milestone.description}</p>
                </div>
                <span className="text-sm text-gray-400">
                  Due: {format(new Date(milestone.dueDate), 'MMM d, yyyy')}
                </span>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{milestone.progress}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      milestone.status === 'completed' ? 'bg-green-400' :
                      milestone.status === 'in_progress' ? 'bg-blue-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Widget>
  );
};