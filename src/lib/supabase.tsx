import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  const missing = [
    !supabaseUrl && 'VITE_SUPABASE_URL',
    !supabaseKey && 'VITE_SUPABASE_ANON_KEY',
  ]
    .filter(Boolean)
    .join(', ')

  throw new Error(
    `Missing environment variables: ${missing}. ` +
      'Add them to your local .env file (see .env.example) or to the environment variables ' +
      'of your hosting platform, then rebuild the project.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
