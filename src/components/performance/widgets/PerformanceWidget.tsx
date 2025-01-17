import { FC } from 'react';
import { Widget } from './Widget';
import { PerformanceMetrics } from '../PerformanceMetrics';
import { PriceChart } from '../PriceChart';
import { usePerformanceData } from '../../../hooks/usePerformanceData';

interface PerformanceWidgetProps {
  id: string;
  size: 'normal' | 'expanded';
  onResize: () => void;
}

export const PerformanceWidget: FC<PerformanceWidgetProps> = ({
  id,
  size,
  onResize
}) => {
  const { data } = usePerformanceData('1M');
  
  return (
    <Widget
      id={id}
      title="Performance Overview"
      type="metrics"
      size={size}
      onResize={onResize}
    >
      <div className="space-y-4">
        <PerformanceMetrics
          eqoinPrice={data.eqoinPrice}
          totalInvestors={data.totalInvestors}
          marketCap={data.marketCap}
          priceChange={data.priceChange}
        />
        {size === 'expanded' && (
          <div className="mt-6">
            <PriceChart data={data.priceHistory} />
          </div>
        )}
      </div>
    </Widget>
  );
};