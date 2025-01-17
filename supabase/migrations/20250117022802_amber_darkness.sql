/*
  # Fix Connection Test Table

  1. Changes
    - Drop existing connection_test table completely
    - Create new connection_test table with proper permissions
    - Enable public access without authentication
    - Add test data

  2. Security
    - Allow public access for connection testing
    - No sensitive data stored
*/

-- Drop existing table completely
DROP TABLE IF EXISTS connection_test CASCADE;

-- Create test table
CREATE TABLE connection_test (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  test_value text DEFAULT 'connection_successful'
);

-- Enable RLS but allow public access
ALTER TABLE connection_test ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow public access to connection_test" ON connection_test;

-- Create policy for public access without authentication
CREATE POLICY "Allow public access to connection_test"
  ON connection_test
  FOR SELECT
  USING (true);

-- Insert test data if none exists
INSERT INTO connection_test (test_value)
VALUES ('connection_successful')
ON CONFLICT DO NOTHING;