import { FC } from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between mb-12">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div className={`
            relative w-12 h-12 rounded-full flex items-center justify-center
            transition-all duration-500 
            ${index + 1 <= currentStep 
              ? 'bg-[#0000FF] text-white' 
              : 'bg-gray-100 text-gray-400'
            }
          `}>
            {/* Animated ring on active step */}
            {index + 1 === currentStep && (
              <div className="absolute inset-0 rounded-full border-2 border-[#0000FF] animate-ping" />
            )}
            
            {/* Step number */}
            <span className="font-semibold text-lg">{index + 1}</span>
          </div>
          
          {/* Connector line */}
          {index < totalSteps - 1 && (
            <div className="flex-1 mx-4">
              <div className={`
                h-1 transition-all duration-500
                ${index + 1 < currentStep ? 'bg-[#0000FF]' : 'bg-gray-200'}
              `} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};