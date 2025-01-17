import { FC } from 'react';
import { ArrowDown } from 'lucide-react';

export const MissionHero: FC = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4169E1]/10 via-white/5 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4169E1]/20 to-transparent" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4169E1] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#4169E1] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '-2s' }} />
      </div>
      
      <div className="relative text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
          <span className="bg-gradient-to-r from-[#4169E1] to-[#4169E1]/80 text-transparent bg-clip-text">
            Our Mission
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-900 leading-relaxed mb-12">
          Our mission is to simplify brand management by delivering innovative tools that empower individuals and organizations to measure, manage, and monetize their potential, navigate complexity, build trust through transparency, and unlock opportunities for growth and success.
        </p>
        <button 
          onClick={scrollToContent}
          className="animate-bounce p-3 rounded-full bg-[#4169E1] text-white hover:bg-[#4169E1]/90 transition-colors shadow-lg"
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </div>
  );
};