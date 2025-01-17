import { FC } from 'react';
import { Users, Star, MessageCircle, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

interface Investor {
  id: string;
  name: string;
  contribution: number;
  perks: string[];
  avatar: string;
}

interface InvestorEngagementProps {
  totalInvestors: number;
  totalFunds: number;
  sponsorships: number;
  interactions: number;
  topInvestors: Investor[];
  onMessageAthlete: () => void;
  onRequestCollaboration: () => void;
}

export const InvestorEngagement: FC<InvestorEngagementProps> = ({
  totalInvestors,
  totalFunds,
  sponsorships,
  interactions,
  topInvestors,
  onMessageAthlete,
  onRequestCollaboration
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <Users className="text-blue-400" size={24} />
            <div>
              <p className="text-sm text-gray-400">Total Investors</p>
              <p className="text-2xl font-bold">{totalInvestors}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-400" size={24} />
            <div>
              <p className="text-sm text-gray-400">Total Funds Raised</p>
              <p className="text-2xl font-bold">${totalFunds.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <Star className="text-yellow-400" size={24} />
            <div>
              <p className="text-sm text-gray-400">Sponsorships</p>
              <p className="text-2xl font-bold">{sponsorships}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <MessageCircle className="text-purple-400" size={24} />
            <div>
              <p className="text-sm text-gray-400">Interactions</p>
              <p className="text-2xl font-bold">{interactions}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-xl font-bold mb-4">Top Investors</h3>
        <div className="space-y-4">
          {topInvestors.map((investor) => (
            <div key={investor.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={investor.avatar}
                  alt={investor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{investor.name}</h4>
                  <p className="text-sm text-gray-400">${investor.contribution.toLocaleString()} invested</p>
                </div>
              </div>
              <div>
                {investor.perks.map((perk, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs bg-gray-700 rounded-full mr-2"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-4">
        <button
          onClick={onMessageAthlete}
          className="flex-1 bg-green-500 text-black py-3 rounded-lg hover:bg-green-400 flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} />
          Message Athlete
        </button>
        <button
          onClick={onRequestCollaboration}
          className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-400 flex items-center justify-center gap-2"
        >
          <Star size={20} />
          Request Collaboration
        </button>
      </div>
    </div>
  );
};