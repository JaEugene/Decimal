import { FC, useState } from 'react';
import { DollarSign, Coins, Users, Award } from 'lucide-react';
import { Card } from '../ui/Card';

interface EQoinCreationProps {
  onSubmit: (data: EQoinData) => void;
}

interface EQoinData {
  tokenName: string;
  initialValue: number;
  totalSupply: number;
  revenueShare: number;
  perks: {
    threshold: number;
    description: string;
  }[];
}

export const EQoinCreation: FC<EQoinCreationProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EQoinData>({
    tokenName: '',
    initialValue: 0,
    totalSupply: 0,
    revenueShare: 0,
    perks: []
  });

  const [newPerk, setNewPerk] = useState({ threshold: 0, description: '' });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const addPerk = () => {
    if (newPerk.threshold > 0 && newPerk.description) {
      setFormData({
        ...formData,
        perks: [...formData.perks, newPerk]
      });
      setNewPerk({ threshold: 0, description: '' });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((number) => (
          <div
            key={number}
            className={`flex items-center ${number !== 1 && 'ml-4'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= number ? 'bg-green-500 text-black' : 'bg-gray-700'
              }`}
            >
              {number}
            </div>
            {number < 4 && (
              <div
                className={`h-1 w-16 ml-4 ${
                  step > number ? 'bg-green-500' : 'bg-gray-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Token Details</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Token Name</label>
            <input
              type="text"
              value={formData.tokenName}
              onChange={(e) => setFormData({ ...formData, tokenName: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2"
              placeholder="Enter token name..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Initial Value (USD)</label>
            <input
              type="number"
              value={formData.initialValue}
              onChange={(e) => setFormData({ ...formData, initialValue: Number(e.target.value) })}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2"
              placeholder="Enter initial value..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Total Supply</label>
            <input
              type="number"
              value={formData.totalSupply}
              onChange={(e) => setFormData({ ...formData, totalSupply: Number(e.target.value) })}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2"
              placeholder="Enter total supply..."
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Revenue Sharing</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Revenue Share Percentage</label>
            <input
              type="number"
              value={formData.revenueShare}
              onChange={(e) => setFormData({ ...formData, revenueShare: Number(e.target.value) })}
              className="w-full bg-gray-800 border border-gray-700 rounded p-2"
              placeholder="Enter percentage..."
            />
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="font-medium mb-2">Estimated Returns</h3>
            <p className="text-sm text-gray-400">
              Based on a {formData.revenueShare}% revenue share:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-400 mt-2">
              <li>$100,000 revenue = ${(100000 * (formData.revenueShare / 100)).toLocaleString()} distributed</li>
              <li>$500,000 revenue = ${(500000 * (formData.revenueShare / 100)).toLocaleString()} distributed</li>
              <li>$1,000,000 revenue = ${(1000000 * (formData.revenueShare / 100)).toLocaleString()} distributed</li>
            </ul>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Token Holder Perks</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Investment Threshold</label>
              <input
                type="number"
                value={newPerk.threshold}
                onChange={(e) => setNewPerk({ ...newPerk, threshold: Number(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                placeholder="Enter threshold amount..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Perk Description</label>
              <input
                type="text"
                value={newPerk.description}
                onChange={(e) => setNewPerk({ ...newPerk, description: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded p-2"
                placeholder="Enter perk description..."
              />
            </div>
            <button
              onClick={addPerk}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-400"
            >
              Add Perk
            </button>
          </div>
          <div className="mt-4">
            <h3 className="font-medium mb-2">Current Perks</h3>
            {formData.perks.map((perk, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded mb-2">
                <p className="font-medium">${perk.threshold.toLocaleString()}+ Investment</p>
                <p className="text-sm text-gray-400">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Review & Confirm</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Token Details</h3>
              <div className="bg-gray-800 p-4 rounded space-y-2">
                <p>Name: {formData.tokenName}</p>
                <p>Initial Value: ${formData.initialValue}</p>
                <p>Total Supply: {formData.totalSupply.toLocaleString()} tokens</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Revenue Sharing</h3>
              <div className="bg-gray-800 p-4 rounded">
                <p>{formData.revenueShare}% of revenue shared with token holders</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Perks ({formData.perks.length})</h3>
              <div className="bg-gray-800 p-4 rounded space-y-2">
                {formData.perks.map((perk, index) => (
                  <div key={index}>
                    <p className="font-medium">${perk.threshold.toLocaleString()}+:</p>
                    <p className="text-sm text-gray-400">{perk.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-500 text-black rounded hover:bg-green-400 ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500 text-black rounded hover:bg-green-400 ml-auto"
          >
            Create E-Qoin
          </button>
        )}
      </div>
    </Card>
  );
};