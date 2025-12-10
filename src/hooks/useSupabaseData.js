import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export function useSupabaseData() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wczytaj dane użytkownika (struktura i zawodnicy)
  const loadUserData = async () => {
    if (!user) {
      setLoading(false);
      return { skillTree: null, players: [] };
    }

    try {
      setLoading(true);
      setError(null);

      // Pobierz dane użytkownika
      const { data, error: fetchError } = await supabase
        .from('user_data')
        .select('skill_tree, players')
        .eq('user_id', user.id)
        .single();

      if (fetchError) {
        // Jeśli nie ma danych, zwróć puste
        if (fetchError.code === 'PGRST116') {
          return { skillTree: null, players: [] };
        }
        throw fetchError;
      }

      setLoading(false);
      return {
        skillTree: data?.skill_tree || null,
        players: data?.players || []
      };
    } catch (err) {
      console.error('Błąd wczytywania danych:', err);
      setError(err.message);
      setLoading(false);
      return { skillTree: null, players: [] };
    }
  };

  // Zapisz strukturę umiejętności
  const saveSkillTree = async (skillTree) => {
    if (!user) {
      throw new Error('Musisz być zalogowany');
    }

    try {
      const { error: upsertError } = await supabase
        .from('user_data')
        .upsert({
          user_id: user.id,
          skill_tree: skillTree,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) throw upsertError;
      
      return { success: true };
    } catch (err) {
      console.error('Błąd zapisywania struktury:', err);
      throw err;
    }
  };

  // Zapisz zawodników
  const savePlayers = async (players) => {
    if (!user) {
      throw new Error('Musisz być zalogowany');
    }

    try {
      const { error: upsertError } = await supabase
        .from('user_data')
        .upsert({
          user_id: user.id,
          players: players,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) throw upsertError;
      
      return { success: true };
    } catch (err) {
      console.error('Błąd zapisywania zawodników:', err);
      throw err;
    }
  };

  // Zapisz wszystkie dane (struktura + zawodnicy)
  const saveAllData = async (skillTree, players) => {
    if (!user) {
      throw new Error('Musisz być zalogowany');
    }

    try {
      const { error: upsertError } = await supabase
        .from('user_data')
        .upsert({
          user_id: user.id,
          skill_tree: skillTree,
          players: players,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) throw upsertError;
      
      return { success: true };
    } catch (err) {
      console.error('Błąd zapisywania danych:', err);
      throw err;
    }
  };

  return {
    loadUserData,
    saveSkillTree,
    savePlayers,
    saveAllData,
    loading,
    error
  };
}
