import { createClient } from '@supabase/supabase-js';

// 環境変数からURLとAPIキーを取得
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY 

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or key is not set');
}

export const supabase = createClient(supabaseUrl, supabaseKey); 