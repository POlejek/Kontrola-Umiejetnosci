# 🔧 Troubleshooting Guide

## Problemy z logowaniem

### ❌ "Konto oczekuje na zatwierdzenie przez administratora"

**Przyczyna**: Konto nie zostało zatwierdzone przez administratora.

**Rozwiązanie**:
1. Przejdź do Supabase > SQL Editor
2. Wykonaj:
```sql
SELECT u.email, p.approved
FROM auth.users u
JOIN user_profiles p ON u.id = p.user_id
WHERE u.email = 'twoj@email.com';
```
3. Jeśli `approved = false`, zatwierdź:
```sql
UPDATE user_profiles
SET approved = true
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'twoj@email.com');
```

### ❌ "Invalid login credentials"

**Możliwe przyczyny**:
- Błędny email lub hasło
- Hasło nie ma 4 cyfr
- Konto nie zostało aktywowane przez link w emailu

**Rozwiązanie**:
1. Sprawdź czy hasło ma dokładnie 4 cyfry
2. Sprawdź email czy otrzymałeś link aktywacyjny
3. Spróbuj zresetować hasło przez "Zapomniałeś hasła?"

### ❌ "Failed to fetch" / Błąd połączenia

**Przyczyna**: Błędna konfiguracja Supabase.

**Rozwiązanie**:
1. Sprawdź czy plik `.env` istnieje
2. Sprawdź czy `VITE_SUPABASE_URL` i `VITE_SUPABASE_ANON_KEY` są poprawne
3. W Netlify sprawdź czy zmienne środowiskowe są ustawione
4. Przebuduj aplikację: `npm run build`

---

## Problemy z zapisywaniem danych

### ❌ Dane nie są zapisywane w chmurze

**Rozwiązanie**:
1. Otwórz konsolę przeglądarki (F12)
2. Sprawdź zakładkę Console czy są błędy
3. Sprawdź Network czy są błędy 403 lub 401
4. Sprawdź czy jesteś zalogowany (odśwież stronę)

### ❌ "Row-level security policy violation"

**Przyczyna**: Nieprawidłowe polityki RLS w Supabase.

**Rozwiązanie**:
1. Przejdź do Supabase > SQL Editor
2. Wykonaj ponownie skrypt `supabase_setup.sql`
3. Sprawdź czy polityki są włączone:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('user_profiles', 'user_data');
```

### ❌ Dane zapisują się lokalnie ale nie w chmurze

**Rozwiązanie**:
1. Kliknij przycisk "Zapisz Teraz" i sprawdź czy pojawi się błąd
2. Sprawdź konsolę przeglądarki
3. Wyloguj się i zaloguj ponownie
4. Sprawdź czy konto jest zatwierdzone

---

## Problemy z rejestracją

### ❌ "User already registered"

**Przyczyna**: Email jest już użyty.

**Rozwiązanie**:
- Użyj innego adresu email
- Lub zaloguj się jeśli to Twoje konto
- Lub zresetuj hasło

### ❌ Nie otrzymuję emaila aktywacyjnego

**Rozwiązanie**:
1. Sprawdź folder SPAM
2. Poczekaj kilka minut (może być opóźnienie)
3. W Supabase > Authentication > Users sprawdź status użytkownika
4. Jeśli `email_confirmed_at` jest puste, wyślij ponownie:
   - Supabase > Authentication > Users > ... > Send confirmation email

---

## Problemy z budowaniem

### ❌ "npm run build" fails

**Możliwe przyczyny i rozwiązania**:

1. **Brakujące zależności**:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Błędy TypeScript/ESLint**:
```bash
npm run build -- --mode production
```

3. **Brakujące zmienne środowiskowe**:
- Utwórz plik `.env` z wartościami z `.env.example`

### ❌ Build działa lokalnie ale nie na Netlify

**Rozwiązanie**:
1. Sprawdź logi budowania w Netlify
2. Upewnij się że zmienne środowiskowe są ustawione w Netlify (nie w pliku .env)
3. Sprawdź czy `.env` NIE jest commitowany do Git (.gitignore)
4. Sprawdź czy Node.js version jest zgodna (Netlify używa domyślnie Node 18)

---

## Problemy z Netlify

### ❌ 404 po odświeżeniu strony

**Przyczyna**: Brak przekierowania dla SPA.

**Rozwiązanie**:
- Sprawdź czy istnieje plik `netlify.toml` z zawartością:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### ❌ Strona się nie aktualizuje po zmianach

**Rozwiązanie**:
1. Wyczyść cache przeglądarki (Ctrl+Shift+Delete)
2. Lub otwórz w trybie incognito
3. W Netlify: Deploys > Trigger deploy > Clear cache and deploy

---

## Problemy z Supabase

### ❌ "relation 'user_profiles' does not exist"

**Przyczyna**: Tabele nie zostały utworzone.

**Rozwiązanie**:
1. Przejdź do Supabase > SQL Editor
2. Wykonaj cały skrypt `supabase_setup.sql`
3. Sprawdź w Table Editor czy tabele istnieją

### ❌ "permission denied for table user_data"

**Przyczyna**: Polityki RLS są nieprawidłowe lub wyłączone.

**Rozwiązanie**:
1. Wykonaj ponownie sekcję z politykami z `supabase_setup.sql`
2. Sprawdź czy RLS jest włączone:
```sql
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;
```

### ❌ Nie mogę zobaczyć danych użytkownika w Table Editor

**To normalne!** RLS działa również w Table Editor. Użyj SQL Editor:
```sql
-- Wyłącz tymczasowo RLS (tylko dla admina)
ALTER TABLE user_data DISABLE ROW LEVEL SECURITY;

-- Zobacz dane
SELECT * FROM user_data;

-- Włącz z powrotem RLS
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;
```

---

## Problemy wydajnościowe

### ⏱️ Aplikacja działa wolno

**Rozwiązania**:
1. Sprawdź połączenie internetowe
2. Otwórz DevTools > Network i sprawdź które requesty są wolne
3. W Supabase sprawdź Query Performance
4. Rozważ zmianę regionu Supabase bliżej użytkowników

### ⏱️ Auto-zapis spowalnia aplikację

**Rozwiązanie**:
W `PlayerManager.jsx` zmień interwał auto-zapisu:
```javascript
// Zamiast 30000 (30s) użyj 60000 (60s)
const autoSaveInterval = setInterval(async () => {
  // ...
}, 60000);
```

---

## Debugowanie krok po kroku

### 1. Sprawdź podstawy

```bash
# Czy wszystko jest zainstalowane?
npm install

# Czy build działa?
npm run build

# Czy zmienne środowiskowe są ustawione?
cat .env
```

### 2. Sprawdź konsole przeglądarki

1. Otwórz DevTools (F12)
2. Zakładka Console - szukaj czerwonych błędów
3. Zakładka Network - szukaj failed requests (czerwone)
4. Zakładka Application > Local Storage - sprawdź czy dane są zapisane lokalnie

### 3. Sprawdź Supabase

1. Authentication > Users - czy użytkownik istnieje?
2. Table Editor > user_profiles - czy approved = true?
3. SQL Editor - wykonaj diagnostyczne zapytania z `SQL_ADMIN_QUERIES.sql`

### 4. Sprawdź Netlify

1. Deploys - czy ostatni deploy był successful?
2. Site settings > Environment variables - czy są ustawione?
3. Functions log - czy są błędy?

---

## Kontakt

Jeśli żaden z powyższych kroków nie pomógł:

1. Otwórz konsolę przeglądarki (F12)
2. Zrób screenshot błędu
3. Wyślij na: **Olejniczak19@gmail.com**

Zawrzyj:
- Dokładny opis problemu
- Screenshot błędu
- Kroki do reprodukcji
- System operacyjny i przeglądarka

---

## Pomocne komendy

```bash
# Sprawdź wersje
node --version
npm --version

# Wyczyść cache npm
npm cache clean --force

# Reinstaluj wszystko od nowa
rm -rf node_modules package-lock.json
npm install

# Sprawdź czy Supabase jest dostępne
curl https://twoj-projekt.supabase.co/rest/v1/

# Testuj lokalnie z produkcyjnymi zmiennymi
npm run build
npm run preview

# Zobacz logi w czasie rzeczywistym (dev mode)
npm run dev
```

---

**Ostatnia aktualizacja**: Grudzień 2024
