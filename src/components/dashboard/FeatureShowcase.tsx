import { FC } from 'react';
import { Card } from '../ui/Card';
import { LineChart as ChartLineUp, Coins, Shield, Users } from 'lucide-react';

const features = [
  {
    title: 'Smart Performance Tracking',
    description: 'Monitor your E-Qoin performance with real-time analytics and insights. Our advanced tracking system helps you understand market trends, investor sentiment, and growth opportunities.',
    icon: ChartLineUp,
    image: '/src/components/dashboard/Performance Tracking.png',
    imageAlt: 'Analytics dashboard showing performance metrics'
  },
  {
    title: 'Seamless Token Creation',
    description: 'Create and customize your E-Qoins with our intuitive token creation system. Set supply, define milestones, and establish payout schedules all in one place.',
    icon: Coins,
    image: '/src/components/dashboard/Smart Qoin Creation.png',
    imageAlt: 'Token creation interface showing customization options',
    reverse: true
  },
  {
    title: 'Compliance Made Simple',
    description: 'Stay compliant with our built-in regulatory checks and balances. Our system automatically validates your actions against current NIL regulations and guidelines.',
    icon: Shield,
    image: '/src/components/dashboard/Complaince Made Simple.png',
    imageAlt: 'Compliance dashboard interface'
  },
  {
    title: 'Community Engagement',
    description: 'Connect with investors and supporters through our integrated community features. Share updates, track engagement, and build lasting relationships with your stakeholder network.',
    icon: Users,
    image: '/src/components/dashboard/Community Engagement.png',
    imageAlt: 'Community engagement platform',
    reverse: true
  }
];

export const FeatureShowcase: FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#4169E1]/5">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Powerful Features for Athletes
        </h2>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col ${feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
            >
              {/* Feature Description */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#4169E1]/10 text-[#4169E1]">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Feature Visual */}
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#4169E1]/20 to-[#4169E1]/0 rounded-xl blur-xl transition-all duration-500 group-hover:inset-0 group-hover:blur-2xl" />
                  <div className="relative">
                    <Card className="overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.imageAlt}
                        className="w-full h-[300px] object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};