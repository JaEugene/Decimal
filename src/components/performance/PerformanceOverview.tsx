import { FC } from 'react';
import { PerformanceMetrics } from './PerformanceMetrics';
import { PriceChart } from './PriceChart';
import { TimeRangeSelector } from './TimeRangeSelector';
import { Card } from '../ui/Card';

interface PerformanceOverviewProps {
  metrics: {
    eqoinPrice: number;
    totalInvestors: number;
    marketCap: number;
    priceChange: number;
  };
  priceHistory: Array<{ date: string; price: number }>;
  onTimeRangeChange: (range: string) => void;
  selectedTimeRange: string;
}

export const PerformanceOverview: FC<PerformanceOverviewProps> = ({
  metrics,
  priceHistory,
  onTimeRangeChange,
  selectedTimeRange
}) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Performance Overview</h2>
        <p className="text-lg text-gray-600">Track your E-Qoin performance and market metrics</p>
      </div>

      {/* Metrics Grid - Updated to 2x2 layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PerformanceMetrics {...metrics} />
      </div>

      {/* Price History Chart */}
      <Card className="p-6 bg-white/95 backdrop-blur-sm border border-[#4169E1]/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Price History</h3>
            <p className="text-gray-600">Track your E-Qoin's value over time</p>
          </div>
          <TimeRangeSelector
            selectedRange={selectedTimeRange}
            onRangeChange={onTimeRangeChange}
          />
        </div>
        <div className="h-[400px]">
          <PriceChart data={priceHistory} />
        </div>
      </Card>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-[#4169E1]/5 to-white">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">24h Volume</h4>
          <p className="text-2xl font-bold text-[#4169E1]">$124,532</p>
          <p className="text-sm text-gray-600 mt-1">+12.5% from yesterday</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-[#4169E1]/5 to-white">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Active Holders</h4>
          <p className="text-2xl font-bold text-[#4169E1]">1,234</p>
          <p className="text-sm text-gray-600 mt-1">+48 new this week</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-[#4169E1]/5 to-white">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Market Rank</h4>
          <p className="text-2xl font-bold text-[#4169E1]">#12</p>
          <p className="text-sm text-gray-600 mt-1">Top 1% of all E-Qoins</p>
        </Card>
      </div>
    </div>
  );
};