import { FC } from 'react';
import { Search, Filter } from 'lucide-react';

interface OpportunityFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: {
    type: string[];
    compensation: string[];
    industry: string[];
  }) => void;
  selectedFilters: {
    type: string[];
    compensation: string[];
    industry: string[];
  };
}

export const OpportunityFilters: FC<OpportunityFiltersProps> = ({
  onSearch,
  onFilterChange,
  selectedFilters
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search opportunities..."
          className="w-full bg-gray-900 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
          <div className="flex gap-2">
            {['Sponsorship', 'Endorsement'].map((type) => (
              <button
                key={type}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedFilters.type.includes(type.toLowerCase())
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-800 text-white'
                }`}
                onClick={() => {
                  const newTypes = selectedFilters.type.includes(type.toLowerCase())
                    ? selectedFilters.type.filter(t => t !== type.toLowerCase())
                    : [...selectedFilters.type, type.toLowerCase()];
                  onFilterChange({ ...selectedFilters, type: newTypes });
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Compensation</label>
          <div className="flex gap-2">
            {['Cash', 'Product', 'Mixed'].map((comp) => (
              <button
                key={comp}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedFilters.compensation.includes(comp.toLowerCase())
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-800 text-white'
                }`}
                onClick={() => {
                  const newComp = selectedFilters.compensation.includes(comp.toLowerCase())
                    ? selectedFilters.compensation.filter(c => c !== comp.toLowerCase())
                    : [...selectedFilters.compensation, comp.toLowerCase()];
                  onFilterChange({ ...selectedFilters, compensation: newComp });
                }}
              >
                {comp}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};