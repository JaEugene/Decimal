/*
  # Add Playbook and E-Qoin Creation Features

  1. New Tables
    - `playbook_resources` - Educational content and guides
    - `user_progress` - User completion tracking
    - `news_articles` - NIL-related news
    - `chat_messages` - AI chat history
    - `eqoin_milestones` - E-Qoin milestone tracking
    - `eqoin_payouts` - Payout schedules
    - `eqoin_customization` - Token customization settings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Playbook Resources Table
CREATE TABLE IF NOT EXISTS playbook_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('article', 'video', 'guide', 'quiz')),
  category text NOT NULL CHECK (category IN ('nil', 'platform', 'compliance', 'business')),
  content text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  resource_id uuid REFERENCES playbook_resources NOT NULL,
  completed_at timestamptz DEFAULT now(),
  score integer,
  UNIQUE(user_id, resource_id)
);

-- News Articles Table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  source text NOT NULL,
  url text NOT NULL,
  summary text NOT NULL,
  category text NOT NULL,
  published_at timestamptz DEFAULT now()
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- E-Qoin Milestones Table
CREATE TABLE IF NOT EXISTS eqoin_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id uuid REFERENCES athletes NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  target_value numeric NOT NULL,
  current_value numeric DEFAULT 0,
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- E-Qoin Payouts Table
CREATE TABLE IF NOT EXISTS eqoin_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id uuid REFERENCES athletes NOT NULL,
  type text NOT NULL CHECK (type IN ('one-time', 'quarterly', 'milestone')),
  amount numeric NOT NULL,
  schedule_date timestamptz,
  milestone_id uuid REFERENCES eqoin_milestones,
  status text NOT NULL CHECK (status IN ('scheduled', 'processing', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- E-Qoin Customization Table
CREATE TABLE IF NOT EXISTS eqoin_customization (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id uuid REFERENCES athletes NOT NULL,
  supply numeric NOT NULL DEFAULT 1000000,
  initial_value numeric NOT NULL DEFAULT 1.00,
  primary_color text NOT NULL,
  secondary_color text NOT NULL,
  logo_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE playbook_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE eqoin_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE eqoin_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE eqoin_customization ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Public can view playbook resources"
  ON playbook_resources FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view news articles"
  ON news_articles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own chat messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Athletes can manage their milestones"
  ON eqoin_milestones FOR ALL
  TO authenticated
  USING (athlete_id IN (SELECT id FROM athletes WHERE user_id = auth.uid()));

CREATE POLICY "Athletes can manage their payouts"
  ON eqoin_payouts FOR ALL
  TO authenticated
  USING (athlete_id IN (SELECT id FROM athletes WHERE user_id = auth.uid()));

CREATE POLICY "Athletes can manage their customization"
  ON eqoin_customization FOR ALL
  TO authenticated
  USING (athlete_id IN (SELECT id FROM athletes WHERE user_id = auth.uid()));

-- Insert sample data
DO $$ 
BEGIN
  -- Insert sample playbook resources
  INSERT INTO playbook_resources (title, description, type, category, content, tags)
  VALUES
    ('Understanding NIL Basics', 'A comprehensive guide to Name, Image, and Likeness rights', 'guide', 'nil', 'Content here...', ARRAY['NIL', 'Basics']),
    ('E-Qoin Creation Guide', 'Step-by-step guide to creating your E-Qoin', 'video', 'platform', 'Video URL here...', ARRAY['E-Qoin', 'Tutorial']),
    ('Compliance Checklist', 'Essential compliance requirements for athletes', 'article', 'compliance', 'Article content...', ARRAY['Compliance', 'Legal']);

  -- Insert sample news articles
  INSERT INTO news_articles (title, source, url, summary, category)
  VALUES
    ('New NIL Guidelines Released', 'Sports Business Journal', 'https://example.com/news/1', 'Latest updates to NIL regulations', 'Regulation'),
    ('Record NIL Earnings in 2024', 'Athletic Business', 'https://example.com/news/2', 'Student athletes see increased earnings', 'Market Trends');
END $$;