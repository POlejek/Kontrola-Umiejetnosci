# 📊 Przewodnik: Który eksport wybrać?

## 🎯 Drzewo Decyzyjne

```
Chcę wyeksportować dane...
│
├─ Potrzebuję WSZYSTKIEGO (backup)
│  └─ 💾 PEŁNY BACKUP
│     └─ Eksportuj Wszystko (zielony)
│
├─ Chcę TYLKO STRUKTURĘ (bez zawodników)
│  └─ 📝 TYLKO STRUKTURA
│     └─ Edytor → Eksportuj Strukturę (zielony)
│
└─ Chcę TYLKO ZAWODNIKÓW (bez struktury)
   └─ 👥 TYLKO ZAWODNICY
      └─ Eksportuj Zawodników (niebieski)
```

---

## 📦 3 Typy Eksportu

### 1️⃣ 💾 Pełny Backup
```
┌─────────────────────────────────────┐
│ CO ZAWIERA:                         │
│ ✅ Struktura umiejętności           │
│ ✅ Wszyscy zawodnicy                │
│ ✅ Wszystkie oceny                  │
│                                     │
│ PLIK: kontrola-...-backup-...json   │
│ ROZMIAR: Duży                       │
└─────────────────────────────────────┘

KIEDY UŻYWAĆ:
✅ Backup całego systemu
✅ Przenoszenie na inny komputer
✅ Archiwizacja pełnego stanu
✅ "Chcę zachować WSZYSTKO"

PRZYCISK:
Główny ekran → 💾 Pełny Backup → Eksportuj Wszystko (zielony)
```

### 2️⃣ 📝 Tylko Struktura
```
┌─────────────────────────────────────┐
│ CO ZAWIERA:                         │
│ ✅ Struktura umiejętności           │
│ ❌ Zawodnicy                        │
│ ❌ Oceny                            │
│                                     │
│ PLIK: struktura-umiejetnosci-...    │
│ ROZMIAR: Mały                       │
└─────────────────────────────────────┘

KIEDY UŻYWAĆ:
✅ Współdzielenie struktury z trenerami
✅ Standaryzacja w klubie/organizacji
✅ "Chcę dać innym swoją strukturę"
✅ Backup tylko definicji kategorii

PRZYCISK:
Edytor Struktury → Eksportuj Strukturę (zielony)
```

### 3️⃣ 👥 Tylko Zawodnicy
```
┌─────────────────────────────────────┐
│ CO ZAWIERA:                         │
│ ❌ Struktura umiejętności           │
│ ✅ Zawodnicy (imiona, ID)           │
│ ✅ Oceny zawodników                 │
│                                     │
│ PLIK: zawodnicy-...json             │
│ ROZMIAR: Średni                     │
└─────────────────────────────────────┘

KIEDY UŻYWAĆ:
✅ Transfer zawodnika między klubami
✅ Backup przyrostowy (tylko zawodnicy)
✅ "Zawodnik zmienia klub"
✅ Współpraca z tym samym systemem

PRZYCISK:
Główny ekran → 👥 Tylko Zawodnicy → Eksportuj Zawodników (niebieski)
```

---

## 🔄 Kombinacje Import/Export

### Scenariusz 1: Nowy System (Start from Scratch)
```
KROK 1: Import struktury
📝 Edytor → Importuj Strukturę

KROK 2: Dodaj zawodników
OPCJA A: Ręcznie (przycisk "Dodaj Zawodnika")
OPCJA B: 👥 Importuj Zawodników

✅ System gotowy!
```

### Scenariusz 2: Pełny Backup i Restore
```
BACKUP:
💾 Eksportuj Wszystko

RESTORE (na nowym komputerze):
💾 Importuj Wszystko

✅ Wszystko przywrócone 1:1
```

### Scenariusz 3: Transfer Zawodnika
```
KLUB A (wysyła):
1. 📝 Eksportuj Strukturę → struktura-klub-a.json
2. 👥 Eksportuj Zawodników → jan-kowalski.json
3. 📧 Wyślij oba pliki

KLUB B (odbiera):
1. 📝 Importuj Strukturę → struktura-klub-a.json
2. 👥 Importuj Zawodników → jan-kowalski.json

✅ Zawodnik w Klubie B z pełnym profilem
```

### Scenariusz 4: Standaryzacja Klubowa
```
TRENER GŁÓWNY:
📝 Eksportuj Strukturę → standard-klubowy.json
📧 Wyślij wszystkim trenerom

KAŻDY TRENER:
📝 Importuj Strukturę → standard-klubowy.json
👥 Zachowuje swoich zawodników

✅ Wszyscy mają ten sam standard, różnych zawodników
```

### Scenariusz 5: Backup Przyrostowy
```
RAZ NA POCZĄTKU:
📝 Eksportuj Strukturę → struktura-v1.json

CO TYDZIEŃ:
👥 Eksportuj Zawodników → zawodnicy-2025-12-01.json
👥 Eksportuj Zawodników → zawodnicy-2025-12-08.json

RESTORE:
1. 📝 Import Struktury → struktura-v1.json
2. 👥 Import Zawodników → zawodnicy-2025-12-08.json

✅ Najnowszy stan odtworzony, mniejsze pliki
```

---

## ⚖️ Porównanie Szczegółowe

| Feature | 💾 Pełny Backup | 📝 Struktura | 👥 Zawodnicy |
|---------|----------------|--------------|--------------|
| **Struktura** | ✅ TAK | ✅ TAK | ❌ NIE |
| **Zawodnicy** | ✅ TAK | ❌ NIE | ✅ TAK |
| **Oceny** | ✅ TAK | ❌ NIE | ✅ TAK |
| **Import nadpisuje** | Wszystko | Strukturę | Nic (dodaje) |
| **Rozmiar pliku** | 🔴 Duży | 🟢 Mały | 🟡 Średni |
| **Przycisk (kolor)** | 🟢 Zielony | 🟢 Zielony | 🔵 Niebieski |
| **Lokalizacja** | Główny ekran | W edytorze | Główny ekran |
| **Cel** | Backup/Restore | Współdzielenie | Transfer |
| **Czerwone przy imporcie** | NIE | TAK* | TAK* |

_* Nowe umiejętności są czerwone (ocena 5)_

---

## 🎨 Wizualna Mapa Przycisków

```
GŁÓWNY EKRAN:
┌────────────────────────────────────────┐
│ [Edytuj Strukturę Umiejętności]       │ ← Fioletowy
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ 💾 Pełny Backup                        │
│ [Eksportuj Wszystko] 🟢                │
│ [Importuj Wszystko] 🟠                 │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ 👥 Tylko Zawodnicy                     │
│ [Eksportuj Zawodników] 🔵              │
│ [Importuj Zawodników] 🟣               │
└────────────────────────────────────────┘

W EDYTORZE STRUKTURY:
┌────────────────────────────────────────┐
│ [Eksportuj Strukturę] 🟢               │
│ [Importuj Strukturę] 🟠                │
│ [Zapisz zmiany] 🔵                     │
└────────────────────────────────────────┘
```

---

## ❓ FAQ - Który wybrać?

### "Chcę udostępnić mój system innemu trenerowi"
→ **📝 Struktura** + **👥 Zawodnicy** (2 pliki)

### "Robię backup przed aktualizacją"
→ **💾 Pełny Backup**

### "Zawodnik zmienia klub"
→ **👥 Zawodnicy** (1 zawodnik)

### "Chcę tylko swoją hierarchię dać kolegom"
→ **📝 Struktura**

### "Przenoszę się na nowy laptop"
→ **💾 Pełny Backup**

### "Standaryzuję system w klubie"
→ **📝 Struktura** (wszyscy trenerzy importują)

### "Backup co tydzień (lekki)"
→ **👥 Zawodnicy** (struktura zmienia się rzadko)

---

## 🚨 Częste Błędy

### ❌ Pomyłka 1: Import złego pliku
```
Problem: "Nieprawidłowy format pliku"
Przyczyna: Importujesz backup zamiast zawodników (lub odwrotnie)

Rozwiązanie:
- Pełny backup → Importuj Wszystko
- Zawodnicy → Importuj Zawodników  
- Struktura → Importuj Strukturę (w edytorze)
```

### ❌ Pomyłka 2: Niewłaściwa kolejność
```
Problem: Wszystko czerwone po imporcie zawodników
Przyczyna: Nie zaimportowałeś najpierw struktury

Poprawna kolejność:
1. NAJPIERW: Import struktury
2. POTEM: Import zawodników
```

### ❌ Pomyłka 3: Nadpisanie danych
```
Problem: "Straciłem zawodników!"
Przyczyna: Użyłeś "Importuj Wszystko" zamiast "Importuj Zawodników"

Zapobieganie:
- Pełny backup NADPISUJE wszystko
- Import zawodników DODAJE
- Zawsze rób backup przed importem pełnym!
```

---

## 💡 Najlepsze Praktyki

### ✅ Backup Strategy
```
Codziennie: Nic (localStorage zapisuje automatycznie)
Co tydzień: 👥 Eksportuj Zawodników
Co miesiąc: 💾 Pełny Backup
Po zmianach: 📝 Eksportuj Strukturę (gdy edytujesz)
```

### ✅ Współpraca
```
Nowy trener dołącza:
→ Wyślij: 📝 Strukturę (standard klubowy)

Transfer zawodnika:
→ Wyślij: 📝 Strukturę + 👥 Zawodnika
```

### ✅ Bezpieczeństwo
```
Przed aktualizacją: 💾 Pełny Backup
Przed importem: 💾 Pełny Backup
Testuj na próbnych: Użyj przykładowych plików
```

---

**🎯 Zapamiętaj:**
- **💾 Wszystko** = Pełen backup/restore
- **📝 Struktura** = Dla trenerów (współdzielenie)
- **👥 Zawodnicy** = Transfer między systemami

**📱 W razie wątpliwości: Zrób 💾 Pełny Backup!**
