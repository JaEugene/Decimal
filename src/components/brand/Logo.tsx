import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Logo: FC = () => {
  return (
    <Link to="/" className="flex items-center gap-3 px-4 group">
      <div className="relative w-10 h-10">
        {/* Animated gradient background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-stripe-blue via-stripe-blue-light to-stripe-blue-dark animate-spin-slow" />
        
        {/* Glowing effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-md group-hover:bg-blue-500/50 transition-all duration-500" />
        
        {/* Inner circle with D */}
        <div className="absolute inset-1.5 rounded-full bg-white flex items-center justify-center backdrop-blur-sm border border-gray-200">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            D
          </span>
        </div>
        
        {/* Orbital ring */}
        <div className="absolute inset-[-4px] rounded-full border-2 border-gray-200 border-dashed animate-spin-reverse-slow" />
        
        {/* Decorative dots */}
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-400 blur-sm animate-pulse" />
        <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 rounded-full bg-stripe-blue-light blur-sm animate-pulse delay-150" />
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 tracking-tight">
          Decimal
        </span>
      </div>
    </Link>
  );
};