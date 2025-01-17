import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Card } from '../ui/Card';

export const MissionCTA: FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4169E1]/30 via-[#4169E1]/20 to-transparent rounded-3xl blur-3xl" />
      <Card className="relative p-16 text-center backdrop-blur-sm border border-[#4169E1]/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-[#4169E1]/10 rounded-full">
              <Star className="text-[#4169E1] w-12 h-12" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#4169E1] to-[#4169E1]/80 bg-clip-text text-transparent">
            Ready to Take Control of Your NIL Journey?
          </h2>
          
          <p className="text-xl text-gray-900 mb-12 max-w-2xl mx-auto">
            Join EquityQoin today and unlock the full potential of your name, image, and likeness 
            through our innovative platform designed for the modern athlete.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/athlete/profile"
              className="group px-8 py-4 bg-[#4169E1] text-white rounded-xl hover:bg-[#4169E1]/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              to="/playbook"
              className="px-8 py-4 bg-white text-[#4169E1] rounded-xl hover:bg-gray-50 transition-colors border-2 border-[#4169E1]/20 flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};