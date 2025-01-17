import { useState } from 'react';
import { AthleteCard } from '../components/marketplace/AthleteCard';
import { MarketplaceFilters } from '../components/marketplace/MarketplaceFilters';
import { TokenCreationForm } from '../components/eqoin/creation/TokenCreationForm';
import { Card } from '../components/ui/Card';

// Sample athlete data
const sampleAthletes = [
  {
    id: '1',
    name: 'Sir Eugene',
    sport: 'Basketball',
    team: 'Los Angeles Lakers',
    profileImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
    eqoinPrice: 23.45,
    priceChange: 5.2,
    availableSupply: 750000,
    votes: 1250,
    weeklyChange: '+25%'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    sport: 'Tennis',
    team: 'Independent',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    eqoinPrice: 18.75,
    priceChange: 3.8,
    availableSupply: 800000,
    votes: 980,
    weeklyChange: '+18%'
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    sport: 'Basketball',
    team: 'Chicago Bulls',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
    eqoinPrice: 15.30,
    priceChange: 2.5,
    availableSupply: 900000,
    votes: 850,
    weeklyChange: '+15%'
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    sport: 'Soccer',
    team: 'Portland Thorns',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    eqoinPrice: 12.80,
    priceChange: -1.2,
    availableSupply: 950000,
    votes: 720,
    weeklyChange: '+12%'
  },
  {
    id: '5',
    name: 'David Chen',
    sport: 'Swimming',
    team: 'USA Swimming',
    profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    eqoinPrice: 20.15,
    priceChange: 4.3,
    availableSupply: 700000,
    votes: 690,
    weeklyChange: '+10%'
  },
  {
    id: '6',
    name: 'Maya Patel',
    sport: 'Gymnastics',
    team: 'National Team',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    eqoinPrice: 17.90,
    priceChange: 2.8,
    availableSupply: 850000,
    votes: 560,
    weeklyChange: '+8%'
  },
  {
    id: '7',
    name: 'James Wilson',
    sport: 'Boxing',
    team: 'Independent',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    eqoinPrice: 14.25,
    priceChange: -0.8,
    availableSupply: 920000,
    votes: 480,
    weeklyChange: '+7%'
  },
  {
    id: '8',
    name: 'Sofia Garcia',
    sport: 'Athletics',
    team: 'USA Track & Field',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    eqoinPrice: 16.50,
    priceChange: 3.2,
    availableSupply: 880000,
    votes: 450,
    weeklyChange: '+6%'
  },
  {
    id: '9',
    name: 'Lucas Kim',
    sport: 'Baseball',
    team: 'Boston Red Sox',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    eqoinPrice: 19.75,
    priceChange: 4.7,
    availableSupply: 750000,
    votes: 420,
    weeklyChange: '+5%'
  },
  {
    id: '10',
    name: 'Emma Thompson',
    sport: 'Tennis',
    team: 'Independent',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    eqoinPrice: 21.30,
    priceChange: 5.9,
    availableSupply: 700000,
    votes: 890,
    weeklyChange: '+20%'
  },
  {
    id: '11',
    name: 'Michael Chang',
    sport: 'Basketball',
    team: 'Golden State Warriors',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    eqoinPrice: 24.80,
    priceChange: 6.2,
    availableSupply: 650000,
    votes: 1100,
    weeklyChange: '+22%'
  },
  {
    id: '12',
    name: 'Isabella Silva',
    sport: 'Soccer',
    team: 'Orlando Pride',
    profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    eqoinPrice: 18.90,
    priceChange: 4.1,
    availableSupply: 820000,
    votes: 760,
    weeklyChange: '+14%'
  },
  {
    id: '13',
    name: 'Alexander Lee',
    sport: 'Swimming',
    team: 'USA Swimming',
    profileImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
    eqoinPrice: 16.75,
    priceChange: -1.5,
    availableSupply: 900000,
    votes: 540,
    weeklyChange: '+9%'
  },
  {
    id: '14',
    name: 'Olivia Martinez',
    sport: 'Gymnastics',
    team: 'National Team',
    profileImage: 'https://images.unsplash.com/photo-1557296387-5358ad7997bb',
    eqoinPrice: 22.40,
    priceChange: 5.5,
    availableSupply: 680000,
    votes: 920,
    weeklyChange: '+17%'
  },
  {
    id: '15',
    name: 'William Parker',
    sport: 'Athletics',
    team: 'USA Track & Field',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    eqoinPrice: 20.60,
    priceChange: 3.9,
    availableSupply: 780000,
    votes: 670,
    weeklyChange: '+11%'
  }
];

export const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const sports = [...new Set(sampleAthletes.map(athlete => athlete.sport))];

  const filteredAthletes = sampleAthletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = !selectedSport || athlete.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const handleInvest = (athleteId: string) => {
    console.log('Investing in athlete:', athleteId);
    // Implement investment logic
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Qoin Exchange</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-6 py-2 bg-[#0000FF] text-white rounded-lg hover:bg-[#0000CC] transition-colors"
        >
          Create EquityQoin
        </button>
      </div>

      {showCreateForm ? (
        <Card className="mb-8 animate-fadeIn">
          <TokenCreationForm />
        </Card>
      ) : (
        <>
          <MarketplaceFilters
            onSearch={setSearchQuery}
            onSportFilter={setSelectedSport}
            selectedSport={selectedSport}
            sports={sports}
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAthletes.map((athlete) => (
              <AthleteCard
                key={athlete.id}
                {...athlete}
                onInvest={handleInvest}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};