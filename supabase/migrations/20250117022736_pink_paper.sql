/*
  # Fix Connection Test Table

  1. Changes
    - Drop existing connection_test table if exists
    - Recreate connection_test table with proper permissions
    - Enable public access without authentication requirement
    - Add test data

  2. Security
    - Allow public access for connection testing
    - No sensitive data stored
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS connection_test CASCADE;

-- Create test table
CREATE TABLE connection_test (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS but allow public access
ALTER TABLE connection_test ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Allow public access to connection_test"
  ON connection_test
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Insert test data
INSERT INTO connection_test DEFAULT VALUES;