import { FC, useState, useEffect } from 'react';
import { Card } from '../../ui/Card';
import { MilestoneSelector } from './MilestoneSelector';
import { PayoutScheduler } from './PayoutScheduler';
import { TokenCustomizer } from './TokenCustomizer';
import { ComplianceCheck } from './ComplianceCheck';
import { Star, Sparkles, PartyPopper, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Validate current step data
  useEffect(() => {
    const validateStep = () => {
      switch (step) {
        case 1:
          setIsNextEnabled(
            data.customization.supply > 0 &&
            data.customization.value > 0 &&
            data.customization.primaryColor &&
            data.customization.secondaryColor
          );
          break;
        case 2:
          setIsNextEnabled(data.milestones.length > 0);
          break;
        case 3:
          setIsNextEnabled(data.schedules.length > 0);
          break;
        case 4:
          setIsNextEnabled(data.complianceIssues.length === 0);
          break;
        default:
          setIsNextEnabled(true);
      }
    };
    validateStep();
  }, [step, data]);

  const nextStep = () => {
    if (isNextEnabled) {
      // Trigger button animation
      const button = document.getElementById('next-button');
      if (button) {
        button.classList.add('scale-110');
        setTimeout(() => button.classList.remove('scale-110'), 200);
      }

      // Progress celebration
      if (step < 4) {
        const progressIndicator = document.querySelector(`.step-${step + 1}`);
        if (progressIndicator) {
          progressIndicator.classList.add('animate-bounce');
          setTimeout(() => progressIndicator.classList.remove('animate-bounce'), 1000);
        }
      }

      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleComplete = () => {
    setShowCelebration(true);
    
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Show success message and complete
    setTimeout(() => {
      onComplete(data);
    }, 2000);
  };

  return (
    <Card className="max-w-4xl mx-auto relative overflow-hidden">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8 relative">
        {[1, 2, 3, 4].map(number => (
          <div key={number} className="flex items-center relative">
            <div
              className={`
                step-${number} w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-500 relative
                ${step >= number 
                  ? 'bg-[#0000FF] text-white' 
                  : 'bg-gray-200 text-gray-400'
                }
                ${step === number && 'ring-4 ring-[#0000FF]/20'}
              `}
            >
              {step > number ? (
                <Trophy className="w-6 h-6 animate-pulse" />
              ) : (
                <span className="text-lg font-bold">{number}</span>
              )}
              
              {/* Animated glow effect */}
              {step === number && (
                <div className="absolute inset-0 rounded-full bg-[#0000FF]/20 animate-ping" />
              )}
            </div>
            {number < 4 && (
              <div
                className={`
                  h-1 w-16 mx-2 transition-all duration-500
                  ${step > number ? 'bg-[#0000FF]' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mb-8">
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
      </div>

      <div className="flex justify-between">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            Back
          </button>
        )}
        
        {step < 4 ? (
          <button
            id="next-button"
            onClick={nextStep}
            disabled={!isNextEnabled}
            className={`
              px-6 py-2 rounded-lg ml-auto
              transition-all duration-300 transform
              flex items-center gap-2
              ${isNextEnabled
                ? 'bg-[#0000FF] text-white hover:bg-[#0000CC] hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Next
            {isNextEnabled && <Sparkles className="w-5 h-5 animate-pulse" />}
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={!isNextEnabled}
            className={`
              px-6 py-2 rounded-lg ml-auto
              transition-all duration-300 transform
              flex items-center gap-2
              ${isNextEnabled
                ? 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
              ${showCelebration && 'animate-bounce'}
            `}
          >
            {showCelebration ? (
              <>
                <PartyPopper className="w-5 h-5" />
                Success!
              </>
            ) : (
              <>
                <Star className="w-5 h-5" />
                Create EquityQoin
              </>
            )}
          </button>
        )}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
        <div
          className="h-full bg-[#0000FF] transition-all duration-500"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>
    </Card>
  );
};