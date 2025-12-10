# ✅ Checklist Wdrożenia

## Przed wdrożeniem

- [ ] Przeczytaj SZYBKI_START.md
- [ ] Masz konto na Supabase
- [ ] Masz konto na Netlify lub GitHub

## Konfiguracja Supabase (15 minut)

- [ ] Utworzono projekt w Supabase
- [ ] Zapisano nazwę projektu i hasło
- [ ] Wykonano skrypt `supabase_setup.sql` w SQL Editor
- [ ] Skopiowano Project URL z Settings > API
- [ ] Skopiowano anon/public key z Settings > API
- [ ] Sprawdzono czy tabele zostały utworzone (Table Editor)

## Konfiguracja lokalna

- [ ] Zainstalowano zależności: `npm install`
- [ ] Utworzono plik `.env` (skopiowano z `.env.example`)
- [ ] Wklejono VITE_SUPABASE_URL do .env
- [ ] Wklejono VITE_SUPABASE_ANON_KEY do .env
- [ ] Uruchomiono lokalnie: `npm run dev`
- [ ] Przetestowano rejestrację (http://localhost:5173)

## Test rejestracji i logowania

- [ ] Zarejestrowano testowe konto
- [ ] Sprawdzono w Supabase czy użytkownik jest w tabeli `auth.users`
- [ ] Sprawdzono czy w `user_profiles` jest rekord z `approved = false`
- [ ] Zatwierdzono konto przez SQL:
  ```sql
  UPDATE user_profiles
  SET approved = true
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'test@example.com');
  ```
- [ ] Zalogowano się na zatwierdzone konto
- [ ] Sprawdzono czy można dodać zawodnika
- [ ] Sprawdzono czy dane są zapisywane (odświeżono stronę)

## Deployment na Netlify

### Przez GitHub:
- [ ] Wypchnięto kod do GitHub: `git push`
- [ ] Zalogowano się do Netlify
- [ ] Kliknięto "Add new site" > "Import from GitHub"
- [ ] Wybrano repozytorium
- [ ] Ustawiono Build command: `npm run build`
- [ ] Ustawiono Publish directory: `dist`
- [ ] Dodano zmienne środowiskowe w Netlify:
  - [ ] VITE_SUPABASE_URL
  - [ ] VITE_SUPABASE_ANON_KEY
  - [ ] VITE_ADMIN_EMAIL
- [ ] Kliknięto "Deploy"
- [ ] Poczekano na zakończenie buildu

### Przez CLI:
- [ ] Zainstalowano Netlify CLI: `npm install -g netlify-cli`
- [ ] Zalogowano się: `netlify login`
- [ ] Zbudowano projekt: `npm run build`
- [ ] Wdrożono: `netlify deploy --prod --dir=dist`

## Po wdrożeniu

- [ ] Otworzono aplikację w przeglądarce (URL z Netlify)
- [ ] Przetestowano rejestrację na live site
- [ ] Przetestowano logowanie
- [ ] Przetestowano dodawanie zawodnika
- [ ] Sprawdzono czy auto-zapis działa (po 30s)
- [ ] Przetestowano przycisk "Zapisz Teraz"
- [ ] Przetestowano wylogowanie
- [ ] Przetestowano reset hasła

## Konfiguracja email (opcjonalne)

- [ ] W Supabase > Authentication > Email Templates dostosowano szablony
- [ ] Przetestowano wysyłanie emaili (reset hasła)
- [ ] Skonfigurowano custom SMTP (opcjonalne)

## Dokumentacja dla użytkowników

- [ ] Przekazano użytkownikom URL aplikacji
- [ ] Wyjaśniono proces rejestracji
- [ ] Wyjaśniono że konta wymagają zatwierdzenia
- [ ] Podano kontakt w razie problemów

## Proces zatwierdzania użytkowników

Gdy nowy użytkownik się zarejestruje:

1. [ ] Przejdź do Supabase > SQL Editor
2. [ ] Wykonaj:
   ```sql
   SELECT u.email, u.created_at
   FROM auth.users u
   JOIN user_profiles p ON u.id = p.user_id
   WHERE p.approved = false
   ORDER BY u.created_at DESC;
   ```
3. [ ] Sprawdź email użytkownika
4. [ ] Zatwierdź użytkownika:
   ```sql
   UPDATE user_profiles
   SET approved = true
   WHERE user_id = (
     SELECT id FROM auth.users WHERE email = 'email@uzytkownika.com'
   );
   ```
5. [ ] (Opcjonalnie) Wyślij email do użytkownika że konto jest aktywne

## Backup i monitoring

- [ ] Zapisano gdzieś bezpiecznie dane logowania do Supabase
- [ ] Zapisano URL aplikacji
- [ ] Ustawiono przypomnienie do sprawdzania nowych rejestracji
- [ ] Rozważono ustawienie alertów w Supabase

## Troubleshooting - najczęstsze problemy

### Użytkownicy nie mogą się zalogować
- [ ] Sprawdzono czy konto jest zatwierdzone
- [ ] Sprawdzono czy hasło jest 4-cyfrowe
- [ ] Sprawdzono polityki RLS w Supabase

### Dane nie zapisują się
- [ ] Sprawdzono konsole przeglądarki (F12)
- [ ] Sprawdzono czy zmienne środowiskowe są ustawione w Netlify
- [ ] Sprawdzono polityki RLS dla tabeli user_data

### Build fails na Netlify
- [ ] Sprawdzono logi budowania
- [ ] Sprawdzono czy wszystkie zmienne środowiskowe są ustawione
- [ ] Sprawdzono czy package.json ma wszystkie zależności

---

## 🎉 Gratulacje!

Jeśli wszystkie punkty są zaznaczone, aplikacja jest gotowa do użycia!

## 📞 Pomoc

W razie problemów:
- Email: Olejniczak19@gmail.com
- Sprawdź DEPLOYMENT.md dla więcej informacji
- Sprawdź konsole przeglądarki i logi Supabase

---

**Data wdrożenia**: __________  
**Wdrożył**: __________  
**URL aplikacji**: __________  
**Supabase Project**: __________
