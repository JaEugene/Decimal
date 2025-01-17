import { FC } from 'react';
import { DollarSign, Calendar, Users, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';

interface Sponsorship {
  id: string;
  title: string;
  description: string;
  expectedRoi: string;
  duration: string;
  minInvestment: number;
  maxParticipants: number;
  currentParticipants: number;
  benefits: string[];
}

interface SponsorshipOpportunitiesProps {
  opportunities: Sponsorship[];
  onPledge: (id: string) => void;
  onContact: (id: string) => void;
}

export const SponsorshipOpportunities: FC<SponsorshipOpportunitiesProps> = ({
  opportunities,
  onPledge,
  onContact
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sponsorship Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
              <p className="text-gray-400 mb-4">{opportunity.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="text-green-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Expected ROI</p>
                    <p className="font-semibold">{opportunity.expectedRoi}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="text-blue-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="font-semibold">{opportunity.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="text-purple-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Participants</p>
                    <p className="font-semibold">
                      {opportunity.currentParticipants} / {opportunity.maxParticipants}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Benefits</h4>
                <ul className="list-disc list-inside text-gray-400">
                  {opportunity.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => onPledge(opportunity.id)}
                className="flex-1 bg-green-500 text-black py-2 rounded hover:bg-green-400 flex items-center justify-center gap-2"
              >
                <DollarSign size={18} />
                Pledge Funds
              </button>
              <button
                onClick={() => onContact(opportunity.id)}
                className="flex-1 bg-gray-700 py-2 rounded hover:bg-gray-600 flex items-center justify-center gap-2"
              >
                Contact
                <ArrowRight size={18} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};