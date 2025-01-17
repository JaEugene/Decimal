import { FC } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../../ui/Card';

interface ContractPreviewProps {
  contract: {
    athleteLevel: string;
    contractType: string;
    state: string;
    duration: string;
    compensation: string;
    terms: string;
  };
  complianceIssues: string[];
  onSubmit: () => void;
}

export const ContractPreview: FC<ContractPreviewProps> = ({
  contract,
  complianceIssues,
  onSubmit
}) => {
  const isCompliant = complianceIssues.length === 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Contract Preview</h3>
        <div className={`flex items-center gap-2 ${isCompliant ? 'text-green-400' : 'text-red-400'}`}>
          {isCompliant ? (
            <>
              <CheckCircle size={20} />
              <span>Compliant</span>
            </>
          ) : (
            <>
              <AlertTriangle size={20} />
              <span>Issues Detected</span>
            </>
          )}
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <h4>ATHLETE AGREEMENT</h4>
        <p>This agreement is governed by the laws of {contract.state}.</p>
        
        <h5>1. PARTIES</h5>
        <p>This Agreement is between EquityQoin ("Platform") and the Athlete, classified as a {contract.athleteLevel} athlete.</p>
        
        <h5>2. TYPE OF AGREEMENT</h5>
        <p>This is a {contract.contractType.replace('_', ' ')} agreement.</p>
        
        <h5>3. DURATION</h5>
        <p>The term of this agreement is {contract.duration} months.</p>
        
        <h5>4. COMPENSATION</h5>
        <p>{contract.compensation}</p>
        
        <h5>5. ADDITIONAL TERMS</h5>
        <p>{contract.terms}</p>
      </div>

      {!isCompliant && (
        <div className="mt-6 bg-red-900/50 border border-red-700 rounded-lg p-4">
          <h4 className="font-semibold text-red-400 mb-2">Compliance Issues</h4>
          <ul className="list-disc list-inside text-red-300 space-y-1">
            {complianceIssues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={onSubmit}
          disabled={!isCompliant}
          className={`flex-1 py-2 rounded-lg ${
            isCompliant 
              ? 'bg-[#0000FF] text-white hover:bg-[#0000CC]' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isCompliant ? 'Submit Contract' : 'Fix Issues to Submit'}
        </button>
      </div>
    </Card>
  );
};