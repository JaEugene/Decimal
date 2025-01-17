import { FC } from 'react';
import { NewsArticle } from './types';
import { ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NewsSectionProps {
  articles: NewsArticle[];
}

export const NewsSection: FC<NewsSectionProps> = ({ articles }) => {
  return (
    <div className="space-y-6">
      {articles.map(article => (
        <div 
          key={article.id}
          className="bg-white rounded-lg p-6 hover:bg-gray-50 transition-all duration-300"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-[#4169E1]">{article.source}</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={14} />
                  {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </div>
              </div>
            </div>
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-[#4169E1] hover:text-[#4169E1]/80 transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};