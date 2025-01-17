import { FC, useState } from 'react';
import { OpportunityCard } from './OpportunityCard';
import { OpportunityFilters } from './OpportunityFilters';
import { BusinessOpportunity } from './types';
import { Card } from '../ui/Card';

interface BusinessOpportunitiesProps {
  opportunities: BusinessOpportunity[];
  onApply: (id: string) => void;
}

export const BusinessOpportunities: FC<BusinessOpportunitiesProps> = ({
  opportunities,
  onApply
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: [],
    compensation: [],
    industry: []
  });

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filters.type.length === 0 || filters.type.includes(opp.type);
    const matchesCompensation = filters.compensation.length === 0 || 
                               filters.compensation.includes(opp.compensation.type);

    return matchesSearch && matchesType && matchesCompensation;
  });

  const featuredOpportunities = filteredOpportunities
    .filter(opp => opp.compensation.value >= 10000)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredOpportunities.map(opportunity => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onApply={onApply}
            />
          ))}
        </div>
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-6">All Opportunities</h2>
        <OpportunityFilters
          onSearch={setSearchQuery}
          onFilterChange={setFilters}
          selectedFilters={filters}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredOpportunities.map(opportunity => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onApply={onApply}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};