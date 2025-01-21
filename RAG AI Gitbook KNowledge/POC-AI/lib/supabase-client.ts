import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lejtuxordceehcxokwcg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlanR1eG9yZGNlZWhjeG9rd2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjQ4NTQsImV4cCI6MjA0OTYwMDg1NH0.oHfZoWTLhGKJ-Y0HMmj72eGpI-ycrWHr_uJW5-BdfYQ'

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

// Validate URL format
try {
  new URL(supabaseUrl)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
  throw new Error(`Invalid Supabase URL format: ${supabaseUrl}`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'supabase.auth.token',
    detectSessionInUrl: true,
  }
})

