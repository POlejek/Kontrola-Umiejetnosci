# System Kontroli Umiejętności - v2.0

Kompleksowa aplikacja do zarządzania i wizualizacji umiejętności zawodników z zaawansowanym systemem hierarchii, ankiet i edycji struktury.

## ✨ Nowe w wersji 2.0

### 🎨 Edytor Struktury Umiejętności
- Trener może definiować hierarchię umiejętności na ekranie głównym
- Zmiany propagują się automatycznie do wszystkich zawodników
- Graficzny interfejs z intuicyjną edycją
- Dowolnie głęboka hierarchia (nie tylko 4 poziomy)

### 📤 Import/Export Struktury Umiejętności
- **Eksport struktury** bez ocen - idealne do współdzielenia między trenerami
- **Import struktury** - automatyczne dodanie nowych umiejętności
- 🔴 **Czerwone oznaczenie** nowych umiejętności (ocena domyślna: 5)
- Zachowanie wszystkich istniejących ocen przy imporcie
- [📖 Szczegółowa dokumentacja](IMPORT_EXPORT_STRUKTURY.md) | [⚡ Szybki start](QUICK_START_IMPORT_EXPORT.md)

### 👥 Import/Export Zawodników (bez struktury)
- **Eksport zawodników** - tylko dane zawodników bez struktury umiejętności
- **Import zawodników** - automatyczne dopasowanie do aktualnej struktury
- Elastyczne zarządzanie: osobno struktura, osobno zawodnicy
- Idealne do transferu zawodników między klubami/systemami
- Nowe umiejętności w strukturze → automatycznie czerwone przy imporcie
- [📖 Szczegółowa dokumentacja](IMPORT_EXPORT_ZAWODNIKOW.md) | [⚡ Szybki start](QUICK_START_ZAWODNICY.md)

### 📄 Ankiety Single-Page
- Wszystkie pytania na jednej stronie
- Automatyczne grupowanie w sekcje i podsekcje
- Hierarchiczna wizualizacja pytań
- Licznik pytań i sekcji
- Wizualne oznaczenie nieocenionych umiejętności (czerwone)

### 🎯 Wybór Poziomu Ankiety
- Trener decyduje od którego poziomu wygenerować ankietę
- Możliwość utworzenia linku do:
  - Całego profilu
  - Konkretnej sekcji (np. tylko Mental)
  - Konkretnej podsekcji
- Link zawiera parametr określający zakres

## 🚀 Funkcjonalności

### Core Features
- 🎯 **N-poziomowa hierarchia umiejętności** (bez limitu głębokości)
- 📊 **Diagram radarowy** (SVG) z automatycznym zawijaniem tekstu
- 📝 **System ankiet** (zawodnik, trener, zespół)
- 👥 **Zarządzanie wieloma zawodnikami** z localStorage
- 🔗 **Linki do udostępniania ankiet** z wyborem zakresu
- 💾 **Automatyczny zapis danych** w przeglądarce
- 📱 **Responsywny design** z Tailwind CSS

### Advanced Features
- ✏️ **Edytor struktury** dostępny tylko dla trenera
- 🔄 **Automatyczna propagacja** zmian struktury do wszystkich zawodników
- 🎪 **Modal wyboru poziomu** przy generowaniu linków
- 📋 **Single-page ankiety** z wszystkimi pytaniami
- 🏷️ **Inteligentne grupowanie** pytań w sekcje
- 🔢 **Numeracja pytań** (#Sekcja.Numer)

## 📋 Wymagania

- Node.js 16+ i npm

## 🛠️ Instalacja

```bash
npm install
```

## 🚀 Uruchamianie

```bash
# Tryb deweloperski
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu
npm run preview
```

## 📁 Struktura Projektu

```
src/
├── components/
│   ├── SkillWheelDiagram.jsx    # Główny komponent diagramu i ankiet
│   ├── PlayerManager.jsx         # Zarządzanie zawodnikami i linkami
│   └── SkillTreeEditor.jsx       # Edytor struktury umiejętności
├── App.jsx
└── index.css
```

## 📖 Dokumentacja

- [CHANGELOG_v2.md](./CHANGELOG_v2.md) - Szczegółowy opis zmian w wersji 2.0
- [SYSTEM_ZAWODNIKOW.md](./SYSTEM_ZAWODNIKOW.md) - Guide systemu zawodników
- [PRZEWODNIK.md](./PRZEWODNIK.md) - Przewodnik hierarchii
- [GUIDE_KTORY_EKSPORT.md](./GUIDE_KTORY_EKSPORT.md) - 📊 **Który eksport wybrać?** (przewodnik)
- [IMPORT_EXPORT_STRUKTURY.md](./IMPORT_EXPORT_STRUKTURY.md) - 📤 Import/Export struktury
- [QUICK_START_IMPORT_EXPORT.md](./QUICK_START_IMPORT_EXPORT.md) - ⚡ Szybki start importu/exportu struktury
- [IMPORT_EXPORT_ZAWODNIKOW.md](./IMPORT_EXPORT_ZAWODNIKOW.md) - 👥 Import/Export zawodników
- [QUICK_START_ZAWODNICY.md](./QUICK_START_ZAWODNICY.md) - ⚡ Szybki start importu/exportu zawodników

## 🔄 Przepływ Pracy

### 1. Trener Definiuje Strukturę
```
Ekran Główny → "Edytuj Strukturę Umiejętności"
→ Dodaj/Usuń/Edytuj Umiejętności
→ "Zapisz zmiany"
→ Struktura aktualizuje się dla wszystkich zawodników
```

### 2. Dodawanie Zawodników
```
"Dodaj Zawodnika" → Wpisz imię i nazwisko
→ Zawodnik otrzymuje aktualną strukturę umiejętności
```

### 3. Generowanie Ankiet
```
Wybierz zawodnika → Kliknij typ ankiety (👤/👨‍🏫/👥)
→ Modal wyboru poziomu → Wybierz zakres
→ Link kopiowany do schowka
```

### 4. Wypełnianie Ankiety
```
Otwarcie linku → Wszystkie pytania na jednej stronie (pogrupowane)
→ Oceń każdą umiejętność (suwak 1-10)
→ "Zapisz Ankietę"
```

## 🔗 URL Parameters

```
?playerId=player-123&survey=coach&startNode=mental/mental-1
```

- `playerId` - ID zawodnika
- `survey` - typ ankiety (player/coach/team)
- `startNode` - ścieżka startowa (opcjonalne)
  - Brak = cały profil
  - `mental` = tylko sekcja Mental
  - `mental/mental-1` = konkretna podsekcja

## 💾 localStorage Keys

- `globalSkillTree` - Master struktura umiejętności (edytowana przez trenera)
- `skillTrackerPlayers` - Lista zawodników z ich danymi i ocenami

## 🛠️ Technologie

- **React** 18.2.0 - UI library
- **Vite** 5.4.21 - Build tool
- **Tailwind CSS** 3.3.6 - Styling
- **Lucide React** 0.294.0 - Ikony

## 📊 Przykład Struktury Danych

### Globalna Struktura
```javascript
{
  id: 'root',
  title: 'Profil Zawodnika',
  skills: [
    {
      id: 'mental',
      name: 'Mental',
      skills: [
        {
          id: 'mental-1',
          name: 'Zaangażowanie i motywacja',
          children: [] // liść
        }
      ]
    }
  ]
}
```

### Zawodnik
```javascript
{
  id: 'player-123',
  name: 'Jan Kowalski',
  skillTree: {...}, // kopia globalnej struktury
  ratings: {
    'mental': {
      player: [{name: '...', value: 7}, ...],
      coach: [{name: '...', value: 8}, ...],
      team: [[...], [...]] // wiele ocen
    }
  }
}
```

## 🎨 Kluczowe Komponenty

### SkillTreeEditor
- Edycja hierarchii umiejętności
- Dodawanie/usuwanie węzłów
- Rozwijanie/zwijanie gałęzi
- Zapisywanie do localStorage

### PlayerManager
- Lista zawodników
- Modal wyboru poziomu ankiety
- Generowanie linków z parametrami
- Zarządzanie globalną strukturą

### SkillWheelDiagram
- Renderowanie diagramu radarowego
- System ankiet single-page
- Zbieranie pytań z hierarchii
- Zapisywanie odpowiedzi

## 🐛 Znane Ograniczenia

- Dane przechowywane tylko lokalnie (brak cloud sync)
- Brak systemu logowania/autoryzacji
- Brak exportu/importu struktury
- Brak historii zmian

## 🚀 Przyszłe Ulepszenia

- [ ] Export/import struktury (JSON/CSV)
- [ ] Szablony struktur (sport-specific)
- [ ] Cloud sync (Firebase/Supabase)
- [ ] System logowania
- [ ] Porównanie wyników między zawodnikami
- [ ] Wykresy trendów w czasie
- [ ] Komentarze przy ocenach
- [ ] PDF reports

## 📝 Licencja

MIT

## 👥 Kontakt

Projekt stworzony dla trenerów i zespołów sportowych.

---

**Wersja:** 2.0  
**Data:** Grudzień 2024
