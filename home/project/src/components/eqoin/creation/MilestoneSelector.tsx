import { FC } from 'react';
import { Plus, X } from 'lucide-react';
import { Card } from '../../ui/Card';

interface Milestone {
  id: string;
  title: string;
  description: string;
  target: number;
}

interface MilestoneSelectorProps {
  selectedMilestones: Milestone[];
  onAddMilestone: (milestone: Milestone) => void;
  onRemoveMilestone: (id: string) => void;
}

const commonMilestones = [
  { id: 'championship', title: 'Win Championship', description: 'Win a major championship or tournament', target: 1 },
  { id: 'followers', title: 'Reach 10k Followers', description: 'Achieve 10,000 social media followers', target: 10000 },
  { id: 'campaign', title: 'Complete Media Campaign', description: 'Successfully complete sponsored media campaign', target: 1 }
];

export const MilestoneSelector: FC<MilestoneSelectorProps> = ({
  selectedMilestones,
  onAddMilestone,
  onRemoveMilestone
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commonMilestones.map(milestone => (
          <Card 
            key={milestone.id}
            className="cursor-pointer hover:bg-gray-800/50 transition-colors"
            onClick={() => onAddMilestone(milestone)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{milestone.title}</h3>
                <p className="text-sm text-gray-400">{milestone.description}</p>
              </div>
              <Plus className="text-blue-500" />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-4">Selected Milestones</h3>
        <div className="space-y-3">
          {selectedMilestones.map(milestone => (
            <Card key={milestone.id} className="bg-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{milestone.title}</h4>
                  <p className="text-sm text-gray-400">{milestone.description}</p>
                </div>
                <button
                  onClick={() => onRemoveMilestone(milestone.id)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X size={20} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};