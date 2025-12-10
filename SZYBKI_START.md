# 🚀 Szybki Start - Wdrożenie Aplikacji

## Co zostało zrobione?

✅ Dodano system autentykacji z Supabase  
✅ Dodano strony logowania, rejestracji i resetowania hasła  
✅ Dodano automatyczny zapis danych do chmury (co 30 sekund)  
✅ Dodano przycisk ręcznego zapisu i wylogowania  
✅ Przygotowano konfigurację dla Netlify  
✅ Utworzono skrypty SQL dla bazy danych  

## Kroki do wdrożenia (w kolejności):

### 1. Konfiguracja Supabase (5-10 minut)

1. Wejdź na https://supabase.com i zaloguj się
2. Kliknij "New Project"
3. Wypełnij:
   - **Project name**: kontrola-umiejetnosci (lub dowolna nazwa)
   - **Database password**: wymyśl silne hasło i zapisz je
   - **Region**: wybierz najbliższy region (np. Frankfurt)
4. Poczekaj na utworzenie projektu (1-2 minuty)

### 2. Konfiguracja bazy danych

1. W panelu Supabase, kliknij **SQL Editor** (po lewej)
2. Kliknij **New query**
3. Otwórz plik `supabase_setup.sql` z projektu
4. Skopiuj całą zawartość i wklej do SQL Editor
5. Kliknij **RUN** (lub Ctrl+Enter)
6. Powinieneś zobaczyć "Success. No rows returned"

### 3. Pobierz klucze API

1. W panelu Supabase, kliknij **Settings** > **API** (po lewej)
2. Znajdź i skopiuj:
   - **Project URL** (np. `https://xxx.supabase.co`)
   - **anon/public key** (długi string zaczynający się od `eyJ...`)

### 4. Konfiguracja zmiennych środowiskowych

Utwórz plik `.env` w głównym katalogu projektu:

```bash
VITE_SUPABASE_URL=https://niolnsmznjyzrxuhbket.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_HoJQD4xpkPL9pA06Pad9Zw_0i86odyL
VITE_ADMIN_EMAIL=Olejniczak19@gmail.com
```

**WAŻNE:** Wklej prawdziwe wartości z kroku 3!

### 5. Testowanie lokalnie

```bash
# Zainstaluj zależności (jeśli jeszcze nie)
npm install

# Uruchom aplikację lokalnie
npm run dev

# Otwórz http://localhost:5173 w przeglądarce
```

Sprawdź czy:
- Możesz się zarejestrować
- Widzisz błąd "Konto oczekuje na zatwierdzenie" po próbie logowania (to OK!)

### 6. Zatwierdź swoje konto testowe

1. W panelu Supabase, przejdź do **SQL Editor**
2. Wykonaj zapytanie:

```sql
-- Zobacz oczekujących użytkowników
SELECT u.email, u.created_at
FROM auth.users u
JOIN user_profiles p ON u.id = p.user_id
WHERE p.approved = false;
```

3. Zatwierdź swoje konto:

```sql
-- Wstaw swój email testowy
UPDATE user_profiles
SET approved = true
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'twoj@email.com'
);
```

4. Teraz możesz się zalogować!

### 7. Deployment na Netlify

#### Opcja A: Przez GitHub (zalecana)

1. Wypchnij kod do GitHub:
```bash
git add .
git commit -m "Dodano integrację z Supabase"
git push
```

2. Wejdź na https://netlify.com i zaloguj się
3. Kliknij **Add new site** > **Import an existing project**
4. Wybierz **GitHub** i autoryzuj
5. Wybierz swoje repozytorium `Kontrola-Umiejetnosci`
6. Konfiguracja:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Kliknij **Add environment variables** i dodaj:
   - `VITE_SUPABASE_URL` = twój URL
   - `VITE_SUPABASE_ANON_KEY` = twój klucz
   - `VITE_ADMIN_EMAIL` = Olejniczak19@gmail.com
8. Kliknij **Deploy**
9. Poczekaj 2-3 minuty - gotowe! 🎉

#### Opcja B: Ręczne wdrożenie

```bash
# Zbuduj projekt
npm run build

# Zaloguj się do Netlify (jednorazowo)
npx netlify-cli login

# Deployuj
npx netlify-cli deploy --prod --dir=dist
```

### 8. Zatwierdzanie nowych użytkowników

Gdy ktoś się zarejestruje:

1. Sprawdź w Supabase SQL Editor:
```sql
SELECT u.email, p.created_at
FROM auth.users u
JOIN user_profiles p ON u.id = p.user_id
WHERE p.approved = false
ORDER BY p.created_at DESC;
```

2. Zatwierdź użytkownika:
```sql
UPDATE user_profiles
SET approved = true
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'email@uzytkownika.com'
);
```

### 9. (Opcjonalnie) Konfiguracja powiadomień email

Możesz skonfigurować Supabase aby wysyłał email gdy nowy użytkownik się zarejestruje:

1. W Supabase: **Authentication** > **Email Templates**
2. Dostosuj szablony wiadomości
3. Możesz też użyć Supabase Edge Functions do wysyłania custom emaili

## Struktura plików

```
src/
├── components/
│   ├── Login.jsx              # Strona logowania
│   ├── Register.jsx           # Strona rejestracji
│   ├── ResetPassword.jsx      # Reset hasła
│   ├── ProtectedRoute.jsx     # Ochrona tras
│   └── PlayerManager.jsx      # Główna aplikacja (zaktualizowana)
├── contexts/
│   └── AuthContext.jsx        # Kontekst autentykacji
├── hooks/
│   └── useSupabaseData.js     # Hook do operacji na danych
├── lib/
│   └── supabaseClient.js      # Klient Supabase
└── App.jsx                    # Routing (zaktualizowany)
```

## Funkcje systemu

### Dla użytkownika:
- ✅ Rejestracja z email + 6-cyfrowe hasło
- ✅ Logowanie (tylko po zatwierdzeniu przez admina)
- ✅ Reset hasła przez email
- ✅ Automatyczny zapis danych co 30s
- ✅ Ręczny przycisk "Zapisz Teraz"
- ✅ Przycisk wylogowania

### Dla administratora:
- ✅ Zatwierdzanie użytkowników przez SQL
- ✅ Przeglądanie danych użytkowników
- ✅ Usuwanie kont

## Troubleshooting

**Problem**: "Błąd logowania" mimo prawidłowego hasła  
**Rozwiązanie**: Sprawdź czy konto jest zatwierdzone w bazie

**Problem**: Dane nie zapisują się  
**Rozwiązanie**: Sprawdź konsole przeglądarki (F12) i upewnij się że zmienne środowiskowe są ustawione

**Problem**: Build fails na Netlify  
**Rozwiązanie**: Sprawdź czy dodałeś zmienne środowiskowe w Netlify

**Problem**: "Failed to fetch" przy logowaniu  
**Rozwiązanie**: Sprawdź czy URL i klucz Supabase są prawidłowe

## Kontakt

W razie problemów: Olejniczak19@gmail.com

## Następne kroki (opcjonalne)

- [ ] Dodaj powiadomienia email przy rejestracji
- [ ] Stwórz panel administratora w aplikacji
- [ ] Dodaj możliwość zmiany hasła z poziomu aplikacji
- [ ] Dodaj eksport danych do PDF
- [ ] Dodaj możliwość udostępniania raportów

---

**Powodzenia! 🚀**
