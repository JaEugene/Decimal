import { FC, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, ThumbsUp } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { Card } from '../ui/Card';

interface AthleteCardProps {
  id: string;
  name: string;
  sport: string;
  team: string;
  profileImage: string;
  eqoinPrice: number;
  priceChange: number;
  availableSupply: number;
  votes?: number;
  weeklyChange?: string;
  onInvest: (id: string) => void;
}

export const AthleteCard: FC<AthleteCardProps> = ({
  id,
  name,
  sport,
  team,
  profileImage,
  eqoinPrice,
  priceChange,
  availableSupply,
  votes = 0,
  weeklyChange = '+0%',
  onInvest
}) => {
  const [isVoted, setIsVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(votes);

  const handleVote = () => {
    if (!isVoted) {
      setVoteCount(prev => prev + 1);
      setIsVoted(true);
    } else {
      setVoteCount(prev => prev - 1);
      setIsVoted(false);
    }
  };

  return (
    <Card className="w-[300px] overflow-hidden transition-transform hover:scale-[1.02]">
      <img 
        src={profileImage} 
        alt={name} 
        className="w-full h-36 object-cover -mx-4 -mt-4 mb-4"
      />
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-400 text-sm">{sport} • {team}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleVote}
              className={`flex items-center gap-1 text-[#0000FF] hover:text-[#0000CC] transition-colors`}
            >
              <ThumbsUp size={16} className={isVoted ? 'text-[#0000FF]' : 'text-[#0000FF]/60'} />
              <span>{voteCount.toLocaleString()} votes</span>
            </button>
          </div>
          <span className="text-sm text-gray-400">{weeklyChange} this week</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Price</span>
            <div className="flex items-center">
              <DollarSign size={16} className="text-[#0000FF]" />
              <span className="font-semibold">{formatCurrency(eqoinPrice)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">24h Change</span>
            <div className={`flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-red-400'}`}>
              {priceChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1">{Math.abs(priceChange)}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Available Supply</span>
            <span>{availableSupply.toLocaleString()}</span>
          </div>
        </div>
        
        <button 
          onClick={() => onInvest(id)}
          className="w-full bg-[#0000FF] text-white font-semibold py-2 rounded-lg hover:bg-[#0000CC] transition-colors"
        >
          Invest Now
        </button>
      </div>
    </Card>
  );
};