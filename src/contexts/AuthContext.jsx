import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sprawdź aktualną sesję
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Nasłuchuj zmian w autentykacji
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    signUp: async (email, password) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              approved: false,
            },
          },
        });

        if (error) throw error;

        // Wyślij powiadomienie do administratora
        await supabase.from('pending_approvals').insert([
          {
            user_email: email,
            created_at: new Date().toISOString(),
          },
        ]);

        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    signIn: async (email, password) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Sprawdź czy użytkownik jest zatwierdzony
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('approved')
          .eq('user_id', data.user.id)
          .single();

        if (profileError || !profile?.approved) {
          await supabase.auth.signOut();
          throw new Error('Konto oczekuje na zatwierdzenie przez administratora');
        }

        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      return { error };
    },

    resetPassword: async (email) => {
      try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    updatePassword: async (newPassword) => {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    user,
    session,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
