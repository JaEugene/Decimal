import { FC } from 'react';
import { TrendingUp, ExternalLink } from 'lucide-react';

interface TrendingTopic {
  id: string;
  title: string;
  views: number;
  url: string;
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
}

export const TrendingTopics: FC<TrendingTopicsProps> = ({ topics }) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <TrendingUp className="text-[#4169E1]" />
        Trending Topics
      </h3>
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <a
            key={topic.id}
            href={topic.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#4169E1] font-bold">#{index + 1}</span>
              <span className="text-gray-900">{topic.title}</span>
            </div>
            <ExternalLink size={16} className="text-gray-400 group-hover:text-[#4169E1] transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
};