import { FC, useState } from 'react';
import { Card } from '../ui/Card';
import { PriceChart } from '../performance/PriceChart';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/format';

interface PriceOverviewProps {
  priceHistory: Array<{ date: string; price: number }>;
}

export const PriceOverview: FC<PriceOverviewProps> = ({ priceHistory }) => {
  const [timeRange, setTimeRange] = useState('1M');
  const ranges = ['1W', '1M', '3M', '1Y', 'ALL'];

  const stats = {
    highestPrice: Math.max(...priceHistory.map(p => p.price)),
    lowestPrice: Math.min(...priceHistory.map(p => p.price)),
    highestDate: priceHistory.find(p => p.price === Math.max(...priceHistory.map(p => p.price)))?.date,
    lowestDate: priceHistory.find(p => p.price === Math.min(...priceHistory.map(p => p.price)))?.date,
  };

  return (
    <Card className="mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Price Overview</h2>
        <div className="flex gap-2">
          {ranges.map(range => (
            <Button
              key={range}
              variant={timeRange === range ? 'primary' : 'secondary'}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[300px] mb-6">
        <PriceChart data={priceHistory} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-400">Highest Price</p>
          <p className="font-bold">{formatCurrency(stats.highestPrice)}</p>
          <p className="text-xs text-gray-500">
            on {new Date(stats.highestDate || '').toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Lowest Price</p>
          <p className="font-bold">{formatCurrency(stats.lowestPrice)}</p>
          <p className="text-xs text-gray-500">
            on {new Date(stats.lowestDate || '').toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
};