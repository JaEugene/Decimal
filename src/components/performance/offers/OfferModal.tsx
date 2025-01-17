import { FC, useState } from 'react';
import { X, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { useOfferLimits } from '../../../hooks/useOfferLimits';

const offerSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  subject: z.string().min(1, 'Subject is required'),
  terms: z.string().min(10, 'Terms must be at least 10 characters'),
  expiration: z.string().min(1, 'Expiration date is required')
});

type OfferFormData = z.infer<typeof offerSchema>;

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OfferFormData) => void;
}

export const OfferModal: FC<OfferModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<OfferFormData>();
  const { offersSubmitted, offerLimit, canSubmitOffer } = useOfferLimits();
  const [showTerms, setShowTerms] = useState(false);

  const handleFormSubmit = (data: OfferFormData) => {
    if (!canSubmitOffer) {
      alert('Offer limit reached for the fiscal year. You cannot submit additional offers until the next fiscal year.');
      return;
    }
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold">Submit Offer</h2>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <Info size={16} className="text-[#0000FF]" />
            <span>You have submitted {offersSubmitted} of {offerLimit} offers this fiscal year</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">
                Terms & Conditions
                <span className="text-red-400 ml-1">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowTerms(!showTerms)}
                className="text-sm text-[#0000FF]"
              >
                {showTerms ? 'Hide Terms' : 'View Terms'}
              </button>
            </div>
            {showTerms && (
              <div className="mb-2 p-2 bg-gray-800 rounded text-sm">
                <p>Standard terms and conditions for offer submission:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>All offers are subject to review and approval</li>
                  <li>Offers cannot be modified after submission</li>
                  <li>Minimum holding period of 30 days applies</li>
                </ul>
              </div>
            )}
            <textarea
              {...register('terms')}
              className="w-full bg-gray-800 rounded p-2 h-24"
              placeholder="Enter additional terms..."
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
      </Card>
    </div>
  );
};