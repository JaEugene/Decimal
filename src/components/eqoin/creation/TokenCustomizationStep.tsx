import { FC } from 'react';
import { Coins, Palette, DollarSign, Users } from 'lucide-react';

interface TokenCustomizationProps {
  formData: {
    tokenName: string;
    tokenSymbol: string;
    initialSupply: number;
    initialPrice: number;
    purpose: string;
    distributionModel: string;
  };
  onChange: (data: Partial<TokenCustomizationProps['formData']>) => void;
}

export const TokenCustomizationStep: FC<TokenCustomizationProps> = ({
  formData,
  onChange
}) => {
  const purposes = [
    { value: 'sponsorship', label: 'Sponsorship & Endorsements' },
    { value: 'crowdfunding', label: 'Community Crowdfunding' },
    { value: 'engagement', label: 'Fan Engagement & Rewards' }
  ];

  const distributionModels = [
    { value: 'fixed', label: 'Fixed Supply' },
    { value: 'dynamic', label: 'Dynamic Supply' }
  ];

  const calculateMarketCap = () => {
    return (formData.initialSupply || 0) * (formData.initialPrice || 0);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Customize Your EquityQoin
        </h2>
        <p className="text-gray-600">
          Define the specifics of your token, including name, supply, and distribution settings.
          These parameters will determine how your token operates and grows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Token Basics */}
        <div className="space-y-6">
          <div className="p-6 bg-[#0000FF]/5 rounded-xl border border-[#0000FF]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#0000FF] rounded-lg">
                <Coins className="text-white" size={20} />
              </div>
              <h3 className="font-semibold text-gray-900">Token Basics</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token Name
                </label>
                <input
                  type="text"
                  value={formData.tokenName}
                  onChange={(e) => onChange({ tokenName: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
                  placeholder="e.g., AthleteNameCoin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token Symbol
                </label>
                <input
                  type="text"
                  value={formData.tokenSymbol}
                  onChange={(e) => onChange({ tokenSymbol: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
                  placeholder="e.g., ANC"
                  maxLength={5}
                />
              </div>
            </div>
          </div>

          {/* Token Economics */}
          <div className="p-6 bg-[#0000FF]/5 rounded-xl border border-[#0000FF]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#0000FF] rounded-lg">
                <DollarSign className="text-white" size={20} />
              </div>
              <h3 className="font-semibold text-gray-900">Token Economics</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Supply
                </label>
                <input
                  type="number"
                  value={formData.initialSupply}
                  onChange={(e) => onChange({ initialSupply: Number(e.target.value) })}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
                  placeholder="e.g., 1000000"
                  min="1000"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Price (USD)
                </label>
                <input
                  type="number"
                  value={formData.initialPrice}
                  onChange={(e) => onChange({ initialPrice: Number(e.target.value) })}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
                  placeholder="e.g., 1.00"
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Token Configuration */}
        <div className="space-y-6">
          <div className="p-6 bg-[#0000FF]/5 rounded-xl border border-[#0000FF]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#0000FF] rounded-lg">
                <Users className="text-white" size={20} />
              </div>
              <h3 className="font-semibold text-gray-900">Token Configuration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token Purpose
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => onChange({ purpose: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
                >
                  <option value="">Select Purpose</option>
                  {purposes.map(purpose => (
                    <option key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distribution Model
                </label>
                <select
                  value={formData.distributionModel}
                  onChange={(e) => onChange({ distributionModel: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
                >
                  <option value="">Select Model</option>
                  {distributionModels.map(model => (
                    <option key={model.value} value={model.value}>
                      {model.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Market Cap Preview */}
          <div className="p-6 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-4">Initial Market Cap</h3>
            <div className="text-3xl font-bold text-green-600">
              ${calculateMarketCap().toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Based on initial supply and price
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};