import { FC } from 'react';
import { Card } from '../../ui/Card';
import { Shield, AlertTriangle, Info } from 'lucide-react';

interface Rule {
  id: string;
  title: string;
  description: string;
  type: 'requirement' | 'restriction' | 'info';
}

const rules: Rule[] = [
  {
    id: '1',
    title: 'Age Restrictions',
    description: 'Athletes under 18 require guardian consent for all contracts.',
    type: 'requirement'
  },
  {
    id: '2',
    title: 'Contract Duration',
    description: 'Maximum contract duration varies by athlete level and state regulations.',
    type: 'restriction'
  },
  {
    id: '3',
    title: 'Revenue Sharing',
    description: 'Revenue sharing agreements must comply with state-specific limits.',
    type: 'requirement'
  },
  {
    id: '4',
    title: 'Disclosure Requirements',
    description: 'All NIL deals must be reported to the educational institution.',
    type: 'requirement'
  },
  {
    id: '5',
    title: 'Prohibited Industries',
    description: 'Contracts with gambling, alcohol, or tobacco industries are not permitted.',
    type: 'restriction'
  }
];

const iconMap = {
  requirement: Shield,
  restriction: AlertTriangle,
  info: Info
};

const colorMap = {
  requirement: 'text-blue-400',
  restriction: 'text-red-400',
  info: 'text-gray-400'
};

export const ComplianceRules: FC = () => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Compliance Rules & Guidelines</h3>
      
      <div className="space-y-4">
        {rules.map(rule => {
          const Icon = iconMap[rule.type];
          const colorClass = colorMap[rule.type];
          
          return (
            <div
              key={rule.id}
              className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg"
            >
              <Icon className={colorClass} size={20} />
              <div>
                <h4 className="font-semibold">{rule.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{rule.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};