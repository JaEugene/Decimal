export interface BaseOpportunity {
  id: string;
  title: string;
  description: string;
  compensation: {
    type: 'cash' | 'product' | 'mixed';
    value: number;
  };
  deadline: string;
  tags: string[];
  requirements: string[];
  status: 'open' | 'in_review' | 'accepted' | 'declined';
}

export interface SponsorshipOpportunity extends BaseOpportunity {
  type: 'sponsorship';
  institution: {
    name: string;
    logo: string;
    location: string;
  };
  enrollmentDuration: string;
  academicRequirements: string[];
  athleticRequirements: string[];
}

export interface EndorsementOpportunity extends BaseOpportunity {
  type: 'endorsement';
  company: {
    name: string;
    logo: string;
    industry: string;
  };
  duration: string;
  expectedRoi: string;
  deliverables: string[];
}

export type BusinessOpportunity = SponsorshipOpportunity | EndorsementOpportunity;