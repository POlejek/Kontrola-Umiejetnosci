# Kontrola Umiejętności - Instrukcje Wdrożenia

## 1. Konfiguracja Supabase

### Utwórz projekt w Supabase
1. Przejdź na https://supabase.com/
2. Zaloguj się lub utwórz konto
3. Utwórz nowy projekt
4. Zapisz **URL projektu** i **anon/public key**

### Utwórz tabele w bazie danych

Przejdź do SQL Editor w Supabase i wykonaj następujący skrypt:

```sql
-- Tabela profili użytkowników
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Tabela oczekujących zatwierdzeń
CREATE TABLE pending_approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela danych użytkowników (struktura i zawodnicy)
CREATE TABLE user_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_tree JSONB,
  players JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Włącz Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_approvals ENABLE ROW LEVEL SECURITY;

-- Polityki dla user_profiles
CREATE POLICY "Użytkownicy mogą widzieć swój profil"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Automatyczne tworzenie profilu przy rejestracji"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Polityki dla user_data
CREATE POLICY "Użytkownicy mogą czytać swoje dane"
  ON user_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Użytkownicy mogą zapisywać swoje dane"
  ON user_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Użytkownicy mogą aktualizować swoje dane"
  ON user_data FOR UPDATE
  USING (auth.uid() = user_id);

-- Polityki dla pending_approvals
CREATE POLICY "Każdy może dodać prośbę o zatwierdzenie"
  ON pending_approvals FOR INSERT
  WITH CHECK (true);

-- Funkcja do automatycznego tworzenia profilu użytkownika
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, approved)
  VALUES (NEW.id, false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger do automatycznego tworzenia profilu
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### Konfiguracja Email Templates (opcjonalnie)

W Supabase przejdź do Authentication > Email Templates i dostosuj szablony:
- Confirm signup
- Reset password
- Magic Link

## 2. Konfiguracja zmiennych środowiskowych

Utwórz plik `.env` w głównym katalogu projektu:

```
VITE_SUPABASE_URL=twój_supabase_url
VITE_SUPABASE_ANON_KEY=twój_supabase_anon_key
VITE_ADMIN_EMAIL=Olejniczak19@gmail.com
```

## 3. Deployment na Netlify

### Metoda 1: Przez GitHub (zalecana)

1. Wypushuj kod do GitHub
2. Przejdź na https://netlify.com/
3. Kliknij "Add new site" > "Import an existing project"
4. Wybierz swoje repozytorium GitHub
5. Konfiguracja build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Dodaj zmienne środowiskowe w Netlify:
   - Przejdź do Site settings > Environment variables
   - Dodaj `VITE_SUPABASE_URL`
   - Dodaj `VITE_SUPABASE_ANON_KEY`
   - Dodaj `VITE_ADMIN_EMAIL`
7. Kliknij "Deploy site"

### Metoda 2: Przez Netlify CLI

```bash
# Zainstaluj Netlify CLI
npm install -g netlify-cli

# Zaloguj się
netlify login

# Zbuduj projekt
npm run build

# Deployuj
netlify deploy --prod
```

## 4. Zatwierdzanie użytkowników

### Ręczne zatwierdzanie przez SQL:

```sql
-- Zobacz oczekujących użytkowników
SELECT u.email, p.created_at
FROM auth.users u
JOIN user_profiles p ON u.id = p.user_id
WHERE p.approved = false;

-- Zatwierdź użytkownika
UPDATE user_profiles
SET approved = true, updated_at = NOW()
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'email@uzytkownika.com'
);
```

### Automatyczne powiadomienia email (opcjonalnie):

Możesz skonfigurować Supabase Edge Functions lub zewnętrzny webhook, który wyśle email na `Olejniczak19@gmail.com` gdy nowy użytkownik się zarejestruje.

## 5. Testowanie

1. Zarejestruj testowe konto
2. Sprawdź czy użytkownik jest w tabeli `user_profiles` z `approved = false`
3. Zatwierdź użytkownika przez SQL
4. Zaloguj się i sprawdź czy dane są zapisywane

## 6. Backup i migracja danych

Aby przenieść dane z localStorage do Supabase dla istniejących użytkowników:

1. Zaloguj się na konto
2. Otwórz konsolę przeglądarki (F12)
3. Wykonaj:
```javascript
// Pobierz dane z localStorage
const skillTree = JSON.parse(localStorage.getItem('globalSkillTree'));
const players = JSON.parse(localStorage.getItem('skillTrackerPlayers'));

// Dane są automatycznie wczytane i zapisane przez aplikację
console.log('Dane z localStorage:', { skillTree, players });
```

## 7. Troubleshooting

### Użytkownik nie może się zalogować
- Sprawdź czy konto jest zatwierdzone w `user_profiles`
- Sprawdź czy polityki RLS są prawidłowo skonfigurowane

### Dane nie są zapisywane
- Sprawdź konsole przeglądarki pod kątem błędów
- Sprawdź czy zmienne środowiskowe są prawidłowo ustawione
- Sprawdź polityki RLS w Supabase

### Build fails na Netlify
- Sprawdź czy wszystkie zależności są w `package.json`
- Sprawdź logi budowania
- Upewnij się że zmienne środowiskowe są ustawione

## Kontakt
W razie problemów: Olejniczak19@gmail.com
