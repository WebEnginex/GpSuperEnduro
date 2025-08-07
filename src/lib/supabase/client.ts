import { createBrowserClient } from '@supabase/ssr'

type MockSupabaseClient = {
  auth: {
    getSession: () => Promise<{ data: { session: null }, error: null }>,
    onAuthStateChange: () => { data: { subscription: { unsubscribe: () => void } } },
    signOut: () => Promise<{ error: null }>
  }
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client if environment variables are not set
    const mockClient: MockSupabaseClient = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: () => Promise.resolve({ error: null })
      }
    }
    return mockClient
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
