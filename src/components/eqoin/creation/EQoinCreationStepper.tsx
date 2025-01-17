import { FC, useState, useEffect } from 'react';
import { Card } from '../../ui/Card';
import { MilestoneSelector } from './MilestoneSelector';
import { PayoutScheduler } from './PayoutScheduler';
import { TokenCustomizer } from './TokenCustomizer';
import { ComplianceCheck } from './ComplianceCheck';
import { SuccessModal } from './SuccessModal';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface EQoinCreationStepperProps {
  onComplete: (data: any) => void;
}

export const EQoinCreationStepper: FC<EQoinCreationStepperProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalData, setSuccessModalData] = useState<any>(null);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [data, setData] = useState({
    milestones: [],
    schedules: [],
    customization: {
      tokenName: '',
      tokenSymbol: '',
      supply: 1000000,
      value: 1.00,
      primaryColor: '#0000FF',
      secondaryColor: '#4040FF',
      purpose: '',
      distributionModel: ''
    },
    complianceIssues: []
  });

  // Validate current step
  useEffect(() => {
    validateCurrentStep();
  }, [step, data]);

  const validateCurrentStep = () => {
    let isValid = false;
    
    switch (step) {
      case 1:
        isValid = Boolean(
          data.customization.tokenName &&
          data.customization.tokenSymbol &&
          data.customization.purpose &&
          data.customization.distributionModel
        );
        break;
      case 2:
        isValid = data.milestones.length > 0;
        break;
      case 3:
        isValid = data.schedules.length > 0;
        break;
      case 4:
        isValid = data.complianceIssues.length === 0;
        break;
    }

    setIsNextEnabled(isValid);
  };

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const nextStep = () => {
    if (!isNextEnabled) return;
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleComplete = async () => {
    if (!isNextEnabled) return;

    // Prepare success data
    const successData = {
      tokenName: data.customization.tokenName,
      purpose: data.customization.purpose,
      distributionModel: data.customization.distributionModel,
      supply: data.customization.supply,
      value: data.customization.value,
      milestones: data.milestones,
      payoutConfig: {
        type: data.schedules[0]?.type || 'One-time',
        schedule: data.schedules[0]?.schedule
      }
    };

    // Trigger success animations
    triggerConfetti();
    setSuccessModalData(successData);
    setShowSuccessModal(true);

    // Complete the process
    setTimeout(() => {
      onComplete(data);
    }, 2000);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8 relative">
        {/* Progress bar background */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
        
        {/* Animated progress bar */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-[#0000FF] -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />

        {[1, 2, 3, 4].map(number => (
          <motion.div 
            key={number}
            className="relative z-10"
            initial={false}
            animate={{
              scale: step === number ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                step >= number 
                  ? 'bg-[#0000FF] text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {number}
            </div>
            {step === number && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#0000FF]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div 
        key={step}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="mb-8"
      >
        {step === 1 && (
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

        {step === 2 && (
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

        {step === 3 && (
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
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {step > 1 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prevStep}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: isNextEnabled ? 1.02 : 1 }}
          whileTap={{ scale: isNextEnabled ? 0.98 : 1 }}
          onClick={step < 4 ? nextStep : handleComplete}
          disabled={!isNextEnabled}
          className={`px-6 py-2 rounded-lg ml-auto transition-all duration-300 ${
            isNextEnabled
              ? 'bg-[#0000FF] text-white hover:bg-[#0000CC] cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {step < 4 ? 'Next' : 'Create EquityQoin'}
        </motion.button>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        data={successModalData}
      />
    </Card>
  );
};