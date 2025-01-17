import { FC } from 'react';
import { Card } from '../ui/Card';
import { Award, CheckCircle, Target } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
}

interface ProgressSectionProps {
  completedModules: number;
  totalModules: number;
  achievements: Achievement[];
}

export const ProgressSection: FC<ProgressSectionProps> = ({
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
          <Target className="text-[#0000FF]" size={20} />
          <span>{completedModules}/{totalModules} Modules Completed</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Overall Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full">
          <div
            className="h-full bg-[#0000FF] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Award className="text-[#0000FF]" />
          Achievements
        </h4>
        <div className="space-y-3">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg"
            >
              <CheckCircle
                className={achievement.earned ? 'text-[#0000FF]' : 'text-gray-600'}
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