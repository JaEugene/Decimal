import { FC } from 'react';
import { PlaybookResource } from './types';
import { Card } from '../ui/Card';
import { FileText, Video, BookOpen, HelpCircle } from 'lucide-react';

interface ResourceCardProps {
  resource: PlaybookResource;
  onClick: (resource: PlaybookResource) => void;
}

export const ResourceCard: FC<ResourceCardProps> = ({ resource, onClick }) => {
  const icons = {
    article: FileText,
    video: Video,
    guide: BookOpen,
    quiz: HelpCircle
  };

  const Icon = icons[resource.type];

  return (
    <Card 
      className="cursor-pointer bg-white hover:bg-gray-50 transition-all duration-300"
      onClick={() => onClick(resource)}
    >
      <div className="flex items-start gap-4 p-6">
        <div className="flex-shrink-0 w-10 h-10 bg-[#4169E1]/10 rounded-lg flex items-center justify-center">
          <Icon className="text-[#4169E1] w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
          <p className="text-gray-600 mb-4">{resource.description}</p>
          <div className="flex flex-wrap gap-2">
            {resource.tags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#4169E1]/10 text-[#4169E1]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};