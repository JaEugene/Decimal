/*
  # Fix Connection Test Table

  1. Changes
    - Create connection_test table if it doesn't exist
    - Drop existing policy if it exists
    - Create new policy
    - Add test data
*/

-- Create new test table
CREATE TABLE IF NOT EXISTS connection_test (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  test_value text DEFAULT 'connection_successful'
);

-- Enable RLS but allow public access
ALTER TABLE connection_test ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public access to connection_test" ON connection_test;

-- Create new policy for public access without authentication
CREATE POLICY "Allow public access to connection_test"
  ON connection_test
  FOR SELECT
  USING (true);

-- Insert test data if none exists
INSERT INTO connection_test (test_value)
VALUES ('connection_successful')
ON CONFLICT DO NOTHING;