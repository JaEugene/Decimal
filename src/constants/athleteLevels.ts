export interface AthleteLevel {
  value: string;
  label: string;
  maxDuration: number;
  requiresGuardian: boolean;
  description: string;
}

export const athleteLevels: AthleteLevel[] = [
  {
    value: 'youth',
    label: 'Youth (Under 14)',
    maxDuration: 2,
    requiresGuardian: true,
    description: 'Athletes under 14 years old. Guardian signature required.'
  },
  {
    value: 'amateur',
    label: 'Amateur (14-17)',
    maxDuration: 4,
    requiresGuardian: true,
    description: 'Athletes aged 14-17. Guardian co-signature required.'
  },
  {
    value: 'young_professional',
    label: 'Young Professional (18-21)',
    maxDuration: 6,
    requiresGuardian: false,
    description: 'Athletes aged 18-21. No guardian signature required.'
  },
  {
    value: 'professional',
    label: 'Professional (22+)',
    maxDuration: 6,
    requiresGuardian: false,
    description: 'Professional athletes aged 22 and above.'
  }
];