/*
  # Add Initial E-Qoin Data
  
  1. New Data
    - Initial E-Qoin record with default values
    - Sample price history data
  
  2. Changes
    - Adds fallback data for empty tables
    - Ensures basic functionality even without user data
*/

-- Insert default E-Qoin data if none exists
INSERT INTO equity_qoins (id, total_supply, available_supply, price_usd)
SELECT 
  gen_random_uuid(),
  1000000,
  1000000,
  10.00
WHERE NOT EXISTS (SELECT 1 FROM equity_qoins LIMIT 1);

-- Insert sample price history if none exists
WITH RECURSIVE dates AS (
  SELECT NOW() - INTERVAL '30 days' as date
  UNION ALL
  SELECT date + INTERVAL '1 day'
  FROM dates
  WHERE date < NOW()
)
INSERT INTO price_history (equity_qoin_id, date, price)
SELECT 
  (SELECT id FROM equity_qoins LIMIT 1),
  dates.date,
  10.00 + (random() * 5)
FROM dates
WHERE NOT EXISTS (SELECT 1 FROM price_history LIMIT 1);