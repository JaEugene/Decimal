import { FC, useState } from 'react';
import { Card } from '../ui/Card';
import { ArrowRight } from 'lucide-react';

interface Decision {
  id: string;
  question: string;
  options: Array<{
    text: string;
    nextId?: string;
    result?: string;
  }>;
}

interface DecisionTreeProps {
  title: string;
  decisions: Decision[];
  onComplete: (result: string) => void;
}

export const DecisionTree: FC<DecisionTreeProps> = ({
  title,
  decisions,
  onComplete
}) => {
  const [currentDecision, setCurrentDecision] = useState<string>(decisions[0].id);
  const [result, setResult] = useState<string | null>(null);

  const handleOption = (option: { text: string; nextId?: string; result?: string }) => {
    if (option.result) {
      setResult(option.result);
      onComplete(option.result);
    } else if (option.nextId) {
      setCurrentDecision(option.nextId);
    }
  };

  const current = decisions.find(d => d.id === currentDecision);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      
      {!result && current && (
        <div className="space-y-6">
          <p className="text-lg">{current.question}</p>
          <div className="space-y-3">
            {current.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOption(option)}
                className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span>{option.text}</span>
                <ArrowRight size={20} className="text-blue-500" />
              </button>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="bg-blue-500/20 p-4 rounded-lg">
          <p className="font-semibold mb-2">Recommendation:</p>
          <p>{result}</p>
        </div>
      )}
    </Card>
  );
};