import { FC } from 'react';
import { Bell, Clock, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';

export const NotificationBar: FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'milestone',
      message: 'Championship milestone deadline approaching in 5 days',
      icon: Clock,
      color: 'text-yellow-400'
    },
    {
      id: 2,
      type: 'compliance',
      message: 'New compliance requirements need review',
      icon: AlertTriangle,
      color: 'text-red-400'
    },
    {
      id: 3,
      type: 'opportunity',
      message: 'New sponsorship opportunity available',
      icon: Bell,
      color: 'text-[#0000FF]'
    }
  ];

  return (
    <Card className="p-4">
      <div className="flex flex-col space-y-2">
        {notifications.map(({ id, message, icon: Icon, color }) => (
          <div key={id} className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded-lg cursor-pointer">
            <Icon className={color} size={20} />
            <span>{message}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};