import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DecimalPointAnimation } from '../animations/DecimalPointAnimation';

export const WelcomeHero: FC = () => {
  return (
    <div 
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden animate-fade-in bg-gradient-to-b from-[#4169E1]/5 to-white mt-4" 
      style={{ animationDelay: '0.5s' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4169E1]/10 via-white to-white" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4169E1]/20 to-transparent" />
      </div>
      
      {/* Decimal Point Animation */}
      <div className="absolute top-1/6 w-full">
        <DecimalPointAnimation />
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-stripe-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-stripe-blue-dark rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '-2s' }} />
      </div>
      
      <div className="relative text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6 text-gray-900 animate-slide-up"
          style={{ animationDelay: '0.8s' }}>
          <span className="bg-gradient-to-r from-[#4169E1] to-[#4169E1]/80 text-transparent bg-clip-text">
            Decimal simplifies NIL management
          </span>
          <br />
          by connecting athletes, investors, and brands through secure, compliant, and impactful tools.
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 animate-scale-fade" style={{ animationDelay: '1.2s' }}>
          <Link 
            to="/playbook?article=understanding-nil-basics"
            className="group px-6 py-3 bg-[#4169E1] text-white rounded-full hover:bg-[#4169E1]/90 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-base font-semibold shadow-lg hover:shadow-xl"
          >
            Learn More
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link 
            to="/athlete/profile"
            className="px-6 py-3 bg-[#4169E1]/10 text-[#4169E1] rounded-full hover:bg-[#4169E1]/20 transform hover:scale-[1.02] transition-all duration-300 text-base font-semibold backdrop-blur-sm border border-[#4169E1]/20"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};