-- =====================================================
-- Skrypt SQL dla Supabase - System Kontroli Umiejętności
-- =====================================================
-- Wykonaj ten skrypt w SQL Editor w panelu Supabase
-- =====================================================

-- 1. Tabela profili użytkowników
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. Tabela oczekujących zatwierdzeń (do powiadomień)
CREATE TABLE IF NOT EXISTS pending_approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela danych użytkowników (struktura umiejętności i zawodnicy)
CREATE TABLE IF NOT EXISTS user_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_tree JSONB,
  players JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- =====================================================
-- Row Level Security (RLS)
-- =====================================================

-- Włącz RLS na wszystkich tabelach
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_approvals ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Polityki bezpieczeństwa dla user_profiles
-- =====================================================

-- Użytkownicy mogą widzieć tylko swój profil
DROP POLICY IF EXISTS "Użytkownicy mogą widzieć swój profil" ON user_profiles;
CREATE POLICY "Użytkownicy mogą widzieć swój profil"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Automatyczne tworzenie profilu przy rejestracji
DROP POLICY IF EXISTS "Automatyczne tworzenie profilu" ON user_profiles;
CREATE POLICY "Automatyczne tworzenie profilu"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- Polityki bezpieczeństwa dla user_data
-- =====================================================

-- Użytkownicy mogą czytać tylko swoje dane
DROP POLICY IF EXISTS "Użytkownicy mogą czytać swoje dane" ON user_data;
CREATE POLICY "Użytkownicy mogą czytać swoje dane"
  ON user_data FOR SELECT
  USING (auth.uid() = user_id);

-- Użytkownicy mogą tworzyć swoje dane
DROP POLICY IF EXISTS "Użytkownicy mogą zapisywać swoje dane" ON user_data;
CREATE POLICY "Użytkownicy mogą zapisywać swoje dane"
  ON user_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Użytkownicy mogą aktualizować swoje dane
DROP POLICY IF EXISTS "Użytkownicy mogą aktualizować swoje dane" ON user_data;
CREATE POLICY "Użytkownicy mogą aktualizować swoje dane"
  ON user_data FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- Polityki bezpieczeństwa dla pending_approvals
-- =====================================================

-- Każdy może dodać prośbę o zatwierdzenie
DROP POLICY IF EXISTS "Dodawanie próśb o zatwierdzenie" ON pending_approvals;
CREATE POLICY "Dodawanie próśb o zatwierdzenie"
  ON pending_approvals FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- Funkcje i triggery
-- =====================================================

-- Funkcja do automatycznego tworzenia profilu użytkownika
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, approved)
  VALUES (NEW.id, false)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger do automatycznego tworzenia profilu przy rejestracji
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- Funkcja do aktualizacji updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger dla user_profiles
DROP TRIGGER IF EXISTS set_updated_at_user_profiles ON user_profiles;
CREATE TRIGGER set_updated_at_user_profiles
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger dla user_data
DROP TRIGGER IF EXISTS set_updated_at_user_data ON user_data;
CREATE TRIGGER set_updated_at_user_data
  BEFORE UPDATE ON user_data
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- Zapytania pomocnicze (do użycia przez administratora)
-- =====================================================

-- UWAGA: Poniższe zapytania nie są wykonywane automatycznie
-- Użyj ich w razie potrzeby z SQL Editor

/*
-- Zobacz wszystkich oczekujących użytkowników:
SELECT 
  u.id,
  u.email, 
  u.created_at as registered_at,
  p.approved
FROM auth.users u
LEFT JOIN user_profiles p ON u.id = p.user_id
WHERE p.approved = false OR p.approved IS NULL
ORDER BY u.created_at DESC;

-- Zatwierdź użytkownika po emailu:
UPDATE user_profiles
SET approved = true, updated_at = NOW()
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'email@uzytkownika.com'
);

-- Zatwierdź użytkownika po ID:
UPDATE user_profiles
SET approved = true, updated_at = NOW()
WHERE user_id = 'uuid-użytkownika';

-- Zobacz dane użytkownika:
SELECT 
  u.email,
  ud.skill_tree,
  ud.players,
  ud.updated_at
FROM auth.users u
JOIN user_data ud ON u.id = ud.user_id
WHERE u.email = 'email@uzytkownika.com';

-- Usuń użytkownika i wszystkie jego dane:
DELETE FROM auth.users WHERE email = 'email@uzytkownika.com';
-- (CASCADE automatycznie usunie profile i dane)

-- Zobacz listę wszystkich zatwierdzonych użytkowników:
SELECT 
  u.email,
  p.approved,
  u.created_at,
  p.updated_at
FROM auth.users u
JOIN user_profiles p ON u.id = p.user_id
WHERE p.approved = true
ORDER BY u.created_at DESC;
*/

-- =====================================================
-- Koniec skryptu
-- =====================================================
-- Po wykonaniu tego skryptu baza danych jest gotowa!
-- Pamiętaj aby skonfigurować zmienne środowiskowe w aplikacji
-- =====================================================
