import { FC } from 'react';
import { Card } from '../ui/Card';
import { CheckCircle, Clock, Award } from 'lucide-react';

interface ProgressTrackerProps {
  completedModules: number;
  totalModules: number;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    earned: boolean;
  }>;
}

export const ProgressTracker: FC<ProgressTrackerProps> = ({
  completedModules,
  totalModules,
  achievements
}) => {
  const progress = (completedModules / totalModules) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Your Progress</h3>
        <div className="flex items-center gap-2">
          <Clock className="text-blue-500" size={20} />
          <span>{completedModules}/{totalModules} Modules Completed</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Overall Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Award className="text-blue-500" />
          Achievements
        </h4>
        <div className="space-y-3">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg"
            >
              <CheckCircle
                className={achievement.earned ? 'text-blue-500' : 'text-gray-600'}
                size={20}
              />
              <div>
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};