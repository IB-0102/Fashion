import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

let supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
if (supabaseUrl.endsWith('/rest/v1/')) { supabaseUrl = supabaseUrl.replace('/rest/v1/', ''); }
else if (supabaseUrl.endsWith('/rest/v1')) { supabaseUrl = supabaseUrl.replace('/rest/v1', ''); }

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data } = await supabase.from('kayhab_collections').select('*');
  console.log("Collections:", JSON.stringify(data, null, 2));
}
run();
