import { FC } from 'react';
import { Search } from 'lucide-react';

interface MarketplaceFiltersProps {
  onSearch: (query: string) => void;
  onSportFilter: (sport: string) => void;
  selectedSport: string;
  sports: string[];
  className?: string;
}

export const MarketplaceFilters: FC<MarketplaceFiltersProps> = ({
  onSearch,
  onSportFilter,
  selectedSport,
  sports,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search athletes..."
          className="w-full bg-gray-900 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedSport === '' ? 'bg-[#0000FF] text-white' : 'bg-gray-900 text-white'
          }`}
          onClick={() => onSportFilter('')}
        >
          All
        </button>
        {sports.map((sport) => (
          <button
            key={sport}
            className={`px-4 py-2 rounded-lg ${
              selectedSport === sport ? 'bg-[#0000FF] text-white' : 'bg-gray-900 text-white'
            }`}
            onClick={() => onSportFilter(sport)}
          >
            {sport}
          </button>
        ))}
      </div>
    </div>
  );
};