import { ReactNode } from 'react';

export interface PlaybookResource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'quiz';
  category: 'nil' | 'platform' | 'compliance' | 'business';
  content: string;
  tags: string[];
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  url: string;
  summary: string;
  publishedAt: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}