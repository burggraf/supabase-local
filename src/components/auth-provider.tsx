import { createContext, useContext, useEffect, useState } from "react"
import { type Session, type User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { getProfile, type Profile } from "@/lib/profile-service"

type AuthContextType = {
  session: Session | null
  user: User | null
  profile: Profile | null
  loading: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = async () => {
    if (user) {
      try {
        const data = await getProfile(user.id)
        setProfile(data)
      } catch (e) {
        console.error("Error refreshing profile:", e)
      }
    } else {
      setProfile(null)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      refreshProfile().finally(() => setLoading(false))
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, refreshProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
