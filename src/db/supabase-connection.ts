import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Logger } from '@nestjs/common';

let supabase: SupabaseClient<any, 'public', any>;

function init() {
  const logger = new Logger();
  const supabaseUrl = process.env.SUPABASE_URL ?? '';
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY ?? '';
  supabase = createClient(supabaseUrl, supabaseSecretKey);

  logger.log({
    message: 'Supabase connection successfully initiated',
  });
}

export { init, supabase };
