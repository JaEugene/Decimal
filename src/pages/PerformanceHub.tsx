import { useState } from 'react';
import { WidgetGrid } from '../components/performance/widgets/WidgetGrid';
import { StakeholderChart } from '../components/performance/stakeholders/StakeholderChart';
import { MilestoneProgress } from '../components/performance/milestones/MilestoneProgress';
import { OfferModal } from '../components/performance/offers/OfferModal';
import { usePerformanceData } from '../hooks/usePerformanceData';

export const PerformanceHub = () => {
  const [timeRange, setTimeRange] = useState('1M');
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const { data, loading, error } = usePerformanceData(timeRange);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0000FF] mx-auto mb-4"></div>
        <p className="text-gray-400">Loading performance data...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-400 p-8 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Performance Hub</h1>
        <button
          onClick={() => setIsOfferModalOpen(true)}
          className="px-4 py-2 bg-[#0000FF] text-white rounded-lg hover:bg-[#0000CC]"
        >
          Submit Offer
        </button>
      </div>

      <WidgetGrid />

      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        onSubmit={(data) => {
          console.log('Offer submitted:', data);
          setIsOfferModalOpen(false);
        }}
      />
    </div>
  );
};