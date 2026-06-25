import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({ user: null, loading: true, signOut: async () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // CRITICAL: 'loading' is strictly for the initial application boot check
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserProfile(sessionUser) {
      if (!sessionUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // 1. Instantly set baseline auth flags so Route Guards know someone is logged in.
      // Setting role to null means "Profile loading in progress" rather than guessing a role.
      setUser((prev) => {
        if (prev && prev.id === sessionUser.id) return prev;
        return {
          id: sessionUser.id,
          email: sessionUser.email,
          role: prev?.role || null, 
          name: prev?.name || '',
        };
      });

      const tables = ['admin_profiles', 'washer_profiles', 'customer_profiles'];
      let foundUser = null;

      try {
        const profilePromises = tables.map(async (table) => {
          const { data } = await supabase
            .from(table)
            .select('first_name, last_name')
            .eq('id', sessionUser.id)
            .maybeSingle();
          return { data, table };
        });

        const results = await Promise.all(profilePromises);

        for (const result of results) {
          if (result.data) {
            foundUser = {
              id: sessionUser.id,
              email: sessionUser.email,
              role: result.table.replace('_profiles', ''), 
              name: `${result.data.first_name} ${result.data.last_name}`.trim(),
            };
            break;
          }
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }

      // 2. Commit the definitive profile data to state
      setUser(foundUser || { id: sessionUser.id, email: sessionUser.email, role: 'customer', name: 'User' });
      setLoading(false); 
    }

    // Run once on application boot
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        getUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth events during the session lifetime
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // FIXED: We NO LONGER call setLoading(true) here!
        // This keeps your active booking wizard page safely mounted without erasing its steps.
        getUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false); 
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    setUser(null);
    await supabase.auth.signOut();
  };

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);