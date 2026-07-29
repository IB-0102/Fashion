import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  const { data, error } = await supabase.from('kayhab_products').insert([{
    id: "test1234",
    name: "Test",
    description: "test",
    price: 100,
    category: "Shoes",
    images: ["https://example.com/img.jpg"],
    sizes: [],
    colors: [],
    stock: 10,
    featured: false,
    hidden: false,
    createdAt: new Date().toISOString()
  }]);
  console.log(error || data);
}
testInsert();
