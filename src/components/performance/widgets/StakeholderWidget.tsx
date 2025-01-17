import { FC } from 'react';
import { Widget } from './Widget';
import { StakeholderChart } from '../stakeholders/StakeholderChart';

interface StakeholderWidgetProps {
  id: string;
  size: 'normal' | 'expanded';
  onResize: () => void;
}

const stakeholderData = [
  { name: 'Athlete', value: 70, color: '#0000FF' },
  { name: 'Investors', value: 20, color: '#3B82F6' },
  { name: 'Advisors', value: 5, color: '#EC4899' },
  { name: 'Team', value: 5, color: '#F59E0B' }
];

export const StakeholderWidget: FC<StakeholderWidgetProps> = ({
  id,
  size,
  onResize
}) => {
  return (
    <Widget
      id={id}
      title="Stakeholder Distribution"
      type="pie"
      size={size}
      onResize={onResize}
    >
      <div className="relative p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-[#0000FF]/20">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0000FF]/5 via-transparent to-transparent rounded-xl" />
        
        {/* Content */}
        <div className="relative space-y-6">
          {/* Chart container with increased height */}
          <div className="h-[400px] flex items-center justify-center">
            <StakeholderChart data={stakeholderData} />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-4">
            {stakeholderData.map((item) => (
              <div key={item.name} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-[#0000FF]/10">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{item.name}</p>
                  <p className="text-gray-900 text-sm">{item.value}%</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total distribution info */}
          <div className="mt-4 p-4 bg-[#0000FF]/5 rounded-lg border border-[#0000FF]/20">
            <h4 className="text-gray-900 font-semibold mb-2">Distribution Summary</h4>
            <p className="text-gray-700">
              Total tokens are distributed across {stakeholderData.length} stakeholder groups, with the majority ({stakeholderData[0].value}%) allocated to athletes.
            </p>
          </div>
        </div>
      </div>
    </Widget>
  );
};