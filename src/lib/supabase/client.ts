import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client if environment variables are not set
    const mockClient = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: () => Promise.resolve({ error: null })
      },
      from: () => ({
        insert: () => Promise.resolve({ error: null }),
        select: () => Promise.resolve({ data: [], error: null, count: 0 }),
        update: () => ({ eq: () => Promise.resolve({ error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: null }) })
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mockClient as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
