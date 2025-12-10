# 🎯 System Kontroli Umiejętności

Aplikacja webowa do zarządzania profilami zawodników i oceny ich umiejętności.

## ✨ Nowe funkcje (Integracja z chmurą)

- 🔐 **System logowania i rejestracji** - Bezpieczna autentykacja użytkowników
- ☁️ **Automatyczny zapis w chmurze** - Dane są zapisywane co 30 sekund
- 👤 **Indywidualne konta użytkowników** - Każdy użytkownik ma swoje dane
- 📧 **Zatwierdzanie kont przez administratora** - Kontrola dostępu
- 🔄 **Reset hasła przez email** - Odzyskiwanie dostępu do konta
- 💾 **Backup lokalny** - Dane są również zapisywane w przeglądarce

## 🚀 Szybki start

### Dla developera/administratora

Przeczytaj plik **[SZYBKI_START.md](SZYBKI_START.md)** - zawiera krok po kroku instrukcję wdrożenia.

### Dla użytkownika końcowego

1. Otwórz aplikację w przeglądarce
2. Kliknij "Zarejestruj się"
3. Wprowadź email i 6-cyfrowe hasło
4. Poczekaj na zatwierdzenie konta przez administratora (otrzymasz email)
5. Zaloguj się i korzystaj z aplikacji!

## 📋 Wymagania

- Node.js 18+ i npm
- Konto na [Supabase](https://supabase.com/) (darmowe)
- Konto na [Netlify](https://netlify.com/) (darmowe)

## 🛠️ Instalacja lokalna

```bash
# Sklonuj repozytorium
git clone https://github.com/POlejek/Kontrola-Umiejetnosci.git
cd Kontrola-Umiejetnosci

# Zainstaluj zależności
npm install

# Utwórz plik .env z danymi z Supabase
# (zobacz .env.example)

# Uruchom lokalnie
npm run dev

# Zbuduj dla produkcji
npm run build
```

## 📁 Struktura projektu

```
src/
├── components/          # Komponenty React
│   ├── Login.jsx       # Strona logowania
│   ├── Register.jsx    # Strona rejestracji
│   ├── ResetPassword.jsx
│   ├── ProtectedRoute.jsx
│   ├── PlayerManager.jsx
│   ├── SkillTreeEditor.jsx
│   └── SkillWheelDiagram.jsx
├── contexts/           # Konteksty React
│   └── AuthContext.jsx
├── hooks/              # Custom hooki
│   └── useSupabaseData.js
├── lib/                # Biblioteki
│   └── supabaseClient.js
├── App.jsx            # Główny komponent
└── main.jsx           # Entry point
```

## 🔧 Konfiguracja

### Zmienne środowiskowe (.env)

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_ADMIN_EMAIL=admin@example.com
```

### Supabase

1. Utwórz projekt w Supabase
2. Wykonaj skrypt `supabase_setup.sql` w SQL Editor
3. Pobierz URL i anon key z Settings > API

Zobacz szczegóły w **[DEPLOYMENT.md](DEPLOYMENT.md)**

## 📚 Dokumentacja

- **[SZYBKI_START.md](SZYBKI_START.md)** - Przewodnik wdrożenia krok po kroku
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Szczegółowa dokumentacja deploymentu
- **[supabase_setup.sql](supabase_setup.sql)** - Skrypt SQL dla bazy danych

## 🔐 Bezpieczeństwo

- Row Level Security (RLS) w Supabase
- Hasła hashowane przez Supabase Auth
- Każdy użytkownik widzi tylko swoje dane
- Zatwierdzanie kont przez administratora

## 🎯 Funkcje aplikacji

### Dla trenera/administratora:
- ✅ Edycja struktury umiejętności
- ✅ Dodawanie/usuwanie zawodników
- ✅ Generowanie linków do ankiet
- ✅ Eksport/import danych
- ✅ Generowanie raportów PDF/HTML

### Dla zawodnika:
- ✅ Ocena własnych umiejętności
- ✅ Przeglądanie radarów umiejętności

### Dla zespołu:
- ✅ Ocena zespołowa zawodnika
- ✅ Porównanie ocen

## 📞 Kontakt

W razie pytań lub problemów: **Olejniczak19@gmail.com**

## 📝 Licencja

Projekt prywatny

## 🙏 Technologie

- React 18
- Vite 5
- Tailwind CSS 3
- Supabase (Backend as a Service)
- React Router 7
- Lucide React (ikony)

---

Made with ❤️ for football development
