# 📦 Pliki w projekcie - Przewodnik

## 📄 Pliki dokumentacji

| Plik | Opis | Dla kogo |
|------|------|----------|
| **SZYBKI_START.md** | Przewodnik wdrożenia krok po kroku | Admin/Developer |
| **DEPLOYMENT.md** | Szczegółowa dokumentacja deploymentu | Developer |
| **CHECKLIST.md** | Lista kontrolna wdrożenia | Admin |
| **TROUBLESHOOTING.md** | Rozwiązywanie problemów | Admin/Developer |
| **FAQ.md** | Często zadawane pytania | Użytkownik końcowy |
| **README.md** | Ogólny opis projektu | Wszyscy |
| **README_NOWY.md** | README dla nowej wersji | Wszyscy |

## 💾 Pliki SQL

| Plik | Opis |
|------|------|
| **supabase_setup.sql** | Pełny skrypt inicjalizacyjny bazy danych |
| **SQL_ADMIN_QUERIES.sql** | Gotowe zapytania dla administratora |

## ⚙️ Pliki konfiguracyjne

| Plik | Opis |
|------|------|
| **netlify.toml** | Konfiguracja deploymentu na Netlify |
| **.env.example** | Przykład zmiennych środowiskowych |
| **.gitignore** | Lista ignorowanych plików |
| **package.json** | Zależności projektu |
| **vite.config.js** | Konfiguracja Vite |
| **tailwind.config.js** | Konfiguracja Tailwind CSS |

## 📂 Struktura katalogów

```
src/
├── components/          # Komponenty React
│   ├── Login.jsx       # ✨ NOWE - Logowanie
│   ├── Register.jsx    # ✨ NOWE - Rejestracja
│   ├── ResetPassword.jsx # ✨ NOWE - Reset hasła
│   ├── ProtectedRoute.jsx # ✨ NOWE - Ochrona tras
│   ├── PlayerManager.jsx  # 🔄 ZAKTUALIZOWANE - Główna aplikacja
│   ├── SkillTreeEditor.jsx
│   └── SkillWheelDiagram.jsx
├── contexts/           # ✨ NOWE - Konteksty React
│   └── AuthContext.jsx # Zarządzanie autentykacją
├── hooks/              # ✨ NOWE - Custom hooki
│   └── useSupabaseData.js # Operacje na bazie danych
├── lib/                # ✨ NOWE - Biblioteki
│   └── supabaseClient.js # Klient Supabase
├── App.jsx            # 🔄 ZAKTUALIZOWANE - Routing
└── main.jsx
```

## 🎯 Którą dokumentację przeczytać?

### Jestem administratorem i chcę wdrożyć aplikację
1. **SZYBKI_START.md** - zacznij tutaj!
2. **CHECKLIST.md** - użyj jako listy kontrolnej
3. **SQL_ADMIN_QUERIES.sql** - zainstaluj w przeglądarce jako zakładka
4. **TROUBLESHOOTING.md** - gdy coś nie działa

### Jestem developerem i chcę zrozumieć kod
1. **README_NOWY.md** - przegląd funkcji
2. **DEPLOYMENT.md** - szczegóły techniczne
3. Kod źródłowy w `src/`

### Jestem użytkownikiem końcowym
1. **FAQ.md** - odpowiedzi na pytania

### Mam problem
1. **TROUBLESHOOTING.md** - sprawdź najpierw tutaj
2. **FAQ.md** - może odpowiedź jest tutaj
3. Email: Olejniczak19@gmail.com

## 📋 Szybkie linki do sekcji

### Dla administratora zatwierdzającego konta:
```sql
-- Kopiuj to zapytanie, jest w SQL_ADMIN_QUERIES.sql
UPDATE user_profiles
SET approved = true
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'email@uzytkownika.com'
);
```

### Dla developera budującego:
```bash
npm install
npm run build
```

### Dla użytkownika potrzebującego pomocy:
Email: Olejniczak19@gmail.com

## 🔍 Co zostało zmienione w nowej wersji?

### Nowe pliki:
- `src/components/Login.jsx`
- `src/components/Register.jsx`
- `src/components/ResetPassword.jsx`
- `src/components/ProtectedRoute.jsx`
- `src/contexts/AuthContext.jsx`
- `src/hooks/useSupabaseData.js`
- `src/lib/supabaseClient.js`
- `netlify.toml`
- `supabase_setup.sql`
- `SQL_ADMIN_QUERIES.sql`
- Wszystkie pliki dokumentacji (.md)

### Zmodyfikowane pliki:
- `src/App.jsx` - dodano routing
- `src/components/PlayerManager.jsx` - dodano integrację z Supabase
- `package.json` - dodano zależności
- `README.md` - dodano notatkę o nowej wersji

### Nie zmienione:
- `src/components/SkillTreeEditor.jsx`
- `src/components/SkillWheelDiagram.jsx`
- Style i konfiguracje

## 💡 Tips

- **Nie wiesz od czego zacząć?** → SZYBKI_START.md
- **Coś nie działa?** → TROUBLESHOOTING.md
- **Pytania użytkowników?** → FAQ.md
- **Zatwierdzanie kont?** → SQL_ADMIN_QUERIES.sql
- **Chcesz zrozumieć kod?** → Czytaj komentarze w plikach `.jsx`

## 📞 Kontakt

**Email**: Olejniczak19@gmail.com

**GitHub**: https://github.com/POlejek/Kontrola-Umiejetnosci

---

*Dokument stworzony: Grudzień 2024*
