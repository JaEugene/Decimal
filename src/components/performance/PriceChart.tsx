import { FC } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface PriceData {
  date: string;
  price: number;
}

interface PriceChartProps {
  data: PriceData[];
}

export const PriceChart: FC<PriceChartProps> = ({ data }) => {
  return (
    <div className="bg-[#4169E1]/10 backdrop-blur-sm border border-[#4169E1]/20 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">E-Qoin Price History</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4169E1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#4169E1" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
              stroke="#4169E1" 
              fontSize={12}
              fontWeight={500}
            />
            <YAxis 
              stroke="#4169E1"
              fontSize={12}
              fontWeight={500}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(65, 105, 225, 0.1)', 
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(65, 105, 225, 0.2)',
                borderRadius: '12px',
                padding: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              labelFormatter={(date) => format(new Date(date), 'MMMM d, yyyy')}
              formatter={(value) => [`$${value}`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#4169E1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};