/*
  # Initial Schema Setup for EquityQoin

  1. New Tables
    - athletes
      - Basic athlete information and profile data
    - equity_qoins
      - E-Qoin token details and distribution
    - investments
      - Investment records and stakeholder information
    - milestones
      - Performance milestones and targets
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Athletes table
CREATE TABLE IF NOT EXISTS athletes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  sport text NOT NULL,
  team text,
  bio text,
  profile_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes can view their own profile"
  ON athletes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Equity Qoins table
CREATE TABLE IF NOT EXISTS equity_qoins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id uuid REFERENCES athletes NOT NULL,
  total_supply bigint NOT NULL DEFAULT 1000000,
  available_supply bigint NOT NULL DEFAULT 1000000,
  price_usd numeric(10,2) NOT NULL DEFAULT 1.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE equity_qoins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view E-Qoin data"
  ON equity_qoins
  FOR SELECT
  TO authenticated
  USING (true);

-- Investments table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id uuid REFERENCES auth.users NOT NULL,
  equity_qoin_id uuid REFERENCES equity_qoins NOT NULL,
  amount_qoins bigint NOT NULL,
  price_per_qoin numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own investments"
  ON investments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = investor_id);

-- Milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id uuid REFERENCES athletes NOT NULL,
  title text NOT NULL,
  description text,
  target_date date,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes can manage their milestones"
  ON milestones
  FOR ALL
  TO authenticated
  USING (
    athlete_id IN (
      SELECT id FROM athletes WHERE user_id = auth.uid()
    )
  );