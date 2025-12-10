-- =====================================================
-- ZAPYTANIA SQL DLA ADMINISTRATORA
-- =====================================================
-- Kopiuj i wklejaj te zapytania w Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. ZARZĄDZANIE UŻYTKOWNIKAMI
-- =====================================================

-- Zobacz wszystkich użytkowników (zatwierdzonych i oczekujących)
SELECT 
  u.id,
  u.email,
  p.approved,
  u.created_at as data_rejestracji,
  u.last_sign_in_at as ostatnie_logowanie,
  p.updated_at as data_zatwierdzenia
FROM auth.users u
LEFT JOIN user_profiles p ON u.id = p.user_id
ORDER BY u.created_at DESC;

-- Zobacz TYLKO oczekujących użytkowników
SELECT 
  u.id,
  u.email,
  u.created_at as data_rejestracji
FROM auth.users u
JOIN user_profiles p ON u.id = p.user_id
WHERE p.approved = false
ORDER BY u.created_at DESC;

-- =====================================================
-- 2. ZATWIERDZANIE UŻYTKOWNIKÓW
-- =====================================================

-- Zatwierdź użytkownika po emailu
UPDATE user_profiles
SET approved = true, updated_at = NOW()
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'email@uzytkownika.com'
);

-- Zatwierdź użytkownika po ID
UPDATE user_profiles
SET approved = true, updated_at = NOW()
WHERE user_id = 'uuid-użytkownika-tutaj';

-- Zatwierdź WSZYSTKICH oczekujących użytkowników (OSTROŻNIE!)
UPDATE user_profiles
SET approved = true, updated_at = NOW()
WHERE approved = false;

-- =====================================================
-- 3. ODBIERANIE DOSTĘPU
-- =====================================================

-- Odbierz dostęp użytkownikowi (bez usuwania danych)
UPDATE user_profiles
SET approved = false, updated_at = NOW()
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'email@uzytkownika.com'
);

-- =====================================================
-- 4. PRZEGLĄDANIE DANYCH UŻYTKOWNIKÓW
-- =====================================================

-- Zobacz czy użytkownik ma zapisane dane
SELECT 
  u.email,
  CASE 
    WHEN ud.skill_tree IS NOT NULL THEN '✓ Tak'
    ELSE '✗ Nie'
  END as ma_strukture,
  CASE 
    WHEN ud.players IS NOT NULL THEN 
      CAST(jsonb_array_length(ud.players) AS TEXT) || ' zawodników'
    ELSE 'Brak'
  END as liczba_zawodnikow,
  ud.updated_at as ostatnia_aktualizacja
FROM auth.users u
LEFT JOIN user_data ud ON u.id = ud.user_id
WHERE u.email = 'email@uzytkownika.com';

-- Zobacz ile zawodników mają wszyscy użytkownicy
SELECT 
  u.email,
  COALESCE(jsonb_array_length(ud.players), 0) as liczba_zawodnikow,
  ud.updated_at as ostatnia_aktualizacja
FROM auth.users u
LEFT JOIN user_data ud ON u.id = ud.user_id
JOIN user_profiles p ON u.id = p.user_id
WHERE p.approved = true
ORDER BY liczba_zawodnikow DESC;

-- =====================================================
-- 5. USUWANIE UŻYTKOWNIKÓW I DANYCH
-- =====================================================

-- UWAGA: To usunie użytkownika i WSZYSTKIE jego dane!
-- CASCADE automatycznie usunie profile i dane

-- Usuń użytkownika po emailu
DELETE FROM auth.users 
WHERE email = 'email@uzytkownika.com';

-- Usuń użytkownika po ID
DELETE FROM auth.users 
WHERE id = 'uuid-użytkownika-tutaj';

-- Usuń TYLKO dane użytkownika (bez usuwania konta)
DELETE FROM user_data
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'email@uzytkownika.com'
);

-- =====================================================
-- 6. STATYSTYKI
-- =====================================================

-- Ogólne statystyki systemu
SELECT 
  COUNT(*) as wszystkich_uzytkownikow,
  COUNT(*) FILTER (WHERE p.approved = true) as zatwierdzonych,
  COUNT(*) FILTER (WHERE p.approved = false) as oczekujacych,
  COUNT(ud.id) as z_danymi
FROM auth.users u
LEFT JOIN user_profiles p ON u.id = p.user_id
LEFT JOIN user_data ud ON u.id = ud.user_id;

-- Aktywność użytkowników (ostatnie logowania)
SELECT 
  u.email,
  u.last_sign_in_at as ostatnie_logowanie,
  EXTRACT(DAY FROM NOW() - u.last_sign_in_at) as dni_temu
FROM auth.users u
JOIN user_profiles p ON u.id = p.user_id
WHERE p.approved = true
ORDER BY u.last_sign_in_at DESC NULLS LAST;

-- Użytkownicy którzy się nigdy nie zalogowali
SELECT 
  u.email,
  u.created_at as data_rejestracji,
  p.approved
FROM auth.users u
JOIN user_profiles p ON u.id = p.user_id
WHERE u.last_sign_in_at IS NULL
ORDER BY u.created_at DESC;

-- =====================================================
-- 7. BACKUP DANYCH
-- =====================================================

-- Eksportuj dane konkretnego użytkownika (kopiuj wynik)
SELECT 
  u.email,
  ud.skill_tree,
  ud.players,
  ud.updated_at
FROM auth.users u
JOIN user_data ud ON u.id = ud.user_id
WHERE u.email = 'email@uzytkownika.com';

-- =====================================================
-- 8. ZARZĄDZANIE OCZEKUJĄCYMI ZATWIERDZENIAMI
-- =====================================================

-- Zobacz wszystkie prośby o zatwierdzenie
SELECT * FROM pending_approvals
ORDER BY created_at DESC;

-- Wyczyść starsze prośby (po zatwierdzeniu użytkowników)
DELETE FROM pending_approvals
WHERE created_at < NOW() - INTERVAL '30 days';

-- =====================================================
-- 9. DIAGNOSTYKA PROBLEMÓW
-- =====================================================

-- Znajdź użytkowników bez profilu (nie powinno się zdarzyć)
SELECT u.id, u.email
FROM auth.users u
LEFT JOIN user_profiles p ON u.id = p.user_id
WHERE p.id IS NULL;

-- Napraw brakujące profile (jeśli wystąpi problem)
INSERT INTO user_profiles (user_id, approved)
SELECT u.id, false
FROM auth.users u
LEFT JOIN user_profiles p ON u.id = p.user_id
WHERE p.id IS NULL
ON CONFLICT (user_id) DO NOTHING;

-- =====================================================
-- 10. SZYBKIE AKCJE
-- =====================================================

-- Szybko zatwierdź ostatniego zarejestrowanego użytkownika
UPDATE user_profiles
SET approved = true, updated_at = NOW()
WHERE user_id = (
  SELECT id FROM auth.users 
  ORDER BY created_at DESC 
  LIMIT 1
);

-- Sprawdź czy tabele mają poprawne polityki RLS
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('user_profiles', 'user_data', 'pending_approvals');

-- =====================================================
-- KONIEC
-- =====================================================
-- Zapisz te zapytania w bezpiecznym miejscu!
-- Używaj z rozwagą - niektóre operacje są nieodwracalne!
-- =====================================================
