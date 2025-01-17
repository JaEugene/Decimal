import { FC } from 'react';

interface ImpactMetricProps {
  label: string;
  value: string;
  description: string;
}

export const ImpactMetric: FC<ImpactMetricProps> = ({ label, value, description }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-[#0000FF] mb-2">{label}</h3>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};