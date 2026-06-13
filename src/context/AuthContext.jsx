import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Make sure this path points to your supabase file

const AuthContext = createContext({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Helper function to fetch the user profile role from the public table
    async function getUserProfile(sessionUser) {
      if (!sessionUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role, full_name')
          .eq('id', sessionUser.id)
          .single();

        if (error) throw error;

        // Combine the Supabase Auth data with your custom database role details
        setUser({
          id: sessionUser.id,
          email: sessionUser.email,
          role: data?.role || 'user', // Fallback safely to regular user if something goes wrong
          name: data?.full_name || '',
        });
      } catch (err) {
        console.error('Error fetching user profile role:', err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    // 2. Check current active session immediately on app mount/refresh
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        getUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // 3. Listen live to any login or logout events in the browser
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        getUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to make utilizing this context effortless inside components
export const useAuth = () => useContext(AuthContext);
