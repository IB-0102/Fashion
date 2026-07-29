import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

let supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (supabaseUrl.endsWith('/rest/v1/')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
} else if (supabaseUrl.endsWith('/rest/v1')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1', '');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  await supabase.from('kayhab_collections').update({ image: 'https://i.ibb.co/d45rTpbW/nina1399-ai-generated-9355313-1920.jpg' }).eq('id', 'c1');
  await supabase.from('kayhab_collections').update({ image: 'https://i.ibb.co/7d81YtYJ/jumpinjake-handbag-883113.jpg' }).eq('id', 'c2');
  await supabase.from('kayhab_collections').update({ image: 'https://i.ibb.co/mC0qn3C5/pexels-musaabzayona-19230344.jpg' }).eq('id', 'c3');
  console.log("Updated collections in DB");
}
run();
