import { FC } from 'react';
import { TrendingUp, Award, Target, Users } from 'lucide-react';
import { Card } from '../ui/Card';

interface MetricCard {
  title: string;
  value: string;
  change?: number;
  description: string;
  icon: typeof TrendingUp;
  color: string;
}

const metrics: MetricCard[] = [
  {
    title: 'Performance Score',
    value: '92',
    change: 5.2,
    description: 'Overall athlete rating based on milestones',
    icon: Target,
    color: 'from-blue-500/20 to-blue-600/20'
  },
  {
    title: 'Investor Growth',
    value: '+127%',
    description: 'New investor acquisition rate',
    icon: TrendingUp,
    color: 'from-green-500/20 to-green-600/20'
  },
  {
    title: 'Community Size',
    value: '12.5K',
    change: 12.3,
    description: 'Active supporters and investors',
    icon: Users,
    color: 'from-purple-500/20 to-purple-600/20'
  },
  {
    title: 'Achievement Score',
    value: '78/100',
    description: 'Based on completed milestones',
    icon: Award,
    color: 'from-yellow-500/20 to-yellow-600/20'
  }
];

export const PerformanceMetrics: FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
        Performance Overview
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card 
            key={metric.title}
            className="relative overflow-hidden group hover:transform hover:scale-[1.02] transition-all duration-500 h-full backdrop-blur-sm border border-[#4169E1]/20"
          >
            {/* Animated background gradient */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              style={{ 
                transform: 'translate(-50%, -50%) rotate(-45deg) scale(1.5)',
                top: '50%',
                left: '50%',
                filter: 'blur(32px)'
              }}
            />
            {/* Animated background gradient */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              style={{ 
                transform: 'translate(-50%, -50%) rotate(-45deg) scale(1.5)',
                top: '50%',
                left: '50%',
                filter: 'blur(32px)'
              }}
            />
            
            <div className="relative z-10 p-4">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="text-[#4169E1] group-hover:scale-110 transition-transform duration-500" size={28} />
                {metric.change && (
                  <span className={`text-sm font-bold ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.change >= 0 ? '+' : ''}{metric.change}%
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">{metric.value}</p>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">{metric.description}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">{metric.value}</p>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">{metric.description}</p>
              
              {/* Animated border on hover */}
              <div className="absolute inset-0 border border-[#4169E1]/10 group-hover:border-[#4169E1]/20 rounded-lg transition-colors duration-500" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};