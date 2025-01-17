import { useState } from 'react';
import { ContractCard } from '../components/compliance/ContractCard';
import { ComplianceStats } from '../components/compliance/ComplianceStats';
import { ContractForm } from '../components/compliance/forms/ContractForm';
import { ContractPreview } from '../components/compliance/preview/ContractPreview';
import { ComplianceRules } from '../components/compliance/rules/ComplianceRules';
import { ContactForm } from '../components/compliance/contact/ContactForm';
import { useContracts } from '../hooks/useContracts';
import { Card } from '../components/ui/Card';
import { Shield, FileText, Phone, AlertTriangle, Info } from 'lucide-react';

export const ComplianceHub = () => {
  const { contracts, loading, error, stats } = useContracts();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showNewContract, setShowNewContract] = useState(false);
  const [contractPreview, setContractPreview] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'rules' | 'contact'>('form');

  const handleContractSubmit = (data: any) => {
    // Validate contract data and check for compliance issues
    const issues = [];
    
    // Check athlete level restrictions
    if (data.athleteLevel === 'youth' && data.state === 'CA') {
      issues.push('California requires additional guardian consent for youth athletes');
    }
    
    // Check revenue sharing limits
    if (data.contractType === 'revenue_share' && data.state === 'TX') {
      issues.push('Revenue sharing terms exceed compliance limits for Texas');
    }
    
    // Check contract duration
    if (data.duration > 48 && data.athleteLevel !== 'professional') {
      issues.push('Contract duration exceeds maximum allowed for non-professional athletes');
    }

    setContractPreview({ 
      contract: {
        athleteLevel: data.athleteLevel || '',
        contractType: data.contractType || '',
        state: data.state || '',
        duration: data.duration || '',
        compensation: data.compensation || '',
        terms: data.terms || ''
      },
      complianceIssues: issues 
    });
  };

  const handleFinalSubmit = () => {
    console.log('Contract submitted:', contractPreview.contract);
    setContractPreview(null);
    setShowNewContract(false);
  };

  const handleContactSubmit = (data: any) => {
    console.log('Contact form submitted:', data);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0000FF] mx-auto mb-4"></div>
        <p className="text-gray-400">Loading compliance data...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-400 p-8 bg-gray-900 rounded-lg">
      <AlertTriangle className="mx-auto mb-4" size={32} />
      <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Compliance Hub</h1>
          <p className="text-gray-400 flex items-center gap-2">
            <Info size={16} />
            Manage and monitor your NIL compliance requirements
          </p>
        </div>
        <button
          onClick={() => setShowNewContract(!showNewContract)}
          className="px-6 py-3 bg-[#0000FF] text-white rounded-lg hover:bg-[#0000CC] transition-colors flex items-center gap-2"
        >
          <FileText size={18} />
          {showNewContract ? 'View Contracts' : 'New Contract'}
        </button>
      </div>

      <ComplianceStats
        totalContracts={stats.total}
        compliantCount={stats.compliant}
        pendingCount={stats.pending}
        nonCompliantCount={stats.nonCompliant}
      />

      {showNewContract ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'form' 
                    ? 'bg-[#0000FF] text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FileText size={18} />
                Contract Form
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'rules' 
                    ? 'bg-[#0000FF] text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Shield size={18} />
                Rules
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'contact' 
                    ? 'bg-[#0000FF] text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Phone size={18} />
                Contact
              </button>
            </div>

            {activeTab === 'form' && (
              <Card className="animate-fadeIn">
                <h2 className="text-xl font-bold mb-6">Create New Contract</h2>
                <ContractForm onSubmit={handleContractSubmit} />
              </Card>
            )}
            
            {activeTab === 'rules' && (
              <div className="animate-fadeIn">
                <ComplianceRules />
              </div>
            )}
            
            {activeTab === 'contact' && (
              <div className="animate-fadeIn">
                <ContactForm onSubmit={handleContactSubmit} />
              </div>
            )}
          </div>
          
          {contractPreview && (
            <div className="animate-slideIn">
              <ContractPreview
                contract={contractPreview.contract}
                complianceIssues={contractPreview.complianceIssues}
                onSubmit={handleFinalSubmit}
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                !statusFilter ? 'bg-[#0000FF] text-white' : 'bg-gray-900 text-white'
              }`}
              onClick={() => setStatusFilter('')}
            >
              All
            </button>
            {['compliant', 'pending', 'non-compliant'].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === status ? 'bg-[#0000FF] text-white' : 'bg-gray-900 text-white'
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {contracts
              .filter(contract => !statusFilter || contract.status === statusFilter)
              .map((contract) => (
                <ContractCard
                  key={contract.id}
                  title={contract.title}
                  description={contract.description}
                  status={contract.status}
                  lastUpdated={contract.last_updated}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};