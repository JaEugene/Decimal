import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../ui/Button';

const offerSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  subject: z.string().min(1, 'Subject is required'),
  terms: z.string().min(10, 'Terms must be at least 10 characters'),
  expiration: z.string().min(1, 'Expiration date is required')
});

type OfferFormData = z.infer<typeof offerSchema>;

interface OfferFormProps {
  onSubmit: (data: OfferFormData) => void;
  canSubmitOffer: boolean;
}

export const OfferForm: FC<OfferFormProps> = ({ onSubmit, canSubmitOffer }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<OfferFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Amount (USD)
          <span className="text-red-400 ml-1">*</span>
        </label>
        <input
          type="number"
          {...register('amount', { valueAsNumber: true })}
          className="w-full bg-gray-800 rounded p-2"
          placeholder="Enter amount..."
        />
        {errors.amount && (
          <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Subject/Organization
          <span className="text-red-400 ml-1">*</span>
        </label>
        <input
          type="text"
          {...register('subject')}
          className="w-full bg-gray-800 rounded p-2"
          placeholder="Enter subject or organization..."
        />
        {errors.subject && (
          <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Terms & Conditions
          <span className="text-red-400 ml-1">*</span>
        </label>
        <textarea
          {...register('terms')}
          className="w-full bg-gray-800 rounded p-2 h-24"
          placeholder="Enter terms and conditions..."
        />
        {errors.terms && (
          <p className="text-red-400 text-sm mt-1">{errors.terms.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Offer Expiration
          <span className="text-red-400 ml-1">*</span>
        </label>
        <input
          type="date"
          {...register('expiration')}
          className="w-full bg-gray-800 rounded p-2"
          min={new Date().toISOString().split('T')[0]}
        />
        {errors.expiration && (
          <p className="text-red-400 text-sm mt-1">{errors.expiration.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!canSubmitOffer}
        className="w-full"
      >
        Submit Offer
      </Button>
    </form>
  );
};