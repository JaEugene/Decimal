import { FC } from 'react';
import { Card } from '../ui/Card';
import { BusinessOpportunity } from './types';
import { Calendar, DollarSign, Building2, GraduationCap } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: BusinessOpportunity;
  onApply: (id: string) => void;
}

export const OpportunityCard: FC<OpportunityCardProps> = ({ opportunity, onApply }) => {
  const isSponsorship = opportunity.type === 'sponsorship';
  const icon = isSponsorship ? GraduationCap : Building2;
  const organization = isSponsorship ? opportunity.institution : opportunity.company;

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={organization.logo}
          alt={organization.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{opportunity.title}</h3>
          <p className="text-sm text-gray-400">{organization.name}</p>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{opportunity.description}</p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="text-green-400" size={16} />
          <span className="text-gray-400">
            {opportunity.compensation.type === 'mixed' ? 'Cash + Products' : 
             opportunity.compensation.type === 'product' ? 'Product Value' : 'Cash Compensation'}:
          </span>
          <span className="font-semibold">${opportunity.compensation.value.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="text-blue-400" size={16} />
          <span className="text-gray-400">Deadline:</span>
          <span>{new Date(opportunity.deadline).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {opportunity.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => onApply(opportunity.id)}
        className="mt-auto w-full bg-gray-50 text-[#001f3f] py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
      >
        Apply Now
      </button>
    </Card>
  );
};