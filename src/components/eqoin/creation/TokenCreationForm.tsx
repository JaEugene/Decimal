import { FC, useState } from 'react';
import { StepIndicator } from './StepIndicator';
import { MilestoneSelector } from './MilestoneSelector';
import { PayoutConfiguration } from './PayoutConfiguration';
import { TokenCustomizationStep } from './TokenCustomizationStep';
import { ComplianceCheck } from './ComplianceCheck';

interface TokenCreationFormData {
  // Token Customization
  tokenName: string;
  tokenSymbol: string;
  initialSupply: number;
  initialPrice: number;
  purpose: string;
  distributionModel: string;

  // Milestones
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    target: number;
  }>;

  // Payout Configuration
  payoutType: string;
  payoutAmount: number;
  payoutFrequency: string;
  startDate: string;
  milestonePayouts: Array<{
    milestoneId: string;
    amount: number;
  }>;

  // Compliance
  complianceIssues: Array<{
    id: string;
    type: 'error' | 'warning';
    message: string;
  }>;
}

export const TokenCreationForm: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TokenCreationFormData>({
    tokenName: '',
    tokenSymbol: '',
    initialSupply: 1000000,
    initialPrice: 1.00,
    purpose: '',
    distributionModel: '',
    milestones: [],
    payoutType: '',
    payoutAmount: 0,
    payoutFrequency: '',
    startDate: '',
    milestonePayouts: [],
    complianceIssues: []
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Implement form submission logic
    console.log('Form submitted:', formData);
  };

  const updateFormData = (updates: Partial<TokenCreationFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Introduction */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Create Your EquityQoin
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Follow these steps to create your personalized EquityQoin. Define your milestones,
          configure payouts, and ensure compliance with all regulations.
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} totalSteps={4} />

      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && (
          <TokenCustomizationStep
            formData={formData}
            onChange={updateFormData}
          />
        )}

        {currentStep === 2 && (
          <MilestoneSelector
            selectedMilestones={formData.milestones}
            onAddMilestone={(milestone) => 
              updateFormData({
                milestones: [...formData.milestones, milestone]
              })
            }
            onRemoveMilestone={(id) =>
              updateFormData({
                milestones: formData.milestones.filter(m => m.id !== id)
              })
            }
          />
        )}

        {currentStep === 3 && (
          <PayoutConfiguration
            formData={formData}
            onChange={updateFormData}
            totalValue={formData.initialSupply * formData.initialPrice}
          />
        )}

        {currentStep === 4 && (
          <ComplianceCheck
            issues={formData.complianceIssues}
            onResolve={(id) =>
              updateFormData({
                complianceIssues: formData.complianceIssues.filter(i => i.id !== id)
              })
            }
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
        )}
        
        <button
          onClick={handleNext}
          className={`
            px-6 py-2 rounded-lg transition-colors ml-auto
            ${currentStep === 4
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-[#0000FF] hover:bg-[#0000CC] text-white'
            }
          `}
        >
          {currentStep === 4 ? 'Create EquityQoin' : 'Next'}
        </button>
      </div>
    </div>
  );
};