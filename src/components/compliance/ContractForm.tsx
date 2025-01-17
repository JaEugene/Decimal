import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { athleteLevels } from '../../constants/athleteLevels';

interface ContractFormProps {
  onSubmit: (data: any) => void;
}

export const ContractForm: FC<ContractFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const selectedLevel = watch('athleteLevel');
  const selectedDuration = watch('duration');

  const selectedAthleteLevel = athleteLevels.find(level => level.value === selectedLevel);
  const maxDuration = selectedAthleteLevel?.maxDuration || 6;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields remain the same */}
      <button
        type="submit"
        className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors"
      >
        Preview Contract
      </button>
    </form>
  );
};