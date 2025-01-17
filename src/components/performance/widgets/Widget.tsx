import { FC, ReactNode } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Card } from '../../ui/Card';

interface WidgetProps {
  id: string;
  title: string;
  type: string;
  size: 'normal' | 'expanded';
  children: ReactNode;
  onResize: () => void;
}

export const Widget: FC<WidgetProps> = ({ 
  title, 
  children, 
  size, 
  onResize 
}) => {
  return (
    <Card className={`
      ${size === 'expanded' ? 'col-span-2' : ''} 
      min-h-[300px] flex flex-col
    `}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#0000FF]">{title}</h3>
        <button 
          onClick={onResize}
          className="p-1 hover:bg-gray-800/50 rounded text-white"
        >
          {size === 'expanded' ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="flex-1">{children}</div>
    </Card>
  );
};