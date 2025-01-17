import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { athleteLevels } from '../../../constants/athleteLevels';
import { states } from '../../../constants/states';
import { Card } from '../../ui/Card';

export const ContractForm: FC<ContractFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, watch } = useForm<ContractFormData>();
  const selectedLevel = watch('athleteLevel');

  const getDurationOptions = () => {
    const options = [];
    
    for (let month = 1; month <= 11; month++) {
      options.push({
        value: month,
        label: `${month} Month${month > 1 ? 's' : ''}`
      });
    }
    
    const maxYears = selectedLevel === 'youth' ? 2 : 
                    selectedLevel === 'amateur' ? 4 : 6;
                    
    for (let year = 1; year <= maxYears; year++) {
      options.push({
        value: year * 12,
        label: `${year} Year${year > 1 ? 's' : ''}`
      });
    }

    return options;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Athlete Level</label>
              <select
                {...register('athleteLevel')}
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
              >
                <option value="">Select Level</option>
                {athleteLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">State</label>
              <select
                {...register('state')}
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Contract Type</label>
              <select
                {...register('contractType')}
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
              >
                <option value="">Select Type</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="endorsement">Endorsement</option>
                <option value="revenue_share">Revenue Share</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Duration</label>
              <select
                {...register('duration')}
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
              >
                <option value="">Select Duration</option>
                {getDurationOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white">Compensation Details</label>
            <textarea
              {...register('compensation')}
              className="w-full bg-gray-800 rounded-lg p-3 h-32 text-white"
              placeholder="Enter compensation details..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white">Additional Terms</label>
            <textarea
              {...register('terms')}
              className="w-full bg-gray-800 rounded-lg p-3 h-32 text-white"
              placeholder="Enter additional terms..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0000FF] text-white font-semibold py-3 rounded-lg hover:bg-[#0000CC] transition-colors"
          >
            Preview Contract
          </button>
        </form>
      </Card>
    </div>
  );
};