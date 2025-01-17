import { FC, useState } from 'react';
import { X } from 'lucide-react';

interface CustomMilestoneFormProps {
  onSubmit: (milestone: {
    title: string;
    description: string;
    target: number;
  }) => void;
  onCancel: () => void;
}

export const CustomMilestoneForm: FC<CustomMilestoneFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-[#0000FF]/5 rounded-xl border border-[#0000FF]/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Create Custom Milestone</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Milestone Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
            placeholder="Enter milestone title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
            placeholder="Describe your milestone"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Value
          </label>
          <input
            type="number"
            value={formData.target}
            onChange={(e) => setFormData({ ...formData, target: Number(e.target.value) })}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0000FF] transition-all"
            min="1"
            required
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-[#0000FF] text-white font-semibold py-2 rounded-lg hover:bg-[#0000CC] transition-colors"
          >
            Add Milestone
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};