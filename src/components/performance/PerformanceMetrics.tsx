import { FC } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { Card } from '../ui/Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description: string;
}

const MetricCard: FC<MetricCardProps> = ({ title, value, change, icon, description }) => (
  <Card className="p-6 bg-white/95 backdrop-blur-sm border border-[#4169E1]/20 hover:bg-[#4169E1]/5 transition-colors duration-300">
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-3xl font-bold text-[#4169E1]">{value}</p>
        {change !== undefined && (
          <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1 font-medium">{Math.abs(change)}%</span>
          </div>
        )}
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="p-3 bg-[#4169E1]/10 rounded-lg">
        {icon}
      </div>
    </div>
  </Card>
);

interface PerformanceMetricsProps {
  eqoinPrice: number;
  totalInvestors: number;
  marketCap: number;
  priceChange: number;
}

export const PerformanceMetrics: FC<PerformanceMetricsProps> = ({
  eqoinPrice,
  totalInvestors,
  marketCap,
  priceChange,
}) => {
  return (
    <>
      {/* First Row */}
      <MetricCard
        title="E-Qoin Price"
        value={formatCurrency(eqoinPrice)}
        change={priceChange}
        icon={<DollarSign className="text-[#4169E1]" size={24} />}
        description="Current token value"
      />
      <MetricCard
        title="Total Investors"
        value={totalInvestors.toLocaleString()}
        icon={<Users className="text-[#4169E1]" size={24} />}
        description="Active token holders"
      />
      {/* Second Row */}
      <MetricCard
        title="Market Cap"
        value={formatCurrency(marketCap)}
        icon={<DollarSign className="text-[#4169E1]" size={24} />}
        description="Total market value"
      />
      <MetricCard
        title="24h Volume"
        value={formatCurrency(125000)}
        change={15.8}
        icon={<TrendingUp className="text-[#4169E1]" size={24} />}
        description="Trading volume (24h)"
      />
    </>
  );
};