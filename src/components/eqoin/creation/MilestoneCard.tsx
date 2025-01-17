import { FC } from 'react';
import { Plus, X } from 'lucide-react';

interface MilestoneCardProps {
  id: string;
  title: string;
  description: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const MilestoneCard: FC<MilestoneCardProps> = ({
  id,
  title,
  description,
  isSelected,
  onToggle
}) => {
  return (
    <div
      onClick={() => onToggle(id)}
      className={`
        group p-6 rounded-xl cursor-pointer transition-all duration-300
        ${isSelected
          ? 'bg-[#0000FF]/10 border-[#0000FF] border-2'
          : 'bg-white border-2 border-transparent hover:border-[#0000FF]/30'
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-[#0000FF] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        </div>
        
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          transition-all duration-300
          ${isSelected
            ? 'bg-[#0000FF] text-white rotate-180'
            : 'bg-gray-100 text-gray-400 group-hover:bg-[#0000FF]/10 group-hover:text-[#0000FF]'
          }
        `}>
          {isSelected ? <X size={16} /> : <Plus size={16} />}
        </div>
      </div>
    </div>
  );
};