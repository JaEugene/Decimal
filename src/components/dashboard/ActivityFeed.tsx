import { FC } from 'react';
import { Card } from '../ui/Card';
import { Activity, DollarSign, Award } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'milestone' | 'investment' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  icon: typeof Activity;
  iconBg: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'milestone',
    title: 'Championship Milestone',
    description: 'Completed the regional championship milestone',
    timestamp: '2 hours ago',
    icon: Activity,
    iconBg: 'bg-[#0000FF]'
  },
  {
    id: '2',
    type: 'investment',
    title: 'New Investment',
    description: 'Received $50,000 investment from John Doe',
    timestamp: '4 hours ago',
    icon: DollarSign,
    iconBg: 'bg-green-500'
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Performance Goal',
    description: 'Reached 1,000 active investors milestone',
    timestamp: '1 day ago',
    icon: Award,
    iconBg: 'bg-purple-500'
  }
];

export const ActivityFeed: FC = () => {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold text-[#0000FF] mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {activities.map(activity => (
            <div key={activity.id} className="relative">
              {/* Activity item */}
              <div className="flex items-start gap-4 group">
                {/* Icon container with animated background */}
                <div className={`relative flex-shrink-0 w-12 h-12 ${activity.iconBg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Icon */}
                  <activity.icon className="text-white relative z-10" size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 truncate group-hover:text-[#0000FF] transition-colors">
                      {activity.title}
                    </h4>
                    <span className="text-sm text-gray-500">{activity.timestamp}</span>
                  </div>
                  <p className="mt-1 text-gray-600">{activity.description}</p>
                </div>
              </div>

              {/* Connecting line for visual continuity */}
              {activities.indexOf(activity) !== activities.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-[#0000FF]/20 to-transparent h-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};