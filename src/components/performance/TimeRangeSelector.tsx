import { FC } from 'react';
import { Card } from '../ui/Card';

interface TimeRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export const TimeRangeSelector: FC<TimeRangeSelectorProps> = ({
  selectedRange,
  onRangeChange
}) => {
  const ranges = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <Card className="p-1 bg-gray-100/50 backdrop-blur-sm inline-flex rounded-lg">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onRangeChange(range)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedRange === range 
              ? 'bg-[#4169E1] text-white shadow-sm' 
              : 'text-gray-600 hover:text-[#4169E1] hover:bg-white/50'
          }`}
        >
          {range}
        </button>
      ))}
    </Card>
  );
};