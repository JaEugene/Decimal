import { FC } from 'react';
import { format } from 'date-fns';
import { CheckCircle, Clock, AlertCircle, PlayCircle } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  target_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const statusIcons = {
  completed: <CheckCircle className="text-green-400" />,
  pending: <Clock className="text-gray-400" />,
  in_progress: <PlayCircle className="text-blue-400" />,
  failed: <AlertCircle className="text-red-400" />
};

export const MilestoneTimeline: FC<MilestoneTimelineProps> = ({ milestones }) => {
  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <div key={milestone.id} className="bg-gray-900 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            {statusIcons[milestone.status]}
            <div>
              <h3 className="text-lg font-semibold">{milestone.title}</h3>
              <p className="text-gray-400">{milestone.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Target: {format(new Date(milestone.target_date), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};