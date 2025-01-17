import { FC } from 'react';
import { usePerformanceData } from '../hooks/usePerformanceData';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { WelcomeHeader } from '../components/dashboard/WelcomeHeader';
import { WelcomeHero } from '../components/dashboard/WelcomeHero';
import { HowItWorks } from '../components/dashboard/HowItWorks';
import { FeatureShowcase } from '../components/dashboard/FeatureShowcase';
import { PerformanceMetrics } from '../components/dashboard/PerformanceMetrics';
import { LiveMetrics } from '../components/dashboard/LiveMetrics';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { QuickActions } from '../components/dashboard/QuickActions';
import { NotificationBar } from '../components/dashboard/NotificationBar';
import { MarketInsights } from '../components/dashboard/MarketInsights';

export const Dashboard: FC = () => {
  const { data, loading, error } = usePerformanceData('1M');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const { eqoinPrice, totalInvestors, marketCap, priceChange } = data;

  return (
    <div className="min-h-screen">
      <WelcomeHeader />
      <WelcomeHero />
      <HowItWorks />
      <FeatureShowcase />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <NotificationBar />

        <div className="space-y-6">
          <PerformanceMetrics />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <LiveMetrics
                currentPrice={eqoinPrice}
                totalInvestors={totalInvestors}
                marketCap={marketCap}
                priceChange={priceChange}
              />
              <QuickActions />
            </div>

            <div className="lg:col-span-4">
              <ActivityFeed />
            </div>
          </div>

          <div className="col-span-full">
            <MarketInsights />
          </div>
        </div>
      </div>
    </div>
  );
};