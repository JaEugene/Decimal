import { FC } from 'react';
import { Card } from '../ui/Card';
import { Play, Clock } from 'lucide-react';

interface VideoTutorialProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  onPlay: (id: string) => void;
}

export const VideoTutorial: FC<VideoTutorialProps> = ({
  id,
  title,
  description,
  duration,
  thumbnail,
  onPlay
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onPlay(id)}
          className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors"
        >
          <Play className="text-white" size={48} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>{duration}</span>
        </div>
      </div>
    </Card>
  );
};