import { FC } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface CoreValueProps {
  icon: LucideIcon;
  title: string;
  description: string;
  number: number;
}

export const CoreValue: FC<CoreValueProps> = ({ icon: Icon, title, description, number }) => {
  return (
    <Card className="p-8 h-full bg-gradient-to-br from-white to-[#4169E1]/5 hover:from-[#4169E1]/10 hover:to-white transition-all duration-500">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#4169E1] text-white flex items-center justify-center font-bold text-lg">
          {number}
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Icon className="text-[#4169E1] w-6 h-6" />
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};