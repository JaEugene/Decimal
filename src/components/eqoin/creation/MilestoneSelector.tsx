import { FC, useState } from 'react';
import { Plus, X, AlertCircle } from 'lucide-react';
import { Card } from '../../ui/Card';
import { MilestoneCard } from './MilestoneCard';
import { CustomMilestoneForm } from './CustomMilestoneForm';

interface Milestone {
  id: string;
  title: string;
  description: string;
  target: number;
  category?: string;
}

interface MilestoneSelectorProps {
  selectedMilestones: Milestone[];
  onAddMilestone: (milestone: Milestone) => void;
  onRemoveMilestone: (id: string) => void;
}

const categories = ['Performance', 'Community', 'Brand', 'Education', 'Training'];

export const MilestoneSelector: FC<MilestoneSelectorProps> = ({
  selectedMilestones,
  onAddMilestone,
  onRemoveMilestone
}) => {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [hasNoMilestones, setHasNoMilestones] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleMilestoneToggle = (milestone: any) => {
    if (milestone.id === 'no_milestones') {
      setHasNoMilestones(true);
      selectedMilestones.forEach(m => onRemoveMilestone(m.id));
      return;
    }

    if (milestone.id === 'custom') {
      setShowCustomForm(true);
      return;
    }

    if (hasNoMilestones) {
      setHasNoMilestones(false);
    }

    const isSelected = selectedMilestones.some(m => m.id === milestone.id);
    if (isSelected) {
      onRemoveMilestone(milestone.id);
    } else {
      onAddMilestone(milestone);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Select Your Milestones
        </h2>
        <p className="text-gray-600">
          Choose milestones that align with your career goals and create value for your supporters.
          Each milestone represents a key achievement in your journey.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            !selectedCategory 
              ? 'bg-[#0000FF] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-[#0000FF] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* No Milestones Alert */}
      {hasNoMilestones && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <AlertCircle className="text-blue-500 flex-shrink-0" size={20} />
          <p className="text-sm text-blue-700">
            You've chosen to proceed without milestones. Your E-Qoin will be created without specific achievement targets.
          </p>
          <button
            onClick={() => setHasNoMilestones(false)}
            className="ml-auto text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Add Milestones
          </button>
        </div>
      )}

      {/* Milestones Grid */}
      {!hasNoMilestones && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Milestone Cards */}
          <div className="p-4 bg-white rounded-xl border border-[#0000FF]/20 hover:bg-[#0000FF]/5 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">In Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Plus className="text-[#0000FF] w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Launch of youth development program</h4>
                  <p className="text-sm text-gray-600">Target: Jun 14, 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Completed Milestones */}
          <div className="p-4 bg-white rounded-xl border border-[#0000FF]/20 hover:bg-[#0000FF]/5 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <X className="text-green-500 w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Selected for the 2024 All-Star Game</h4>
                  <p className="text-sm text-gray-600">Target: Feb 17, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Form */}
      {showCustomForm && (
        <CustomMilestoneForm
          onSubmit={(milestone) => {
            onAddMilestone({
              ...milestone,
              id: `custom-${Date.now()}`
            });
            setShowCustomForm(false);
          }}
          onCancel={() => setShowCustomForm(false)}
        />
      )}

      {/* Selected Milestones */}
      {selectedMilestones.length > 0 && !hasNoMilestones && (
        <div className="mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">
            Selected Milestones ({selectedMilestones.length})
          </h3>
          <div className="space-y-3">
            {selectedMilestones.map(milestone => (
              <div
                key={milestone.id}
                className="flex items-start justify-between p-4 bg-white rounded-xl border border-[#0000FF]/20 hover:bg-[#0000FF]/5 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                </div>
                <button
                  onClick={() => onRemoveMilestone(milestone.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};