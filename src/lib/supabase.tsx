import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cezamyuejocdhixgehiz.supabase.co'
const supabaseKey = 'sb_publishable_suaspsegL9vmQdhZ9yWQZw_krdZV2qt'

export const supabase = createClient(supabaseUrl, supabaseKey)