import { PlaybookResource, NewsArticle, ChatMessage } from '../components/playbook/types';

export const playbookResources: PlaybookResource[] = [
  {
    id: '1',
    title: 'Understanding NIL Basics',
    description: 'A comprehensive guide to Name, Image, and Likeness rights for student athletes',
    type: 'guide',
    category: 'nil',
    content: 'Content here...',
    tags: ['NIL', 'Basics', 'Student Athletes'],
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    title: 'Maximizing Your E-Qoin Value',
    description: 'Learn strategies to increase your E-Qoin value through performance and engagement',
    type: 'video',
    category: 'platform',
    content: 'Video URL here...',
    tags: ['E-Qoin', 'Value Growth', 'Strategy'],
    createdAt: '2024-03-14'
  },
  {
    id: '3',
    title: 'NIL Compliance Quiz',
    description: 'Test your knowledge of NIL regulations and best practices',
    type: 'quiz',
    category: 'compliance',
    content: 'Quiz content...',
    tags: ['Quiz', 'Compliance', 'Regulations'],
    createdAt: '2024-03-13'
  },
  {
    id: '4',
    title: 'Building Your Personal Brand',
    description: 'Essential tips for athletes to develop and maintain a strong personal brand',
    type: 'article',
    category: 'business',
    content: 'Article content...',
    tags: ['Branding', 'Marketing', 'Social Media'],
    createdAt: '2024-03-12'
  }
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'NCAA Updates NIL Guidelines for 2024',
    source: 'Sports Business Journal',
    url: 'https://example.com/news/1',
    summary: 'New guidelines focus on transparency and fair market value in NIL deals',
    publishedAt: '2024-03-15T10:00:00Z',
    category: 'Regulation'
  },
  {
    id: '2',
    title: 'Top College Athletes See Record NIL Earnings',
    source: 'Athletic Business',
    url: 'https://example.com/news/2',
    summary: 'Study shows significant increase in NIL earnings for student athletes across all sports',
    publishedAt: '2024-03-14T15:30:00Z',
    category: 'Market Trends'
  },
  {
    id: '3',
    title: 'State Legislature Proposes New NIL Bill',
    source: 'Legal Sports Report',
    url: 'https://example.com/news/3',
    summary: 'New bill aims to standardize NIL regulations across multiple states',
    publishedAt: '2024-03-13T09:15:00Z',
    category: 'Legislation'
  }
];

export const sampleChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'What are the current NIL regulations in California?',
    timestamp: '2024-03-15T09:00:00Z'
  },
  {
    id: '2',
    role: 'assistant',
    content: 'In California, the current NIL regulations allow student-athletes to earn compensation for their name, image, and likeness without affecting their eligibility. Key points include: 1) Athletes can hire professional representation, 2) Must disclose NIL deals to their schools, 3) Deals cannot conflict with school sponsorships.',
    timestamp: '2024-03-15T09:00:05Z'
  }
];