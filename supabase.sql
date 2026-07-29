-- Drop existing tables to ensure schema is updated
DROP TABLE IF EXISTS kayhab_products;
DROP TABLE IF EXISTS kayhab_collections;

-- Create kayhab_products table
CREATE TABLE kayhab_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  sizes TEXT[] NOT NULL DEFAULT '{}',
  colors TEXT[] NOT NULL DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  hidden BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TEXT NOT NULL
);

-- Create kayhab_collections table
CREATE TABLE kayhab_collections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  price NUMERIC,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Setup Row Level Security (RLS)
ALTER TABLE kayhab_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE kayhab_collections ENABLE ROW LEVEL SECURITY;

-- Insert default collections if table is empty
INSERT INTO kayhab_collections (id, name, description, image, price, "order")
VALUES 
  ('c1', 'Luxury Shoes', 'Premium handcrafted footwear designed for comfort, confidence and elegance.', 'https://i.ibb.co/d45rTpbW/nina1399-ai-generated-9355313-1920.jpg', 200000, 1),
  ('c2', 'Luxury Bags', 'Elegant handbags made to complement every outfit with sophisticated flair.', 'https://i.ibb.co/7d81YtYJ/jumpinjake-handbag-883113.jpg', 400000, 2),
  ('c3', 'Luxury Clothing', 'Beautiful outfits tailored for modern women who appreciate the finest fabrics.', 'https://i.ibb.co/mC0qn3C5/pexels-musaabzayona-19230344.jpg', 700000, 3)
ON CONFLICT (id) DO NOTHING;

-- Allow anonymous read access
CREATE POLICY "Allow public read access on kayhab_products" ON kayhab_products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on kayhab_collections" ON kayhab_collections FOR SELECT USING (true);

-- Allow anonymous insert/update/delete (WARNING: In a real production app, you should restrict this to authenticated admins only!)
-- Because this applet uses a simple local 'isAdminAuthenticated' boolean instead of Supabase Auth, we leave these public for now.
CREATE POLICY "Allow public insert on kayhab_products" ON kayhab_products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on kayhab_products" ON kayhab_products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on kayhab_products" ON kayhab_products FOR DELETE USING (true);

CREATE POLICY "Allow public insert on kayhab_collections" ON kayhab_collections FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on kayhab_collections" ON kayhab_collections FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on kayhab_collections" ON kayhab_collections FOR DELETE USING (true);
