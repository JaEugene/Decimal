import { FC } from 'react';
import { Card } from '../ui/Card';
import { BookOpen, ArrowRight } from 'lucide-react';

interface FeaturedArticleProps {
  title: string;
  summary: string;
  readTime: string;
  imageUrl: string;
  onReadMore: () => void;
}

export const FeaturedArticle: FC<FeaturedArticleProps> = ({
  title,
  summary,
  readTime,
  imageUrl,
  onReadMore
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-[#0000FF] text-white px-3 py-1 rounded-full text-sm">
          Featured Article
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <BookOpen size={16} />
          <span>{readTime} read</span>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 mb-4">{summary}</p>
        <button
          onClick={onReadMore}
          className="flex items-center gap-2 text-[#0000FF] hover:text-[#0000CC]"
        >
          Read More <ArrowRight size={16} />
        </button>
      </div>
    </Card>
  );
};