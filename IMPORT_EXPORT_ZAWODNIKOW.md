# Import/Export Zawodników

## 📋 Przegląd funkcjonalności

System pozwala teraz na **rozdzielenie** eksportu/importu:
1. **Struktura umiejętności** (bez ocen) - dla trenerów
2. **Zawodnicy** (bez struktury) - dla zarządzania zawodnikami

To umożliwia elastyczne zarządzanie: najpierw wczytaj strukturę, potem dodaj zawodników.

---

## 🎯 Dlaczego to przydatne?

### Scenariusz 1: Współpraca między klubami
1. **Klub A** ma swoją strukturę umiejętności
2. **Zawodnik** przenosi się z Klubu B do Klubu A
3. Klub B eksportuje **tylko dane zawodnika** (bez swojej struktury)
4. Klub A importuje zawodnika → **automatycznie dostaje strukturę Klubu A**
5. Oceny są dopasowane - nowe umiejętności (czerwone) czekają na ocenę

### Scenariusz 2: Standaryzacja w organizacji
1. Organizacja definiuje **jeden standard struktury**
2. Każdy trener eksportuje tę strukturę
3. Każdy klub eksportuje swoich **zawodników osobno**
4. Przy przeniesieniu zawodnika - import używa lokalnej struktury
5. Wszystkie kluby mają tę samą strukturę, różnych zawodników

### Scenariusz 3: Backup selektywny
1. Struktura zmienia się rzadko → backup raz na kwartał
2. Zawodnicy zmieniają się często → backup co tydzień
3. Mniejsze pliki, szybszy transfer
4. Łatwiejsze zarządzanie wersjami

---

## 📤 Eksport Zawodników

### Jak wyeksportować:
```
Główny ekran → Sekcja "👥 Tylko Zawodnicy"
→ [Eksportuj Zawodników] (niebieski przycisk)
```

### Co zawiera eksport:
```json
{
  "version": "1.0",
  "type": "players-only",
  "exportDate": "2025-12-04T...",
  "players": [
    {
      "id": "player-123",
      "name": "Jan Kowalski",
      "createdAt": "2025-11-15T...",
      "ratings": {
        "mental-1": {
          "player": { "value": 7, "timestamp": "..." },
          "coach": { "value": 8, "timestamp": "..." },
          "team": []
        }
      }
    }
  ]
}
```

### Czego NIE zawiera:
- ❌ Struktura umiejętności (skillTree)
- ❌ Globalna konfiguracja

### Nazwa pliku:
```
zawodnicy-2025-12-04.json
```

---

## 📥 Import Zawodników

### Jak zaimportować:
```
Główny ekran → Sekcja "👥 Tylko Zawodnicy"
→ [Importuj Zawodników] (indigo przycisk)
→ Wybierz plik zawodnicy-YYYY-MM-DD.json
```

### Co się dzieje przy imporcie:

#### 1️⃣ **Walidacja**
- Sprawdzenie czy plik ma `"type": "players-only"`
- Sprawdzenie czy zawiera tablicę `players`

#### 2️⃣ **Wybór trybu: Dodaj lub Nadpisz**
Pierwsze pytanie:
```
[OK] = DODAJ do istniejących (3 + 2 = 5)
[Anuluj] = NADPISZ wszystkich (zostanie tylko 2)
```

Tryby:
- **DODAJ** - zachowuje obecnych zawodników, dodaje nowych
- **NADPISZ** - usuwa wszystkich obecnych, wstawia tylko nowych

#### 3️⃣ **Dopasowanie do aktualnej struktury**
Każdy zawodnik otrzymuje:
- **Aktualną strukturę umiejętności** z systemu
- **Swoje oceny** z pliku (zachowane)

#### 4️⃣ **Oznaczanie nowych umiejętności**
System porównuje:
- **Stare ID** (z ocen zawodnika w pliku)
- **Nowe ID** (z aktualnej struktury)

Jeśli w aktualnej strukturie są umiejętności, których nie ma w ocenach:
- Dodaje je z oceną **5**
- Oznacza flagą `unrated: true`
- **Wyświetla na CZERWONO** w ankietach

#### 5️⃣ **Zastosowanie wybranego trybu**
- **Tryb DODAJ**: Zawodnicy są **DODAWANI** do istniejących
  - Masz 3 zawodników + importujesz 2 → będziesz mieć 5
- **Tryb NADPISZ**: Zawodnicy są **ZASTĘPOWANI**
  - Masz 3 zawodników + importujesz 2 → będziesz mieć 2 (nowych)

---

## 🔴 Czerwone oznaczenie przy imporcie

### Przykład:

**Zawodnik w pliku ma oceny dla:**
- Mental → Zaangażowanie (ID: mental-1) ✅
- Mental → Koncentracja (ID: mental-2) ✅

**Aktualna struktura ma:**
- Mental → Zaangażowanie (ID: mental-1) ✅ **→ ocena zachowana**
- Mental → Koncentracja (ID: mental-2) ✅ **→ ocena zachowana**
- Mental → Odporność mentalna (ID: mental-ext-2) 🆕 **→ CZERWONE (5)**

### Widok w ankiecie:
```
┌──────────────────────────────────────┐
│ ✅ #1.1 Zaangażowanie                │
│ Wartość: 7 (zachowana z pliku)       │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 🔴 NOWA - WYMAGA OCENY              │
│ #1.3 Odporność mentalna              │
│ Wartość: 5 (domyślna)                │
└──────────────────────────────────────┘
```

---

## 🔄 Przepływ pracy: Import z innego systemu

### Krok po kroku:

#### **Klub B (wysyła zawodnika):**
1. Otwórz profil zawodnika
2. Sekcja "👥 Tylko Zawodnicy"
3. Kliknij **"Eksportuj Zawodników"**
4. Wyślij plik do Klubu A

#### **Klub A (odbiera zawodnika):**
1. Upewnij się że masz **właściwą strukturę** (zaimportuj jeśli trzeba)
2. Sekcja "👥 Tylko Zawodnicy"
3. Kliknij **"Importuj Zawodników"**
4. Wybierz plik od Klubu B
5. Potwierdź import
6. **Rezultat:**
   - Zawodnik ma strukturę Klubu A
   - Oceny z Klubu B zachowane (tam gdzie ID się zgadza)
   - Nowe umiejętności Klubu A są CZERWONE (5)

#### **Trener w Klubie A:**
1. Otwiera profil zawodnika
2. Widzi diagram z częściowymi danymi
3. Otwiera ankietę → widzi czerwone pytania
4. Ocenia zawodnika w nowych kategoriach
5. Zapisuje → czerwone znika
6. Pełny profil gotowy! ✅

---

## 📊 Porównanie typów eksportu/importu

| Funkcja | Pełny Backup | Tylko Struktura | Tylko Zawodnicy |
|---------|-------------|-----------------|----------------|
| **Sekcja** | 💾 Pełny Backup | Edytor struktury | 👥 Tylko Zawodnicy |
| **Kolor eksport** | 🟢 Zielony | 🟢 Zielony | 🔵 Niebieski |
| **Kolor import** | 🟠 Pomarańczowy | 🟠 Pomarańczowy | 🟣 Indigo |
| **Struktura** | ✅ TAK | ✅ TAK | ❌ NIE |
| **Zawodnicy** | ✅ TAK | ❌ NIE | ✅ TAK |
| **Oceny** | ✅ TAK | ❌ NIE | ✅ TAK |
| **Import nadpisuje** | Wszystko | Strukturę | Opcjonalnie* |
| **Import dodaje** | - | - | Opcjonalnie* |

_* Wybór trybu: DODAJ (dodaje) lub NADPISZ (nadpisuje)_
| **Nazwa pliku** | `kontrola-...-backup-...` | `struktura-...` | `zawodnicy-...` |
| **Cel** | Pełny backup | Współdzielenie struktury | Transfer zawodników |

---

## 🎯 Zalecany workflow

### Nowy system (start from scratch):
```
1. Import struktury (od eksperta/klubu)
2. Dodaj zawodników ręcznie LUB
3. Importuj zawodników (z innego systemu)
```

### Transfer zawodnika między klubami:
```
Klub A: Eksportuj zawodnika
   ↓
Klub B: Import struktury (jeśli inna niż Klub A)
Klub B: Importuj zawodnika
Klub B: Oceń czerwone pytania
```

### Regularne backupy:
```
Co tydzień: Eksportuj zawodników (mały plik)
Co miesiąc: Pełny backup (wszystko)
Po zmianach: Eksportuj strukturę (gdy zmieniasz)
```

---

## ⚠️ Ważne uwagi

### ✅ Import zawodników:
- **DODAJE** zawodników do istniejących (nie usuwa starych)
- Używa **AKTUALNEJ** struktury (nie tej z pliku)
- **Dopasowuje** oceny - zachowuje co się da
- **Oznacza CZERWONYM** nowe umiejętności

### ✅ Tryb importu:
- **DODAJ** - zachowuje obecnych zawodników, dodaje nowych z pliku
- **NADPISZ** - usuwa wszystkich obecnych, wstawia tylko z pliku
- Wybór jest potwierdzany dwukrotnie (bezpieczeństwo)
- Tryb NADPISZ nie można cofnąć - zrób backup!

### ✅ Duplikaty:
- System **NIE sprawdza** duplikatów po imieniu
- W trybie DODAJ: jeśli zaimportujesz tego samego zawodnika 2x → będziesz mieć 2 wpisy
- W trybie NADPISZ: zastępujesz wszystkich, więc duplikaty nie wystąpią
- Każdy zawodnik ma unikalny ID (timestamp)
- Musisz ręcznie usuwać duplikaty jeśli trzeba (tryb DODAJ)

### ✅ Zgodność struktur:
- Jeśli struktury są **identyczne** → wszystkie oceny zachowane
- Jeśli struktury są **różne** → część ocen zachowana, reszta czerwona (5)
- System dopasowuje **po ID umiejętności**
- Zmiana nazwy (przy tym samym ID) → ocena zachowana
- Zmiana ID → traktowane jako nowa umiejętność (czerwone)

### ✅ Bezpieczeństwo:
- Import zawodników **NIE nadpisuje** istniejących
- Zawsze możesz usunąć ręcznie niepotrzebnych
- Przed importem zrób backup (pełny)
- Pliki są w JSON - możesz je edytować ręcznie (ostrożnie!)

---

## 🐛 Rozwiązywanie problemów

### Problem: Po imporcie wszystko czerwone
**Przyczyna:** Struktury mają kompletnie różne ID  
**Rozwiązanie:** 
- Najpierw zaimportuj właściwą strukturę
- Potem importuj zawodników
- Jeśli struktury są niekompatybilne - oceń ręcznie

### Problem: Zawodnik zaimportował się 2 razy
**Przyczyna:** Wybrałeś tryb DODAJ i zaimportowałeś tego samego zawodnika ponownie
**Rozwiązanie:**
- Usuń duplikat ręcznie (przycisk 🗑️)
- Przy następnym imporcie użyj trybu NADPISZ lub uważaj na duplikaty

### Problem: Część ocen zniknęła
**Przyczyna:** ID umiejętności się zmieniły między strukturami  
**Rozwiązanie:**
- To normalne przy różnych strukturach
- System nie może dopasować oceny do umiejętności o innym ID
- Oceń czerwone pytania

### Problem: Import nie działa
**Rozwiązanie:**
1. Sprawdź czy plik ma `"type": "players-only"`
2. Sprawdź czy JSON jest poprawny
3. Sprawdź czy masz zaimportowaną strukturę
4. Sprawdź konsolę przeglądarki (F12)

---

## 📝 Format pliku - szczegóły techniczne

### Minimalna struktura:
```json
{
  "version": "1.0",
  "type": "players-only",
  "exportDate": "2025-12-04T12:00:00.000Z",
  "players": [
    {
      "id": "player-1733317200000",
      "name": "Jan Kowalski",
      "createdAt": "2025-11-15T10:30:00.000Z",
      "ratings": {
        "skill-id-1": {
          "player": { "value": 7, "timestamp": "..." },
          "coach": { "value": 8, "timestamp": "..." },
          "team": [
            { "value": 6, "timestamp": "..." }
          ]
        }
      }
    }
  ]
}
```

### Pola wymagane:
- `version` - wersja formatu
- `type` - MUSI być `"players-only"`
- `exportDate` - data eksportu
- `players` - tablica zawodników
- `players[].id` - unikalny ID
- `players[].name` - imię
- `players[].ratings` - obiekt z ocenami

### Pola opcjonalne:
- `players[].createdAt` - data utworzenia profilu

---

## 🚀 Przykłady użycia

### Przykład 1: Przenieś zawodnika z testowego do produkcyjnego
```bash
# Testowy system
Eksportuj zawodnika → test-player.json

# Produkcyjny system
Import struktury (jeśli inna) → struktura-prod.json
Import zawodnika → test-player.json
✅ Zawodnik w produkcji z właściwą strukturą
```

### Przykład 2: Udostępnij zawodnika trenerowi gościnemu
```bash
# Klub macierzysty
Eksportuj strukturę → struktura-klubu.json
Eksportuj zawodnika → zawodnik-jan.json
📧 Wyślij oba pliki

# Trener gościnny
Import struktury → struktura-klubu.json
Import zawodnika → zawodnik-jan.json
✅ Pełny profil gotowy do pracy
```

### Przykład 3: Backup przyrostowy
```bash
# Raz na początku
Eksportuj strukturę → struktura-v1.json

# Co tydzień
Eksportuj zawodników → zawodnicy-2025-12-01.json
Eksportuj zawodników → zawodnicy-2025-12-08.json
Eksportuj zawodników → zawodnicy-2025-12-15.json

# Odtworzenie
Import struktury → struktura-v1.json
Import zawodników → zawodnicy-2025-12-15.json
✅ Najnowszy stan odtworzony
```

---

**Wersja dokumentacji:** 1.0  
**Data:** 4 grudnia 2025
