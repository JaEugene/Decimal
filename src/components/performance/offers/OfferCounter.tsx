import { FC } from 'react';
import { Info } from 'lucide-react';

interface OfferCounterProps {
  offersSubmitted: number;
  offerLimit: number;
}

export const OfferCounter: FC<OfferCounterProps> = ({ offersSubmitted, offerLimit }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Info size={16} className="text-[#0000FF]" />
      <span>
        You have submitted {offersSubmitted} of {offerLimit} offers this fiscal year
      </span>
    </div>
  );
};