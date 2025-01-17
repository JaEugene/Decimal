import { FC, useState } from 'react';
import { Card } from '../../ui/Card';
import { MilestoneSelector } from './MilestoneSelector';
import { PayoutScheduler } from './PayoutScheduler';
import { TokenCustomizer } from './TokenCustomizer';
import { ComplianceCheck } from './ComplianceCheck';

interface EQoinCreationStepperProps {
  onComplete: (data: any) => void;
}

export const EQoinCreationStepper: FC<EQoinCreationStepperProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    milestones: [],
    schedules: [],
    customization: {
      supply: 1000000,
      value: 1.00,
      primaryColor: '#0000FF',
      secondaryColor: '#4040FF'
    },
    complianceIssues: []
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleComplete = () => {
    onComplete(data);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map(number => (
          <div key={number} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= number ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {number}
            </div>
            {number < 4 && (
              <div
                className={`h-1 w-16 mx-2 ${
                  step > number ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mb-8">
        {step === 1 && (
          <MilestoneSelector
            selectedMilestones={data.milestones}
            onAddMilestone={(milestone) => 
              setData(prev => ({
                ...prev,
                milestones: [...prev.milestones, milestone]
              }))
            }
            onRemoveMilestone={(id) =>
              setData(prev => ({
                ...prev,
                milestones: prev.milestones.filter(m => m.id !== id)
              }))
            }
          />
        )}

        {step === 2 && (
          <PayoutScheduler
            schedules={data.schedules}
            milestones={data.milestones}
            onAddSchedule={(schedule) =>
              setData(prev => ({
                ...prev,
                schedules: [...prev.schedules, schedule]
              }))
            }
            onRemoveSchedule={(id) =>
              setData(prev => ({
                ...prev,
                schedules: prev.schedules.filter(s => s.id !== id)
              }))
            }
            totalValue={data.customization.supply * data.customization.value}
          />
        )}

        {step === 3 && (
          <TokenCustomizer
            customization={data.customization}
            onChange={(updates) =>
              setData(prev => ({
                ...prev,
                customization: { ...prev.customization, ...updates }
              }))
            }
          />
        )}

        {step === 4 && (
          <ComplianceCheck
            issues={data.complianceIssues}
            onResolve={(id) =>
              setData(prev => ({
                ...prev,
                complianceIssues: prev.complianceIssues.filter(i => i.id !== id)
              }))
            }
          />
        )}
      </div>

      <div className="flex justify-between">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Back
          </button>
        )}
        
        {step < 4 ? (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-auto"
          >
            Create E-Qoin
          </button>
        )}
      </div>
    </Card>
  );
};