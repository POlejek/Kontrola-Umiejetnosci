# Kontrola Umiejętności - Hierarchiczny Diagram

> **🎉 NOWA WERSJA Z INTEGRACJĄ CHMUROWĄ!**  
> Aplikacja została zaktualizowana o system logowania i automatyczny zapis w chmurze.  
> **👉 Zobacz [SZYBKI_START.md](SZYBKI_START.md) aby wdrożyć nową wersję z Supabase + Netlify**

Aplikacja webowa do tworzenia hierarchicznych diagramów umiejętności zawodników z systemem ankiet dla zawodników, trenerów i zespołu.

## 🚀 Funkcjonalności

- **Zarządzanie zawodnikami** - dodawaj i zarządzaj wieloma profilami zawodników
- **Hierarchiczna struktura umiejętności** (do 4 poziomów zagnieżdżenia)
- **Ankiety oceniające** dla trzech perspektyw:
  - Zawodnik (samoocena)
  - Trener (ocena trenera)
  - Zespół (ocena członków zespołu)
- **Współdzielenie ankiet** - generuj i kopiuj linki do ankiet dla innych osób
- **Interaktywny diagram radarowy** (spider/wheel chart)
- **Nawigacja wielopoziomowa** z breadcrumbs
- **Eksport do SVG** - możliwość pobrania wykresów
- **Zapis lokalny** - wszystkie dane przechowywane w localStorage przeglądarki
- **Responsywny interfejs** z Tailwind CSS

## 📋 Wymagania

- Node.js 16+ i npm/yarn

## 🛠️ Instalacja i uruchomienie

### 1. Zainstaluj zależności

```bash
npm install
```

### 2. Uruchom w trybie deweloperskim

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:5173`

### 3. Zbuduj wersję produkcyjną

```bash
npm run build
```

Zbudowana aplikacja znajdzie się w folderze `dist/`

### 4. Podgląd wersji produkcyjnej

```bash
npm run preview
```

## 🌐 Wdrożenie na hosting

### Opcja 1: Netlify (zalecane)

1. Zarejestruj się na [netlify.com](https://netlify.com)
2. Zainstaluj Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Zbuduj aplikację:
   ```bash
   npm run build
   ```
4. Wdróż:
   ```bash
   netlify deploy --prod --dir=dist
   ```

**Lub wdróż przez interfejs webowy:**
- Przeciągnij folder `dist` na Netlify Drop
- Lub połącz repozytorium Git i ustaw:
  - Build command: `npm run build`
  - Publish directory: `dist`

### Opcja 2: Vercel

1. Zainstaluj Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Wdróż:
   ```bash
   vercel --prod
   ```

**Lub przez interfejs webowy:**
- Połącz repozytorium Git na [vercel.com](https://vercel.com)
- Vercel automatycznie wykryje projekt Vite

### Opcja 3: GitHub Pages

1. Zainstaluj gh-pages:
   ```bash
   npm install -g gh-pages
   ```
2. Dodaj do `package.json`:
   ```json
   "scripts": {
     "deploy": "vite build && gh-pages -d dist"
   }
   ```
3. W `vite.config.js` ustaw `base`:
   ```js
   export default defineConfig({
     base: '/Kontrola-Umiejetnosci/',
     plugins: [react()],
   })
   ```
4. Wdróż:
   ```bash
   npm run deploy
   ```

### Opcja 4: Własny serwer (Apache/Nginx)

1. Zbuduj aplikację:
   ```bash
   npm run build
   ```
2. Skopiuj zawartość folderu `dist/` na serwer
3. Skonfiguruj serwer aby obsługiwał SPA:

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 📁 Struktura projektu

```
Kontrola-Umiejetnosci/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── SkillWheelDiagram.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎯 Jak używać aplikacji

### Szybki start:

#### 1. Zarządzanie zawodnikami
1. **Dodaj zawodnika** - kliknij "Dodaj Zawodnika" i wprowadź imię i nazwisko
2. **Otwórz profil** - kliknij "Otwórz Profil" aby zarządzać umiejętnościami
3. **Generuj linki** - kliknij ikonę udostępniania przy każdym typie ankiety
4. **Wyślij linki** - skopiowane linki wyślij trenerowi lub członkom zespołu

#### 2. Praca z umiejętnościami
1. **Dodawanie umiejętności** - wpisz nazwę i kliknij "Dodaj"
2. **Tworzenie podkategorii** - kliknij "+ Sub" przy umiejętności (do 4 poziomów!)
3. **Nawigacja** - kliknij niebieskie nazwy na diagramie lub użyj przycisków nawigacji
4. **Wypełnianie ankiet** - kliknij jeden z przycisków ankiet i oceń umiejętności w skali 1-10
5. **Pobieranie wykresów** - kliknij "Pobierz SVG" aby zapisać diagram

#### 3. System linków do ankiet
- Każdy zawodnik ma 3 unikalne linki (Zawodnik, Trener, Zespół)
- Link otwiera bezpośrednio ankietę dla wybranej perspektywy
- Odpowiedzi są automatycznie zapisywane do profilu zawodnika
- Dane przechowywane w localStorage przeglądarki

### Hierarchia 4-poziomowa:
- **Poziom 1**: Główne kategorie (np. Technika, Taktyka, Mental)
- **Poziom 2**: Podkategorie (np. dla Mental: Koncentracja, Motywacja)
- **Poziom 3**: Szczegółowe umiejętności
- **Poziom 4**: Maksymalna szczegółowość

**💡 Wypełniaj ankiety na najniższych poziomach - średnie automatycznie pojawią się wyżej!**

📖 **Szczegółowy przewodnik**: Zobacz plik [PRZEWODNIK.md](./PRZEWODNIK.md)

## 🎨 Technologie

- **React 18** - biblioteka UI
- **Vite** - narzędzie do budowania
- **Tailwind CSS** - stylowanie
- **Lucide React** - ikony
- **SVG** - renderowanie diagramów

## 📝 Licencja

MIT

## 👨‍💻 Autor

Aplikacja stworzona dla potrzeb analizy umiejętności zawodników sportowych.
