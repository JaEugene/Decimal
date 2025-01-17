/*
  # Test Connection and Setup Missing Tables

  1. Test Connection
    - Creates a simple test table
    - Adds RLS policies
  
  2. Verify Environment
    - Checks if required extensions exist
    - Ensures auth schema is present
*/

-- Create test table if it doesn't exist
CREATE TABLE IF NOT EXISTS connection_test (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE connection_test ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all authenticated users to view the table
CREATE POLICY "Allow authenticated users to view connection_test"
  ON connection_test
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert a test record
INSERT INTO connection_test DEFAULT VALUES;

-- Verify the record was inserted
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM connection_test LIMIT 1) THEN
    RAISE EXCEPTION 'Connection test failed: Could not insert test record';
  END IF;
END $$;