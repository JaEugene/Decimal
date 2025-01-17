import { FC } from 'react';
import { Card } from '../components/ui/Card';
import { MissionHero } from '../components/mission/MissionHero';
import { CoreValue } from '../components/mission/CoreValue';
import { MissionCTA } from '../components/mission/MissionCTA';
import { 
  Lightbulb, Shield, Users, Target, Handshake, 
  Compass, BookOpen, Sparkles
} from 'lucide-react';

export const Mission: FC = () => {
  const coreValues = [
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Inspired by clarity, Decimal simplifies NIL management by providing tools that transform complex processes into transparent, actionable steps.'
    },
    {
      icon: Compass,
      title: 'Precision',
      description: 'With Decimal, precision meets purpose. We simplify NIL so athletes can focus on what they do best - achieving their dreams.'
    },
    {
      icon: Users,
      title: 'Empowerment',
      description: 'We enable individuals and organizations to take control of their brand with confidence.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We deliver impactful solutions using cutting-edge technology and forward-thinking approaches.'
    },
    {
      icon: Handshake,
      title: 'Equity',
      description: 'We ensure fairness and inclusivity for all stakeholders.'
    },
    {
      icon: Target,
      title: 'Accountability',
      description: 'We honor our commitments and deliver on promises.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4169E1]/5 to-white">
      <MissionHero />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        {/* Vision Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4169E1]/20 via-transparent to-transparent rounded-3xl blur-3xl" />
          <Card className="relative p-12 backdrop-blur-sm border border-[#4169E1]/20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#4169E1] to-[#4169E1]/80 bg-clip-text text-transparent">
                Our Vision
              </h2>
              <p className="text-xl text-gray-900 leading-relaxed">
                To redefine brand management by empowering individuals and organizations with innovative tools that simplify complexity, foster transparency, and amplify opportunities.
              </p>
            </div>
          </Card>
        </div>

        {/* Core Values Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#4169E1] to-[#4169E1]/80 bg-clip-text text-transparent">
              Core Values
            </h2>
            <p className="text-xl text-gray-900 max-w-2xl mx-auto">
              With Decimal, precision meets purpose. We simplify NIL so athletes can focus on what they do best - achieving their dreams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="transform hover:scale-[1.02] transition-all duration-300">
                <CoreValue
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  number={index + 1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Athletes Empowered', value: '1,000+', description: 'Active users on our platform' },
            { label: 'Total Value Managed', value: '$10M+', description: 'In NIL contracts and deals' },
            { label: 'Compliance Rate', value: '99.9%', description: 'Success in regulatory adherence' }
          ].map((stat, index) => (
            <Card key={index} className="p-8 text-center transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-lg font-semibold text-[#4169E1] mb-2">{stat.label}</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.description}</p>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <MissionCTA />
      </div>
    </div>
  );
};