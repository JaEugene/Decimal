/*
  # Connection Test Setup

  1. New Tables
    - `connection_test` table for verifying database connectivity
  
  2. Security
    - Enable RLS on connection_test table
    - Add policy for authenticated users to view data
*/

-- Create test table if it doesn't exist
CREATE TABLE IF NOT EXISTS connection_test (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE connection_test ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all authenticated users to view the table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies 
    WHERE tablename = 'connection_test' 
    AND policyname = 'Allow authenticated users to view connection_test'
  ) THEN
    CREATE POLICY "Allow authenticated users to view connection_test"
      ON connection_test
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Insert a test record if none exists
INSERT INTO connection_test DEFAULT VALUES
ON CONFLICT DO NOTHING;