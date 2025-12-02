# System Kontroli Umiejętności - Nowa Wersja 2.0

## 🎯 Najważniejsze Zmiany

### 1. **Edytor Struktury Umiejętności**
- Dostępny na ekranie głównym (dla trenera)
- Pozwala tworzyć/edytować hierarchię umiejętności
- Zmiany automatycznie propagują się do WSZYSTKICH zawodników
- Brak możliwości edycji struktury u poszczególnych zawodników (tylko trener)

### 2. **Ankieta Single-Page**
- Wszystkie pytania wyświetlane na jednej stronie
- Automatyczne pogrupowanie w sekcje i podsekcje
- Hierarchiczna wizualizacja (Sekcja → Podsekcja → Pytania)
- Licznik pytań i sekcji
- Sticky footer z przyciskami akcji

### 3. **Wybór Poziomu przy Generowaniu Linku**
- Trener wybiera od którego poziomu wygenerować ankietę
- Możliwość wygenerowania:
  - Całego profilu (wszystkie umiejętności)
  - Konkretnej sekcji (np. tylko "Mental")
  - Konkretnej podsekcji (np. tylko "Koncentracja Uwagi")
- Link zawiera parametr `startNode` określający punkt startowy

## 📋 Przepływ Pracy

### Dla Trenera:

1. **Definiowanie Struktury**
   - Kliknij "Edytuj Strukturę Umiejętności (Trener)"
   - Dodawaj/usuwaj/edytuj umiejętności
   - Twórz dowolnie głęboką hierarchię
   - Kliknij "Zapisz zmiany" - struktura zaktualizuje się dla wszystkich zawodników

2. **Tworzenie Zawodników**
   - Dodaj zawodnika (otrzyma aktualną strukturę umiejętności)
   - Istniejący zawodnicy automatycznie dostaną nową strukturę po jej zapisaniu

3. **Generowanie Ankiet**
   - Przy każdym zawodniku wybierz typ ankiety (Zawodnik/Trener/Zespół)
   - W modalu wybierz poziom rozpoczęcia:
     - Poziom 1: Cały profil
     - Poziom 2: Konkretna kategoria (Mental, Technika, etc.)
     - Poziom 3+: Głębsze podkategorie
   - Link zostanie skopiowany do schowka

### Dla Osoby Wypełniającej Ankietę:

1. **Otwieranie Linku**
   - Kliknij link otrzymany od trenera
   - Aplikacja automatycznie załaduje:
     - Profil zawodnika
     - Typ ankiety (zawodnik/trener/zespół)
     - Wybrany poziom startowy

2. **Wypełnianie Ankiety**
   - Wszystkie pytania widoczne na jednej stronie
   - Pytania pogrupowane w sekcje
   - Suwaki 1-10 dla każdej umiejętności
   - Numer pytania (#Sekcja.Pytanie)

3. **Zapisywanie**
   - Kliknij "Zapisz Ankietę"
   - Dane zapisują się automatycznie
   - Możliwość powrotu do profilu zawodnika

## 🔧 Szczegóły Techniczne

### URL Parameters

```
?playerId=player-123456789&survey=coach&startNode=mental
```

- `playerId` - ID zawodnika
- `survey` - typ ankiety (player/coach/team)
- `startNode` - ścieżka do węzła startowego (opcjonalne)
  - Brak parametru = cały profil
  - `mental` = tylko sekcja Mental
  - `mental/mental-1` = tylko podsekcja "Zaangażowanie i motywacja"

### Struktura Danych

```javascript
// Globalna struktura (localStorage: 'globalSkillTree')
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
          children: [] // liść - pytanie w ankiecie
        }
      ]
    }
  ]
}

// Zawodnicy (localStorage: 'skillTrackerPlayers')
[
  {
    id: 'player-123',
    name: 'Jan Kowalski',
    skillTree: {...}, // kopia globalnej struktury
    ratings: {
      'mental': {
        player: [...],
        coach: [...],
        team: [[...], [...]] // wiele ocen zespołu
      }
    }
  }
]
```

### Zbieranie Pytań (collectAllQuestions)

Funkcja rekurencyjnie przechodzi drzewo umiejętności i zbiera tylko liście (węzły bez dzieci):

```javascript
collectAllQuestions(node, pathPrefix = []) → [
  {
    id: 'mental-1',
    name: 'Zaangażowanie i motywacja',
    path: [{id: 'root', name: 'Profil'}, {id: 'mental', name: 'Mental'}],
    section: 'Profil Zawodnika → Mental'
  },
  ...
]
```

### Zapisywanie Odpowiedzi (submitSurvey)

1. Grupuj odpowiedzi po rodzicu (parentId)
2. Dla każdego rodzica zapisz wszystkie odpowiedzi jego dzieci
3. Format: `allRatings[parentId][surveyType] = [...]`

## 🎨 UI/UX Features

### Edytor Struktury
- Wcięcia wizualne (24px na poziom)
- Przyciski rozwijania (chevron down/right)
- Badge z liczbą dzieci
- Inline editing nazw
- Hover effects i transitions

### Ankieta
- Sekcje z kolorowymi headerami
- Numeracja pytań (#Sekcja.Pytanie)
- Suwaki z oznaczeń 1-10 po bokach
- Duża liczba wartości (2xl, bold, blue)
- Sticky footer z przyciskami
- Licznik: "Zapisz Ankietę (X odpowiedzi)"

### Modal Wyboru Poziomu
- Pełnoekranowy overlay (50% black)
- Lista węzłów z wcięciami
- Informacje o poziomie i ścieżce
- Hover effects (blue-50)
- Ikona Share2 przy każdej opcji

## 📊 Zarządzanie Stanem

### React State
- `globalSkillTree` - globalna struktura (master)
- `players` - lista zawodników z ich kopiami struktury
- `showLevelSelector` - widoczność modalu
- `selectedPlayerForLink` - kontekst wyboru poziomu
- `tempRatings` - tymczasowe odpowiedzi ankiety

### localStorage Keys
- `globalSkillTree` - struktura master
- `skillTrackerPlayers` - tablica zawodników

### Synchronizacja
- Zmiana globalnej struktury → update wszystkich zawodników
- Nowy zawodnik → kopiuj aktualną globalną strukturę
- Auto-save przy każdej zmianie (useEffect)

## 🐛 Rozwiązane Problemy

1. **Kompleksowe pytania w ankiecie**
   ✅ Rozwiązanie: Rekurencyjne zbieranie liści z całego poddrzewa

2. **Edycja struktury przez zawodników**
   ✅ Rozwiązanie: Blokada edycji w profilu zawodnika, tylko widok trenera

3. **Propagacja zmian struktury**
   ✅ Rozwiązanie: Globalna struktura + kopiowanie przy zapisie

4. **Wybór zakresu ankiety**
   ✅ Rozwiązanie: Modal z listą wszystkich węzłów + parametr URL

5. **Wizualizacja hierarchii w ankiecie**
   ✅ Rozwiązanie: Grupowanie po sekcjach + numery pytań

## 🚀 Deployment

```bash
npm run build
# Pliki w dist/ gotowe do wdrożenia
```

## 💡 Przyszłe Ulepszenia

- [ ] Export/import struktury umiejętności (JSON)
- [ ] Szablony struktur (sport-specific)
- [ ] Walidacja wypełnienia (wymóż wszystkie odpowiedzi)
- [ ] Podgląd wypełnionej ankiety przed zapisem
- [ ] Historia zmian struktury
- [ ] Komentarze przy ocenach
- [ ] Porównanie wyników między zawodnikami
