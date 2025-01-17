import { FC } from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../../ui/Card';

interface ComplianceIssue {
  id: string;
  type: 'error' | 'warning';
  message: string;
}

interface ComplianceCheckProps {
  issues: ComplianceIssue[];
  onResolve: (id: string) => void;
}

export const ComplianceCheck: FC<ComplianceCheckProps> = ({
  issues,
  onResolve
}) => {
  const hasErrors = issues.some(issue => issue.type === 'error');

  return (
    <div className="space-y-6">
      <Card className={`${hasErrors ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
        <div className="flex items-center gap-3">
          {hasErrors ? (
            <AlertTriangle className="text-red-500" size={24} />
          ) : (
            <CheckCircle className="text-green-500" size={24} />
          )}
          <div>
            <h3 className="font-semibold">Compliance Status</h3>
            <p className="text-sm text-gray-400">
              {hasErrors 
                ? 'Please resolve the following issues before proceeding'
                : 'All compliance checks passed successfully'}
            </p>
          </div>
        </div>
      </Card>

      {issues.length > 0 && (
        <div className="space-y-3">
          {issues.map(issue => (
            <Card 
              key={issue.id}
              className={`${
                issue.type === 'error' ? 'bg-red-500/10' : 'bg-yellow-500/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {issue.type === 'error' ? (
                    <AlertTriangle className="text-red-500 mt-1" size={20} />
                  ) : (
                    <Shield className="text-yellow-500 mt-1" size={20} />
                  )}
                  <div>
                    <p className="font-medium">{issue.message}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Click resolve once you've addressed this issue
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onResolve(issue.id)}
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  Resolve
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};