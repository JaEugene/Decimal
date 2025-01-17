import { FC } from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

interface LiveMetricsProps {
  currentPrice: number;
  highestPrice: number;
  lowestPrice: number;
  priceChange: number;
  highestDate: string;
  lowestDate: string;
}

export const LiveMetrics: FC<LiveMetricsProps> = ({
  currentPrice,
  highestPrice,
  lowestPrice,
  priceChange,
  highestDate,
  lowestDate
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Live Metrics</h3>
        <div className="flex items-center gap-2">
          {priceChange >= 0 ? (
            <TrendingUp className="text-green-400" size={20} />
          ) : (
            <TrendingDown className="text-red-400" size={20} />
          )}
          <span className={priceChange >= 0 ? 'text-green-400' : 'text-red-400'}>
            {priceChange}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Current Price</span>
            <Info 
              size={16} 
              className="text-gray-400 cursor-help"
              title="Latest E-Qoin trading price"
            />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(currentPrice)}</p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Highest Price</span>
            <Info 
              size={16} 
              className="text-gray-400 cursor-help"
              title={`Reached on ${new Date(highestDate).toLocaleDateString()}`}
            />
          </div>
          <p className="text-2xl font-bold text-green-400">{formatCurrency(highestPrice)}</p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Lowest Price</span>
            <Info 
              size={16} 
              className="text-gray-400 cursor-help"
              title={`Reached on ${new Date(lowestDate).toLocaleDateString()}`}
            />
          </div>
          <p className="text-2xl font-bold text-red-400">{formatCurrency(lowestPrice)}</p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Growth Rate</span>
            <Info 
              size={16} 
              className="text-gray-400 cursor-help"
              title="30-day average growth rate"
            />
          </div>
          <p className="text-2xl font-bold">+12.5%</p>
        </div>
      </div>
    </Card>
  );
};