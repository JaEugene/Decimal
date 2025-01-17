import { FC } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, Settings, Award, Star, Trophy } from 'lucide-react';
import { Card } from '../ui/Card';

export const WelcomeHeader: FC = () => {
  const { user } = useAuth();
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Mock achievements data - in production this would come from your backend
  const achievements = {
    level: 'Super Star',
    earnings: 1229000,
    recentAwards: [
      { icon: Star, label: 'First Investment' },
      { icon: Trophy, label: 'Top Performer' },
      { icon: Award, label: 'Milestone Master' }
    ]
  };

  return (
    <Card className="relative overflow-hidden backdrop-blur-md bg-white/95 border border-[#4169E1]/20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4169E1]/5 via-transparent to-[#4169E1]/5 animate-gradient" />
      
      <div className="relative flex justify-between items-center p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {greeting()}, {user?.email?.split('@')[0] || 'Athlete'}!
            </h1>
            <div className="flex items-center gap-1">
              {achievements.recentAwards.map((award, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="p-1.5 bg-[#4169E1]/10 rounded-full hover:bg-[#4169E1]/20 transition-colors cursor-help">
                    <award.icon size={16} className="text-[#4169E1]" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {award.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-600">Welcome back to your dashboard</p>
          
          {/* Progress bar */}
          <div className="flex items-center gap-3 mt-2">
            <div className="text-sm font-medium text-gray-700">{achievements.level}</div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#4169E1] rounded-full transition-all duration-1000 ease-out"
                style={{ width: '82%' }}
              />
            </div>
            <div className="text-sm text-gray-500">
              ${achievements.earnings.toLocaleString()} in Earnings
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-[#4169E1] rounded-full text-xs text-white flex items-center justify-center animate-pulse">
              3
            </span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-[#4169E1] rounded-full flex items-center justify-center text-white font-medium">
              {user?.email?.[0].toUpperCase() || 'A'}
            </div>
            <span className="text-sm text-gray-900">Profile</span>
          </button>
        </div>
      </div>
    </Card>
  );
};