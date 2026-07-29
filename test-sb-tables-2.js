import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

let supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

// Fix the URL if it contains /rest/v1/
if (supabaseUrl.endsWith('/rest/v1/')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
} else if (supabaseUrl.endsWith('/rest/v1')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1', '');
}

console.log("Using URL:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testTables() {
  const { data, error } = await supabase.from('kayhab_products').select('*').limit(1);
  console.log("Products table:", error ? error.message : "Exists, rows: " + data.length);
  
  const { data: cData, error: cError } = await supabase.from('kayhab_collections').select('*').limit(1);
  console.log("Collections table:", cError ? cError.message : "Exists, rows: " + cData.length);
}
testTables();
