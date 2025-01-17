import { FC } from 'react';
import { Card } from '../ui/Card';
import { ThumbsUp, TrendingUp } from 'lucide-react';

interface TrendingAthletesProps {
  maxDisplay?: number;
}

const trendingAthletes = [
  {
    id: '1',
    name: 'Sir Eugene',
    sport: 'Basketball',
    votes: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a',
    trend: 25,
    team: 'Los Angeles Lakers'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    sport: 'Tennis',
    votes: 980,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    trend: 18,
    team: 'Independent'
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    sport: 'Football',
    votes: 850,
    imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
    trend: 15,
    team: 'Dallas Cowboys'
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    sport: 'Soccer',
    votes: 720,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    trend: 12,
    team: 'Portland Thorns'
  },
  {
    id: '5',
    name: 'David Chen',
    sport: 'Swimming',
    votes: 690,
    imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    trend: 10,
    team: 'USA Swimming'
  },
  {
    id: '6',
    name: 'Maya Patel',
    sport: 'Gymnastics',
    votes: 560,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    trend: 8,
    team: 'National Team'
  },
  {
    id: '7',
    name: 'James Wilson',
    sport: 'Boxing',
    votes: 480,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    trend: 7,
    team: 'Independent'
  },
  {
    id: '8',
    name: 'Sofia Garcia',
    sport: 'Athletics',
    votes: 450,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    trend: 6,
    team: 'USA Track & Field'
  },
  {
    id: '9',
    name: 'Lucas Kim',
    sport: 'Baseball',
    votes: 420,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    trend: 5,
    team: 'Boston Red Sox'
  }
];

export const TrendingAthletes: FC<TrendingAthletesProps> = ({ maxDisplay = 9 }) => {
  const displayedAthletes = trendingAthletes.slice(0, maxDisplay);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="text-[#0000FF]" />
        Top {maxDisplay} Trending Athletes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedAthletes.map((athlete) => (
          <Card key={athlete.id}>
            <div className="relative">
              <img
                src={athlete.imageUrl}
                alt={athlete.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{athlete.name}</h3>
              <p className="text-gray-400">{athlete.sport} • {athlete.team}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="text-[#0000FF]" size={18} />
                  <span>{athlete.votes.toLocaleString()} votes</span>
                </div>
                <span className="text-sm text-gray-400">
                  +{athlete.trend}% this week
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};