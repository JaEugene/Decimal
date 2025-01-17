import { FC } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ContractPreviewProps {
  contract: {
    athleteLevel: string;
    contractType: string;
    state: string;
    terms: string;
    duration: string;
    compensation: string;
  };
  complianceIssues: string[];
}

export const ContractPreview: FC<ContractPreviewProps> = ({
  contract,
  complianceIssues
}) => {
  const isCompliant = complianceIssues.length === 0;

  return (
    <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Contract Preview</h3>
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
        <p>The term of this agreement is {contract.duration}.</p>
        
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
    </div>
  );
};