import { FC } from 'react';
import { Calendar, DollarSign, Clock, Target } from 'lucide-react';

interface PayoutConfigurationProps {
  formData: {
    payoutType: string;
    payoutAmount: number;
    payoutFrequency: string;
    startDate: string;
    milestonePayouts: Array<{
      milestoneId: string;
      amount: number;
    }>;
  };
  onChange: (updates: Partial<PayoutConfigurationProps['formData']>) => void;
  totalValue: number;
}

export const PayoutConfiguration: FC<PayoutConfigurationProps> = ({
  formData,
  onChange,
  totalValue
}) => {
  const payoutTypes = [
    {
      id: 'one-time',
      title: 'One-Time Payment',
      description: 'Full amount paid upon completion',
      icon: DollarSign
    },
    {
      id: 'periodic',
      title: 'Periodic Payments',
      description: 'Regular payments over time',
      icon: Clock
    },
    {
      id: 'milestone',
      title: 'Milestone-Based',
      description: 'Payments tied to achievements',
      icon: Target
    }
  ];

  const frequencies = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annually', label: 'Annually' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Configure Payouts
        </h2>
        <p className="text-gray-600">
          Set up how and when token holders will receive their returns. Choose a payout structure that aligns with your goals and milestones.
        </p>
      </div>

      {/* Payout Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {payoutTypes.map(type => (
          <button
            key={type.id}
            onClick={() => onChange({ payoutType: type.id })}
            className={`
              p-6 rounded-xl text-left transition-all duration-300 group
              ${formData.payoutType === type.id
                ? 'bg-[#0000FF]/10 border-2 border-[#0000FF]'
                : 'bg-white border-2 border-transparent hover:border-[#0000FF]/30'
              }
            `}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`
                p-2 rounded-lg transition-colors
                ${formData.payoutType === type.id
                  ? 'bg-[#0000FF] text-white'
                  : 'bg-gray-100 text-gray-400 group-hover:bg-[#0000FF]/10 group-hover:text-[#0000FF]'
                }
              `}>
                <type.icon size={20} />
              </div>
              <h3 className="font-semibold text-gray-900">{type.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{type.description}</p>
          </button>
        ))}
      </div>

      {/* Payout Details */}
      {formData.payoutType && (
        <div className="bg-[#0000FF]/5 rounded-xl border border-[#0000FF]/20 p-6">
          <div className="space-y-6">
            {/* Amount Configuration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payout Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="number"
                  value={formData.payoutAmount}
                  onChange={(e) => onChange({ payoutAmount: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
                  placeholder="Enter amount"
                  min={0}
                  max={totalValue}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Maximum available: ${totalValue.toLocaleString()}
              </p>
            </div>

            {/* Frequency Selection (for periodic payments) */}
            {formData.payoutType === 'periodic' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Frequency
                </label>
                <select
                  value={formData.payoutFrequency}
                  onChange={(e) => onChange({ payoutFrequency: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
                >
                  <option value="">Select Frequency</option>
                  {frequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => onChange({ startDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Card */}
      {formData.payoutType && (
        <div className="bg-green-50 rounded-xl border border-green-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Payout Summary</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Type:</span> {payoutTypes.find(t => t.id === formData.payoutType)?.title}
            </p>
            {formData.payoutAmount > 0 && (
              <p className="text-gray-600">
                <span className="font-medium">Amount:</span> ${formData.payoutAmount.toLocaleString()}
              </p>
            )}
            {formData.payoutFrequency && (
              <p className="text-gray-600">
                <span className="font-medium">Frequency:</span> {frequencies.find(f => f.value === formData.payoutFrequency)?.label}
              </p>
            )}
            {formData.startDate && (
              <p className="text-gray-600">
                <span className="font-medium">Starting:</span> {new Date(formData.startDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};