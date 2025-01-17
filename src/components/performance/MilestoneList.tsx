import { FC } from 'react';
import { MilestoneTimeline } from './MilestoneTimeline';

interface MilestoneListProps {
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    target_date: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
  }>;
}

export const MilestoneList: FC<MilestoneListProps> = ({ milestones }) => {
  const groupedMilestones = {
    upcoming: milestones.filter(m => m.status === 'pending'),
    inProgress: milestones.filter(m => m.status === 'in_progress'),
    completed: milestones.filter(m => m.status === 'completed'),
    failed: milestones.filter(m => m.status === 'failed')
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Milestones</h2>
      <div className="space-y-6">
        {groupedMilestones.inProgress.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3 text-blue-400">In Progress</h3>
            <MilestoneTimeline milestones={groupedMilestones.inProgress} />
          </div>
        )}
        
        {groupedMilestones.upcoming.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-400">Upcoming</h3>
            <MilestoneTimeline milestones={groupedMilestones.upcoming} />
          </div>
        )}
        
        {groupedMilestones.completed.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3 text-green-400">Completed</h3>
            <MilestoneTimeline milestones={groupedMilestones.completed} />
          </div>
        )}
      </div>
    </div>
  );
};