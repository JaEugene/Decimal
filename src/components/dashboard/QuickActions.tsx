import { FC } from 'react';
import { Card } from '../ui/Card';
import { Plus, TrendingUp, Shield, FileText } from 'lucide-react';
import { Button } from '../ui/Button';

interface QuickAction {
  id: string;
  icon: typeof Plus;
  label: string;
  onClick: () => void;
}
import { useNavigate } from 'react-router-dom';

export const QuickActions: FC = () => {
  const navigate = useNavigate();

  const actions: QuickAction[] = [
    {
      id: 'create',
      icon: Plus,
      label: 'Create Milestone',
      onClick: () => navigate('/performance')
    },
    {
      id: 'invest',
      icon: TrendingUp,
      label: 'Buy E-Qoins',
      onClick: () => navigate('/marketplace')
    },
    {
      id: 'compliance',
      icon: Shield,
      label: 'Review Compliance',
      onClick: () => navigate('/compliance')
    },
    {
      id: 'report',
      icon: FileText,
      label: 'Generate Report',
      onClick: () => navigate('/playbook')
    }
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map(({ id, icon: Icon, label, onClick }) => (
          <Button
            key={id}
            variant="secondary"
            className="flex items-center gap-2 justify-center"
            onClick={onClick}
          >
            <Icon size={16} />
            <span>{label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};