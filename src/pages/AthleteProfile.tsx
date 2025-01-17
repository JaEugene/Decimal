import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { TrendingUp, Award, Target, Calendar, Users, DollarSign, Plus } from 'lucide-react';
import { TokenCreationForm } from '../components/eqoin/creation/TokenCreationForm';
import { PriceChart } from '../components/performance/PriceChart';
import { MilestoneList } from '../components/performance/MilestoneList';
import { BusinessOpportunities } from '../components/business/BusinessOpportunities';
import { businessOpportunities } from '../data/businessOpportunities';
import { ProfileImage } from '../components/ui/ProfileImage';

export const AthleteProfile: FC = () => {
  const { id } = useParams();
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock athlete data
  const athlete = {
    name: 'Jane Doe',
    sport: 'Basketball',
    team: 'Golden State Warriors',
    bio: 'Professional basketball player with a focus on community development and youth mentorship.',
    imageUrl: 'https://images.unsplash.com/photo-1547355253-ff0740f6e8c1',
    stats: {
      points: 25.4,
      assists: 7.2,
      rebounds: 6.8
    },
    eqoinPrice: 23.45,
    priceChange: 5.2,
    marketCap: 2345000,
    totalInvestors: 1250,
    hasEqoin: false
  };

  const milestones = [
    {
      id: '1',
      title: 'All-Star Game Selection',
      description: 'Selected for the 2024 All-Star Game',
      target_date: '2024-02-18',
      status: 'completed' as const
    },
    {
      id: '2',
      title: 'Community Basketball Camp',
      description: 'Launch of youth development program',
      target_date: '2024-06-15',
      status: 'in_progress' as const
    }
  ];

  const priceHistory = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    price: 20 + Math.random() * 10
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex gap-8">
        <ProfileImage
          src={athlete.imageUrl}
          alt={athlete.name}
          size="lg"
          className="flex-shrink-0"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{athlete.name}</h1>
          <p className="text-xl text-gray-400 mb-4">{athlete.sport} • {athlete.team}</p>
          <p className="text-gray-300 mb-6">{athlete.bio}</p>
          
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <div className="flex items-center gap-2">
                <DollarSign className="text-[#0000FF]" />
                <div>
                  <p className="text-sm text-gray-400">E-Qoin Price</p>
                  <p className="text-xl font-bold">${athlete.eqoinPrice}</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-[#0000FF]" />
                <div>
                  <p className="text-sm text-gray-400">24h Change</p>
                  <p className="text-xl font-bold">+{athlete.priceChange}%</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-2">
                <Users className="text-[#0000FF]" />
                <div>
                  <p className="text-sm text-gray-400">Investors</p>
                  <p className="text-xl font-bold">{athlete.totalInvestors}</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-2">
                <Award className="text-[#0000FF]" />
                <div>
                  <p className="text-sm text-gray-400">Market Cap</p>
                  <p className="text-xl font-bold">${(athlete.marketCap / 1000000).toFixed(2)}M</p>
                </div>
              </div>
            </Card>
          </div>

          {!athlete.hasEqoin && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#0000FF] text-white rounded-lg hover:bg-[#0000CC] transition-colors mt-6"
            >
              <Plus size={20} />
              Create Your EquityQoins
            </button>
          )}
        </div>
      </div>

      {showCreateForm ? (
        <Card className="mb-8 animate-fadeIn">
          <TokenCreationForm />
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <Card>
              <h2 className="text-xl font-bold text-[#0000FF] mb-4">Performance Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Points per Game</span>
                  <span className="text-xl font-bold">{athlete.stats.points}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Assists per Game</span>
                  <span className="text-xl font-bold">{athlete.stats.assists}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rebounds per Game</span>
                  <span className="text-xl font-bold">{athlete.stats.rebounds}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-[#0000FF] mb-4">Price History</h2>
              <PriceChart data={priceHistory} />
            </Card>
          </div>

          <Card className="mb-8">
            <h2 className="text-xl font-bold text-[#0000FF] mb-4">Milestones</h2>
            <MilestoneList milestones={milestones} />
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-[#0000FF] mb-4">Business Opportunities</h2>
            <BusinessOpportunities
              opportunities={businessOpportunities}
              onApply={(id) => console.log('Applying to opportunity:', id)}
            />
          </Card>
        </>
      )}
    </div>
  );
};