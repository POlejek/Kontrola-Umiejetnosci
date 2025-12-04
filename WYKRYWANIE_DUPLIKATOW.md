# 🛡️ System wykrywania duplikatów

## Opis

System wykrywania duplikatów zapobiega przypadkowemu utworzeniu lub zaimportowaniu zawodników o tych samych nazwiskach. Działa w trzech miejscach:

1. **Ręczne tworzenie zawodnika** - blokuje natychmiast jeśli nazwa już istnieje
2. **Import zawodników w trybie DODAJ** - wykrywa duplikaty i pozwala wybrać którą wersję zachować
3. **Import zawodników w trybie NADPISZ** - nie sprawdza duplikatów (celowo zastępuje wszystkich)

---

## 🔍 Jak działa wykrywanie

### Normalizacja nazw
Porównanie jest **case-insensitive** (nie rozróżnia wielkości liter) i ignoruje białe znaki na końcach:
- `"Jan Kowalski"` = `"jan kowalski"` = `"JAN KOWALSKI"` = `" Jan Kowalski "`

### Algorytm
1. Normalizuj nazwę do małych liter i usuń spacje na końcach
2. Porównaj z nazwami istniejących zawodników
3. Jeśli znaleziono duplikat → pokaż ostrzeżenie/modal

---

## 🚫 Blokada przy ręcznym tworzeniu

### Scenariusz
Trener próbuje ręcznie dodać zawodnika przez formularz.

### Działanie
1. Kliknij **"Dodaj nowego zawodnika"**
2. Wprowadź imię i nazwisko
3. Kliknij **"Dodaj"**
4. **Jeśli nazwa już istnieje** → wyświetla się alert:
   ```
   ⚠️ Zawodnik o imieniu i nazwisku "[Nazwa]" już istnieje!
   ```
5. Zawodnik **NIE zostaje dodany**

### Rozwiązanie
- Zmień nazwę na unikalną (np. dodaj inicjał, cyfrę)
- Lub usuń istniejącego zawodnika przed dodaniem nowego

---

## 📊 Modal rozwiązywania duplikatów przy imporcie

### Kiedy się pojawia
Modal pojawia się gdy:
- Importujesz zawodników przez **"Import zawodników"**
- Wybierasz tryb **DODAJ** (zachowaj obecnych)
- W pliku importu są zawodnicy o nazwiskach już istniejących w aplikacji

### Wygląd modalu

```
┌─────────────────────────────────────────────────────┐
│ ⚠️ Znaleziono duplikaty                             │
│ Poniżsi zawodnicy już istnieją w aplikacji.         │
│ Wybierz, którą wersję chcesz zachować:              │
├─────────────────────────────────────────────────────┤
│                                                      │
│ ┌────────────────────────────────────────────────┐ │
│ │ Imię      │ Obecny w aplikacji │ Importowany  │ │
│ ├────────────────────────────────────────────────┤ │
│ │ Jan       │ Utworzony:         │ Utworzony:   │ │
│ │ Kowalski  │ 15.01.2024         │ 20.01.2024   │ │
│ │           │ Ocen: 15           │ Ocen: 8      │ │
│ │           │ ○ Zachowaj         │ ● Zastąp    │ │
│ ├────────────────────────────────────────────────┤ │
│ │ Anna      │ Utworzony:         │ Utworzony:   │ │
│ │ Nowak     │ 10.01.2024         │ 18.01.2024   │ │
│ │           │ Ocen: 22           │ Ocen: 5      │ │
│ │           │ ● Zachowaj         │ ○ Zastąp    │ │
│ └────────────────────────────────────────────────┘ │
│                                                      │
│ ℹ️ Pozostali zawodnicy (bez duplikatów) zostaną    │
│    dodani automatycznie.                            │
│                                                      │
├─────────────────────────────────────────────────────┤
│ [Anuluj import]  [Zastosuj wybory i kontynuuj]     │
└─────────────────────────────────────────────────────┘
```

### Informacje w tabeli

Dla każdego duplikatu widzisz:

#### Kolumna "Obecny w aplikacji"
- **Data utworzenia** - kiedy zawodnik został dodany do aplikacji
- **Liczba ocen** - ile umiejętności zostało ocenionych
- **Radio button** - wybierz aby ZACHOWAĆ obecnego zawodnika (importowany zostanie ZIGNOROWANY)

#### Kolumna "Importowany"
- **Data utworzenia** - data z importowanego pliku
- **Liczba ocen** - ile umiejętności ma w importowanym profilu
- **Radio button** - wybierz aby ZASTĄPIĆ obecnego zawodnika importowanym

### Jak wybrać

1. **Dla każdego duplikatu** zaznacz jedną opcję:
   - **"Zachowaj obecnego"** - obecny zawodnik pozostaje, importowany jest odrzucany
   - **"Zastąp importowanym"** - obecny zawodnik zostaje nadpisany danymi z importu

2. **Domyślnie** wszystkie duplikaty mają zaznaczone "Zachowaj obecnego" (bezpieczniejsza opcja)

3. Po dokonaniu wyborów kliknij:
   - **"Zastosuj wybory i kontynuuj import"** - zastosuj wybory i dodaj pozostałych zawodników
   - **"Anuluj import"** - przerwij cały import (nic się nie zmieni)

---

## 📝 Przykładowy scenariusz

### Sytuacja
- Masz w aplikacji: **Jan Kowalski** (utworzony 10.01.2024, 15 ocen)
- Importujesz plik z: **Jan Kowalski** (utworzony 20.01.2024, 22 oceny) i **Anna Nowak** (nowy)

### Krok 1: Import
1. Kliknij **"Import zawodników"**
2. Wybierz plik JSON
3. Wybierz tryb **DODAJ (zachowaj obecnych)**
4. Potwierdź

### Krok 2: Wykrycie duplikatu
System wykrywa, że "Jan Kowalski" już istnieje → pojawia się modal

### Krok 3: Decyzja
**Opcja A - Zachowaj obecnego:**
- Zaznacz "Zachowaj obecnego" dla Jana Kowalskiego
- Kliknij "Zastosuj wybory"
- **Rezultat:**
  - Jan Kowalski (stary, z 15 ocenami) - **POZOSTAJE**
  - Anna Nowak - **DODANA**

**Opcja B - Zastąp importowanym:**
- Zaznacz "Zastąp importowanym" dla Jana Kowalskiego
- Kliknij "Zastosuj wybory"
- **Rezultat:**
  - Jan Kowalski (nowy, z 22 ocenami) - **NADPISANY**
  - Anna Nowak - **DODANA**

### Krok 4: Potwierdzenie
System pokazuje podsumowanie:
```
✅ Import zakończony!

Duplikaty rozwiązane: 1
- Zachowane: 0 (lub 1)
- Zastąpione: 1 (lub 0)

Nowi zawodnicy dodani: 1
Łącznie zawodników: 2
```

---

## 🔄 Tryby importu - podsumowanie

### Tryb DODAJ (ZACHOWAJ OBECNYCH)
- ✅ Sprawdza duplikaty
- ✅ Pokazuje modal porównawczy
- ✅ Pozwala wybrać którą wersję zachować
- ✅ Dodaje nowych zawodników bez duplikatów

**Użyj gdy:** Łączysz dane z kilku źródeł i chcesz kontrolować konflikty

### Tryb NADPISZ (ZAMIEŃ WSZYSTKICH)
- ❌ NIE sprawdza duplikatów
- ❌ Kasuje wszystkich obecnych zawodników
- ✅ Importuje tylko zawodników z pliku

**Użyj gdy:** Chcesz całkowicie zastąpić listę zawodników (np. nowy sezon)

---

## 💡 Najlepsze praktyki

### Przed importem
1. **Zrób backup** - wyeksportuj pełną kopię zapasową przed importem
2. **Sprawdź plik** - upewnij się że nazwy zawodników są unikalne w pliku importu
3. **Wybierz właściwy tryb** - DODAJ jeśli łączysz dane, NADPISZ jeśli zastępujesz

### Podczas rozwiązywania duplikatów
1. **Sprawdź daty** - nowszy zawodnik może mieć aktualne dane
2. **Sprawdź liczbę ocen** - więcej ocen = więcej pracy do zachowania
3. **Bądź ostrożny** - zastąpienie usuwa całą historię starego zawodnika
4. **Możesz anulować** - jeśli nie jesteś pewien, anuluj i zrób najpierw backup

### Po imporcie
1. **Sprawdź listę** - upewnij się że wszyscy zawodnicy są poprawni
2. **Sprawdź oceny** - upewnij się że żadne dane nie zostały utracone
3. **Wypełnij czerwone** - nowe umiejętności będą czerwone dopóki nie zostają ocenione

---

## ⚙️ Szczegóły techniczne

### Funkcje w kodzie

#### `findDuplicates(existingPlayers, newPlayers)`
- Porównuje dwie listy zawodników
- Normalizuje nazwy (toLowerCase, trim)
- Zwraca listę duplikatów z obiektami `{name, existing, imported}`

#### `applyDuplicateChoices()`
- Przetwarza wybory użytkownika z modalu
- Zastępuje wybranych zawodników
- Dodaje nowych (bez duplikatów)
- Zapisuje do state i localStorage
- Pokazuje podsumowanie

#### Stan w komponencie
```javascript
const [showDuplicateModal, setShowDuplicateModal] = useState(false);
const [duplicates, setDuplicates] = useState([]);
const [duplicateChoices, setDuplicateChoices] = useState({});
const [pendingImportData, setPendingImportData] = useState(null);
```

### Przepływ danych
1. **Import rozpoczęty** → sprawdź duplikaty
2. **Duplikaty znalezione** → zapisz w `duplicates` i `pendingImportData`
3. **Użytkownik wybiera** → aktualizuj `duplicateChoices`
4. **Zastosuj** → `applyDuplicateChoices()` łączy dane i zapisuje
5. **Pokaż podsumowanie** → alert z wynikami

---

## 🐛 Rozwiązywanie problemów

### "Nie widzę modalu duplikatów"
- Upewnij się że używasz trybu **DODAJ** (nie NADPISZ)
- Sprawdź czy w pliku są zawodnicy o takich samych nazwiskach jak w aplikacji

### "Modal się nie zamyka po kliknięciu Zastosuj"
- To błąd - modal powinien zniknąć automatycznie
- Odśwież stronę i spróbuj ponownie

### "Nie mogę dodać zawodnika ręcznie"
- Sprawdź czy nazwa nie jest duplikatem (wielkość liter nie ma znaczenia)
- Zmień nazwę na unikalną

### "Straciłem dane po imporcie"
- Użyj **trybu NADPISZ** tylko gdy świadomie chcesz zastąpić wszystkich
- Zawsze rób backup przed importem
- W trybie DODAJ duplikaty są chronione modalem

---

## 📋 Checklist przed importem

- [ ] Mam kopię zapasową (export pełny)
- [ ] Sprawdziłem nazwy w pliku importu
- [ ] Wybrałem właściwy tryb (DODAJ/NADPISZ)
- [ ] Rozumiem że NADPISZ usuwa wszystkich obecnych zawodników
- [ ] Jestem gotowy rozwiązać duplikaty jeśli się pojawią

---

**Wersja:** 2.4 (styczeń 2025)  
**Funkcja dodana:** System wykrywania duplikatów
