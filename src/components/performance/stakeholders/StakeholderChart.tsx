import { FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface StakeholderChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const StakeholderChart: FC<StakeholderChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={4}
          dataKey="value"
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            name
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                className="text-sm fill-gray-900"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {`${name} (${value}%)`}
              </text>
            );
          }}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              className="transition-all duration-300 hover:opacity-80"
            />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                  <p className="font-medium text-gray-900">{payload[0].name}</p>
                  <p className="text-gray-600">{payload[0].value}% Share</p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};