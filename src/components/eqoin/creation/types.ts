export interface Milestone {
  id: string;
  title: string;
  description: string;
  target: number;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface PayoutSchedule {
  id: string;
  type: 'one-time' | 'quarterly' | 'milestone';
  amount: number;
  date?: string;
  milestoneId?: string;
}

export interface TokenCustomization {
  supply: number;
  value: number;
  primaryColor: string;
  secondaryColor: string;
  logo?: File;
}

export interface ComplianceIssue {
  id: string;
  type: 'error' | 'warning';
  message: string;
}

export interface EQoinCreationData {
  milestones: Milestone[];
  schedules: PayoutSchedule[];
  customization: TokenCustomization;
  complianceIssues: ComplianceIssue[];
}