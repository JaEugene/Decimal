import { BusinessOpportunity } from '../components/business/types';

export const businessOpportunities: BusinessOpportunity[] = [
  {
    id: '1',
    type: 'sponsorship',
    title: 'Basketball Excellence Program',
    description: 'Full athletic scholarship opportunity with comprehensive training program',
    compensation: {
      type: 'mixed',
      value: 75000
    },
    deadline: '2024-08-15',
    tags: ['Division I', 'Full Scholarship', 'Basketball'],
    requirements: ['Minimum GPA: 3.0', '20+ PPG Average'],
    status: 'open',
    institution: {
      name: 'Stanford University',
      logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
      location: 'California, USA'
    },
    enrollmentDuration: '4 years',
    academicRequirements: ['3.0 GPA', 'SAT 1300+'],
    athleticRequirements: ['State Championship Experience', 'All-State Team']
  },
  {
    id: '2',
    type: 'endorsement',
    title: 'Sports Apparel Ambassador',
    description: 'Brand ambassador role for leading sports apparel company',
    compensation: {
      type: 'cash',
      value: 50000
    },
    deadline: '2024-06-01',
    tags: ['Apparel', 'Social Media', 'Brand Deal'],
    requirements: ['100k+ Social Media Following', 'Content Creation'],
    status: 'open',
    company: {
      name: 'Nike',
      logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      industry: 'Sports Apparel'
    },
    duration: '12 months',
    expectedRoi: '200%',
    deliverables: ['Monthly Social Posts', 'Event Appearances']
  },
  {
    id: '3',
    type: 'sponsorship',
    title: 'Elite Athletic Development Program',
    description: 'Full scholarship with focus on Olympic-level training and academic excellence',
    compensation: {
      type: 'mixed',
      value: 85000
    },
    deadline: '2024-07-30',
    tags: ['Olympic Training', 'Full Scholarship', 'Track & Field'],
    requirements: ['National Rankings', 'Academic Excellence'],
    status: 'open',
    institution: {
      name: 'UCLA',
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
      location: 'Los Angeles, USA'
    },
    enrollmentDuration: '4 years',
    academicRequirements: ['3.5 GPA', 'SAT 1400+'],
    athleticRequirements: ['National Rankings', 'Olympic Trials Qualification']
  },
  {
    id: '4',
    type: 'endorsement',
    title: 'Sports Nutrition Partnership',
    description: 'Be the face of our new performance nutrition line',
    compensation: {
      type: 'mixed',
      value: 35000
    },
    deadline: '2024-05-15',
    tags: ['Nutrition', 'Health', 'Wellness'],
    requirements: ['Clean Athletic Record', 'Fitness Focus'],
    status: 'open',
    company: {
      name: 'OptimumNutrition',
      logo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      industry: 'Sports Nutrition'
    },
    duration: '18 months',
    expectedRoi: '150%',
    deliverables: ['Workout Videos', 'Nutrition Tips', 'Product Reviews']
  },
  {
    id: '5',
    type: 'sponsorship',
    title: 'Women in Sports Excellence',
    description: 'Empowering female athletes through education and athletics',
    compensation: {
      type: 'mixed',
      value: 65000
    },
    deadline: '2024-09-01',
    tags: ['Women Sports', 'Leadership', 'Full Scholarship'],
    requirements: ['Leadership Experience', 'Community Involvement'],
    status: 'open',
    institution: {
      name: 'Duke University',
      logo: 'https://images.unsplash.com/photo-1554478318-b8f8c8021c2f',
      location: 'Durham, NC'
    },
    enrollmentDuration: '4 years',
    academicRequirements: ['3.2 GPA', 'SAT 1250+'],
    athleticRequirements: ['State Level Achievement', 'Team Captain Experience']
  },
  {
    id: '6',
    type: 'endorsement',
    title: 'Tech Wearables Ambassador',
    description: 'Showcase next-gen sports performance tracking technology',
    compensation: {
      type: 'product',
      value: 25000
    },
    deadline: '2024-06-30',
    tags: ['Technology', 'Wearables', 'Innovation'],
    requirements: ['Tech-Savvy', 'Active Social Media'],
    status: 'open',
    company: {
      name: 'FitTech',
      logo: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      industry: 'Sports Technology'
    },
    duration: '6 months',
    expectedRoi: '180%',
    deliverables: ['Product Testing', 'Tech Reviews', 'Training Demos']
  }
];