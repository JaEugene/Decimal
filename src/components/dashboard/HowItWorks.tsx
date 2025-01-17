import { FC } from 'react';
import { Coins, Users, Target, Shield } from 'lucide-react';

const steps = [
  {
    icon: Coins,
    title: 'Create EquityQoins',
    description: 'Athletes tokenize their potential through customizable EquityQoins',
  },
  {
    icon: Users,
    title: 'Connect & Fund',
    description: 'Investors fund milestones and sponsorships to support growth',
  },
  {
    icon: Target,
    title: 'Achieve Goals',
    description: 'Athletes reach milestones while investors gain returns',
  },
  {
    icon: Shield,
    title: 'Stay Compliant',
    description: 'All transactions follow NIL rules and regulations',
  }
];

export const HowItWorks: FC = () => {
  return (
    <div className="relative py-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4169E1] to-transparent hidden lg:block" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="h-full bg-[#4169E1]/5 backdrop-blur-sm rounded-xl hover:bg-[#4169E1]/10 transition-all duration-300 flex flex-col items-center text-center p-8 border border-[#4169E1]/20">
                <div className="w-16 h-16 rounded-full bg-[#4169E1]/10 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-all duration-500">
                  <step.icon className="text-[#4169E1]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};