/*
  # Add sample data for testing

  1. Sample Data
    - Athletes and their E-Qoin data
    - Price history for performance tracking
    - Milestones and contracts for compliance
    - Investment records

  2. Changes
    - Create sample athletes with proper UUID references
    - Add E-Qoin data with realistic values
    - Generate price history with simulated market movements
    - Add milestones and contracts for tracking
*/

-- Create a default user for testing
DO $$
DECLARE
    default_user_id uuid;
BEGIN
    INSERT INTO auth.users (id, email)
    VALUES ('d4f33c74-5d87-4e8a-89a8-7b773a635dc8', 'test@example.com')
    ON CONFLICT (id) DO NOTHING
    RETURNING id INTO default_user_id;

    -- Insert sample athletes
    INSERT INTO athletes (id, user_id, name, sport, team, bio, profile_image_url)
    VALUES
      ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'd4f33c74-5d87-4e8a-89a8-7b773a635dc8', 'Michael Jordan', 'Basketball', 'Chicago Bulls', 'Basketball legend and entrepreneur', 'https://images.unsplash.com/photo-1610587144551-85c4ec5e3674'),
      ('d290f1ee-6c54-4b01-90e6-d701748f0852', 'd4f33c74-5d87-4e8a-89a8-7b773a635dc8', 'Serena Williams', 'Tennis', 'Independent', 'Tennis champion and business mogul', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55'),
      ('d290f1ee-6c54-4b01-90e6-d701748f0853', 'd4f33c74-5d87-4e8a-89a8-7b773a635dc8', 'Lionel Messi', 'Soccer', 'Inter Miami', 'Soccer virtuoso and global icon', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55');

    -- Insert E-Qoin data
    INSERT INTO equity_qoins (id, athlete_id, total_supply, available_supply, price_usd)
    VALUES
      ('e290f1ee-6c54-4b01-90e6-d701748f0851', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 1000000, 750000, 23.45),
      ('e290f1ee-6c54-4b01-90e6-d701748f0852', 'd290f1ee-6c54-4b01-90e6-d701748f0852', 1000000, 800000, 18.75),
      ('e290f1ee-6c54-4b01-90e6-d701748f0853', 'd290f1ee-6c54-4b01-90e6-d701748f0853', 1000000, 900000, 15.30);

    -- Create price_history table
    CREATE TABLE IF NOT EXISTS price_history (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      equity_qoin_id uuid REFERENCES equity_qoins NOT NULL,
      date timestamptz NOT NULL,
      price numeric(10,2) NOT NULL
    );

    ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Public can view price history" ON price_history FOR SELECT USING (true);

    -- Insert sample price history (last 12 months)
    INSERT INTO price_history (equity_qoin_id, date, price)
    SELECT 
      e.id,
      d::timestamptz,
      (10 + (random() * 20))::numeric(10,2)
    FROM equity_qoins e
    CROSS JOIN generate_series(
      now() - interval '1 year',
      now(),
      interval '1 day'
    ) AS d;

    -- Insert sample milestones
    INSERT INTO milestones (athlete_id, title, description, target_date, status)
    VALUES
      ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Brand Partnership Launch', 'Major sportswear collaboration', NOW() + INTERVAL '30 days', 'pending'),
      ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Youth Camp Program', 'Basketball training camp for underprivileged youth', NOW() + INTERVAL '60 days', 'in_progress'),
      ('d290f1ee-6c54-4b01-90e6-d701748f0852', 'Tennis Academy Opening', 'State-of-the-art training facility', NOW() - INTERVAL '30 days', 'completed'),
      ('d290f1ee-6c54-4b01-90e6-d701748f0853', 'Charity Match Event', 'Fundraising exhibition game', NOW() + INTERVAL '45 days', 'in_progress');

    -- Create contracts table for compliance tracking
    CREATE TABLE IF NOT EXISTS contracts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      athlete_id uuid REFERENCES athletes NOT NULL,
      title text NOT NULL,
      description text NOT NULL,
      status text CHECK (status IN ('compliant', 'non-compliant', 'pending')) NOT NULL,
      last_updated timestamptz DEFAULT now()
    );

    ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Public can view contracts" ON contracts FOR SELECT USING (true);

    -- Insert sample contracts
    INSERT INTO contracts (athlete_id, title, description, status, last_updated)
    VALUES
      ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Revenue Sharing Agreement', 'Terms for E-Qoin revenue distribution', 'compliant', NOW() - INTERVAL '5 days'),
      ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Image Rights Contract', 'Usage rights for promotional materials', 'pending', NOW() - INTERVAL '2 days'),
      ('d290f1ee-6c54-4b01-90e6-d701748f0852', 'Sponsorship Deal', 'Major brand sponsorship terms', 'compliant', NOW() - INTERVAL '10 days'),
      ('d290f1ee-6c54-4b01-90e6-d701748f0853', 'Performance Bonus Structure', 'Achievement-based compensation', 'non-compliant', NOW() - INTERVAL '1 day');

    -- Insert sample investments
    INSERT INTO investments (investor_id, equity_qoin_id, amount_qoins, price_per_qoin)
    SELECT 
      'd4f33c74-5d87-4e8a-89a8-7b773a635dc8',
      id,
      floor(random() * 1000 + 100),
      price_usd
    FROM equity_qoins;
END $$;