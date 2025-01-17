import { FC, useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { format } from 'date-fns';

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  fundingGoal: number;
  currentFunding: number;
  status: 'on_track' | 'at_risk' | 'delayed' | 'completed';
  supportingDocs?: string[];
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
  onSupport: (id: string, amount: number) => void;
}

const statusConfig = {
  on_track: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400' },
  at_risk: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-400' },
  delayed: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400' },
  completed: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400' }
};

export const MilestoneTracker: FC<MilestoneTrackerProps> = ({ milestones, onSupport }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [supportAmount, setSupportAmount] = useState<number>(0);

  const activeMilestones = milestones.filter(m => m.status !== 'completed');
  const completedMilestones = milestones.filter(m => m.status === 'completed');

  const handleSupport = (id: string) => {
    if (supportAmount > 0) {
      onSupport(id, supportAmount);
      setSupportAmount(0);
      setSelectedMilestone(null);
    }
  };

  const renderMilestone = (milestone: Milestone) => {
    const StatusIcon = statusConfig[milestone.status].icon;
    const progress = (milestone.currentFunding / milestone.fundingGoal) * 100;

    return (
      <Card key={milestone.id} className="overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <StatusIcon className={statusConfig[milestone.status].color} />
            <h3 className="font-semibold">{milestone.title}</h3>
          </div>
          <span className="text-sm text-gray-400">
            Due: {format(new Date(milestone.targetDate), 'MMM d, yyyy')}
          </span>
        </div>

        <p className="text-gray-400 mb-4">{milestone.description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Funding Progress</span>
            <span>${milestone.currentFunding.toLocaleString()} of ${milestone.fundingGoal.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${statusConfig[milestone.status].bg}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {milestone.status !== 'completed' && (
          <div className="mt-4">
            {selectedMilestone === milestone.id ? (
              <div className="space-y-2">
                <input
                  type="number"
                  value={supportAmount}
                  onChange={(e) => setSupportAmount(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                  placeholder="Enter amount..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSupport(milestone.id)}
                    className="flex-1 bg-green-500 text-black py-2 rounded hover:bg-green-400"
                  >
                    Confirm Support
                  </button>
                  <button
                    onClick={() => setSelectedMilestone(null)}
                    className="flex-1 bg-gray-700 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setSelectedMilestone(milestone.id)}
                className="w-full bg-green-500 text-black py-2 rounded hover:bg-green-400"
              >
                Support This Milestone
              </button>
            )}
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="text-blue-400" />
          Active Milestones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMilestones.map(renderMilestone)}
        </div>
      </div>

      {completedMilestones.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Completed Milestones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedMilestones.map(renderMilestone)}
          </div>
        </div>
      )}
    </div>
  );
};