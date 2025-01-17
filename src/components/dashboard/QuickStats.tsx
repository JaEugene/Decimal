import { FC } from 'react';
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/format';

interface QuickStatsProps {
  eqoinPrice: number;
  priceChange: number;
  totalInvestors: number;
  marketCap: number;
}

export const QuickStats: FC<QuickStatsProps> = ({
  eqoinPrice,
  priceChange,
  totalInvestors,
  marketCap,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <div className="flex items-center gap-4 p-2 group hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-lg bg-stripe-blue/10 flex items-center justify-center">
            <DollarSign className="text-stripe-blue group-hover:scale-110 transition-transform" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">E-Qoin Price</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{formatCurrency(eqoinPrice)}</p>
              <span className={`text-sm ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange}%
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4 p-2 group hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-lg bg-stripe-blue/10 flex items-center justify-center">
            <Users className="text-stripe-blue group-hover:scale-110 transition-transform" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Investors</p>
            <p className="text-2xl font-bold">{totalInvestors.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4 p-2 group hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-lg bg-stripe-blue/10 flex items-center justify-center">
            <Award className="text-stripe-blue group-hover:scale-110 transition-transform" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Market Cap</p>
            <p className="text-2xl font-bold">{formatCurrency(marketCap)}</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4 p-2 group hover:transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 rounded-lg bg-stripe-blue/10 flex items-center justify-center">
            <TrendingUp className="text-stripe-blue group-hover:scale-110 transition-transform" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Growth Rate</p>
            <p className="text-2xl font-bold">+12.5%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};