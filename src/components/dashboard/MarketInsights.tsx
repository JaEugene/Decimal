import { FC } from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { useNavigate } from 'react-router-dom';

export const MarketInsights: FC = () => {
  const navigate = useNavigate();

  const topAthletes = [
    { id: 1, name: 'Sarah Williams', growth: '+45%' },
    { id: 2, name: 'Marcus Johnson', growth: '+38%' },
    { id: 3, name: 'Elena Rodriguez', growth: '+32%' }
  ];

  const activeInvestors = [
    { id: 1, name: 'John Smith', transactions: 12 },
    { id: 2, name: 'Emma Chen', transactions: 8 },
    { id: 3, name: 'David Park', transactions: 6 }
  ];

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold text-[#0000FF] mb-6">Market Activity</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Growing Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-[#0000FF]" />
              <h4 className="font-semibold text-gray-900">Top Growing E-Qoins</h4>
            </div>
            <div className="space-y-3">
              {topAthletes.map((athlete) => (
                <div
                  key={athlete.id}
                  onClick={() => navigate(`/athlete/${athlete.id}`)}
                  className="group flex items-center justify-between p-3 bg-gray-50 hover:bg-[#0000FF]/5 rounded-xl cursor-pointer transition-all duration-300"
                >
                  <span className="font-medium text-gray-900 group-hover:text-[#0000FF]">
                    {athlete.name}
                  </span>
                  <span className="text-green-500 font-semibold">{athlete.growth}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Investors Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users size={20} className="text-[#0000FF]" />
              <h4 className="font-semibold text-gray-900">Most Active Investors</h4>
            </div>
            <div className="space-y-3">
              {activeInvestors.map((investor) => (
                <div
                  key={investor.id}
                  onClick={() => navigate('/marketplace')}
                  className="group flex items-center justify-between p-3 bg-gray-50 hover:bg-[#0000FF]/5 rounded-xl cursor-pointer transition-all duration-300"
                >
                  <span className="font-medium text-gray-900 group-hover:text-[#0000FF]">
                    {investor.name}
                  </span>
                  <span className="text-gray-600 font-medium">
                    {investor.transactions} trades
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};