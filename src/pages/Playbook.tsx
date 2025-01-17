import { FC, useState } from 'react';
import { Card } from '../components/ui/Card';
import { ResourceCard } from '../components/playbook/ResourceCard';
import { NewsSection } from '../components/playbook/NewsSection';
import { ChatInterface } from '../components/playbook/ChatInterface';
import { FeaturedArticle } from '../components/playbook/FeaturedArticle';
import { ProgressSection } from '../components/playbook/ProgressSection';
import { TrendingTopics } from '../components/playbook/TrendingTopics';
import { Book, Newspaper, MessageSquare, Search, Sparkles } from 'lucide-react';
import { playbookResources, newsArticles, sampleChatMessages } from '../data/playbookData';

export const Playbook: FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'news' | 'chat'>('resources');
  const [messages, setMessages] = useState(sampleChatMessages);
  const [searchQuery, setSearchQuery] = useState('');

  const handleResourceClick = (resource: any) => {
    console.log('Resource clicked:', resource);
  };

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);

    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: `I understand your question about "${message}". Let me help you with that...`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const trendingTopics = [
    { id: '1', title: 'Top NIL Deals This Week', views: 1200, url: '#' },
    { id: '2', title: 'Compliance Updates 2024', views: 980, url: '#' },
    { id: '3', title: 'Social Media Best Practices', views: 850, url: '#' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4169E1]/20 via-transparent to-transparent rounded-3xl blur-3xl" />
          <Card className="relative p-8 backdrop-blur-sm border border-[#4169E1]/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-gray-900">
                  Playbook
                </h1>
                <p className="text-gray-700">Your comprehensive guide to NIL success</p>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4169E1]" size={20} />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-[#4169E1]/20 focus:ring-2 focus:ring-[#4169E1]/50 focus:border-transparent transition-all text-gray-900"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <FeaturedArticle
                title="NIL Deals in College Sports: A Complete Guide"
                summary="Learn how student-athletes are leveraging Name, Image, and Likeness opportunities in today's evolving landscape."
                readTime="10 min"
                imageUrl="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1"
                onReadMore={() => console.log('Read more clicked')}
              />
            </div>

            {/* Resources Grid */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="text-[#4169E1]" />
                Featured Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {playbookResources.map(resource => (
                  <div key={resource.id} className="transform hover:scale-[1.02] transition-all duration-300">
                    <ResourceCard
                      resource={resource}
                      onClick={handleResourceClick}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* News Section */}
            <Card className="overflow-hidden backdrop-blur-sm border border-[#4169E1]/20">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Newspaper className="text-[#4169E1]" />
                  Latest Updates
                </h2>
                <NewsSection articles={newsArticles} />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Progress Section */}
            <ProgressSection
              completedModules={3}
              totalModules={10}
              achievements={[
                {
                  id: '1',
                  title: 'NIL Basics',
                  description: 'Complete the introductory course',
                  earned: true
                },
                {
                  id: '2',
                  title: 'Compliance Pro',
                  description: 'Pass the compliance quiz',
                  earned: false
                }
              ]}
            />

            {/* Trending Topics */}
            <TrendingTopics topics={trendingTopics} />

            {/* AI Assistant */}
            <Card className="backdrop-blur-sm border border-[#4169E1]/20">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MessageSquare className="text-[#4169E1]" />
                  Ask AI Assistant
                </h2>
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};