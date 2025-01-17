import { FC } from 'react';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface ComplianceStatsProps {
  totalContracts: number;
  compliantCount: number;
  pendingCount: number;
  nonCompliantCount: number;
}

export const ComplianceStats: FC<ComplianceStatsProps> = ({
  totalContracts,
  compliantCount,
  pendingCount,
  nonCompliantCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-lg hover:bg-black/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Total Contracts</h3>
          <span className="text-3xl font-bold text-white">{totalContracts}</span>
        </div>
      </div>
      
      <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 p-6 rounded-lg hover:bg-black/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-400" size={20} />
            <h3 className="text-lg font-medium text-white">Compliant</h3>
          </div>
          <span className="text-3xl font-bold text-white">{compliantCount}</span>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 p-6 rounded-lg hover:bg-black/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-400" size={20} />
            <h3 className="text-lg font-medium text-white">Pending</h3>
          </div>
          <span className="text-3xl font-bold text-white">{pendingCount}</span>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-sm border border-red-500/20 p-6 rounded-lg hover:bg-black/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-400" size={20} />
            <h3 className="text-lg font-medium text-white">Non-Compliant</h3>
          </div>
          <span className="text-3xl font-bold text-white">{nonCompliantCount}</span>
        </div>
      </div>
    </div>
  );
};