import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PlaybookResource, NewsArticle, ChatMessage } from '../components/playbook/types';

export const usePlaybook = () => {
  const [resources, setResources] = useState<PlaybookResource[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaybookData = async () => {
      try {
        const [resourcesData, newsData] = await Promise.all([
          supabase.from('playbook_resources').select('*'),
          supabase.from('news_articles').select('*')
        ]);

        if (resourcesData.error) throw resourcesData.error;
        if (newsData.error) throw newsData.error;

        setResources(resourcesData.data || []);
        setNews(newsData.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaybookData();
  }, []);

  const sendChatMessage = async (content: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([
          { role: 'user', content }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  };

  return {
    resources,
    news,
    loading,
    error,
    sendChatMessage
  };
};