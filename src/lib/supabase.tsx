import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  const missing = [
    !supabaseUrl && 'VITE_SUPABASE_URL',
    !supabaseKey && 'VITE_SUPABASE_ANON_KEY',
  ]
    .filter(Boolean)
    .join('، ')

  throw new Error(
    `متغيرات البيئة الناقصة: ${missing}. ` +
      'أضفها في ملف .env محليًا (راجع .env.example) أو في إعدادات البيئة على منصة النشر، ثم أعد بناء المشروع.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
