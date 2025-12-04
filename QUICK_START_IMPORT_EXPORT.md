# 🎯 Szybki Start: Import/Export Struktury

## 📤 JAK UDOSTĘPNIĆ STRUKTURĘ INNYM TRENEROM

### Krok 1: Otwórz Edytor
```
[Lista Zawodników] 
    ↓
[Edytuj Strukturę Umiejętności (Trener)]
```

### Krok 2: Eksportuj
```
┌────────────────────────────────────────┐
│  Edytor Struktury Umiejętności         │
│                                        │
│  [Eksportuj Strukturę] ← KLIKNIJ TO   │
└────────────────────────────────────────┘
```

### Krok 3: Prześlij plik
- 📧 Email
- ☁️ Google Drive / Dropbox
- 💾 Pendrive
- 💬 Messenger / WhatsApp

---

## 📥 JAK WCZYTAĆ STRUKTURĘ OD INNEGO TRENERA

### Krok 1: Otrzymaj plik
```
struktura-umiejetnosci-2025-12-04.json
```

### Krok 2: Importuj
```
┌────────────────────────────────────────┐
│  Edytor Struktury Umiejętności         │
│                                        │
│  [Importuj Strukturę] ← KLIKNIJ TO    │
│  (wybierz plik JSON)                   │
└────────────────────────────────────────┘
```

### Krok 3: Potwierdź
```
┌─────────────────────────────────────────┐
│ ⚠️  Czy na pewno chcesz zaimportować?  │
│                                         │
│  Nowe umiejętności: CZERWONE (ocena 5) │
│                                         │
│       [Anuluj]     [OK]                │
└─────────────────────────────────────────┘
```

### Krok 4: Zapisz
```
[Zapisz zmiany] ← WAŻNE! Kliknij to!
```

---

## 🔴 CO OZNACZA CZERWONE PODŚWIETLENIE?

### W ankiecie zobaczysz:
```
┌─────────────────────────────────────────┐
│ 🔴 NOWA - WYMAGA OCENY                 │
│ ════════════════════════════════════════ │
│ #1.1 Nazwa nowej umiejętności          │
│                                         │
│ 1 [========●==========] 10    [5]      │
└─────────────────────────────────────────┘
     CZERWONE             CZERWONE
```

### Co to znaczy?
- ✅ To nowa umiejętność dodana do struktury
- ✅ Domyślna ocena to 5
- ✅ Musisz ją ocenić (lub zostawić 5)
- ✅ Po zapisaniu ankiety - czerwone znika

---

## ⚡ Najczęstsze pytania

### ❓ Czy stracę dotychczasowe oceny?
**NIE!** Wszystkie oceny są zachowane. Dodają się tylko NOWE umiejętności.

### ❓ Muszę ocenić wszystkie czerwone od razu?
**NIE!** Możesz je zostawić jako 5 i ocenić później.

### ❓ Jak pozbyć się czerwonego?
Wypełnij i zapisz ankietę - czerwone znika automatycznie.

### ❓ Co jeśli nie chcę nowych umiejętności?
Możesz je usunąć w edytorze struktury przed zapisaniem.

### ❓ Czy mogę cofnąć import?
TAK! Kliknij "Resetuj" w edytorze (przed zapisaniem).

---

## 🎬 Pełny przykład krok po kroku

### TRENER A (wysyła strukturę):
1. ✅ Edytor → Eksportuj Strukturę
2. ✅ Zapisuje plik: `struktura-pilka-nozna.json`
3. ✅ Wysyła mailem do Trenera B

### TRENER B (odbiera strukturę):
1. ✅ Pobiera plik z maila
2. ✅ Edytor → Importuj Strukturę
3. ✅ Wybiera plik `struktura-pilka-nozna.json`
4. ✅ Potwierdza import
5. ✅ Kliknij "Zapisz zmiany"
6. ✅ Otwiera profil zawodnika
7. ✅ Otwiera ankietę trenera
8. 👀 Widzi czerwone nowe umiejętności
9. ✅ Ocenia je (lub zostawia 5)
10. ✅ Zapisuje ankietę
11. ✅ Czerwone znika!

---

## 💾 Formaty plików - nie pomyl!

### ❌ BŁĄD - Wysłałeś cały backup:
```
kontrola-umiejetnosci-backup-2025-12-04.json
↓
Zawiera WSZYSTKO: zawodników + oceny + strukturę
(Za duży plik! Oceny innych zawodników!)
```

### ✅ DOBRZE - Wysłałeś tylko strukturę:
```
struktura-umiejetnosci-2025-12-04.json
↓
Zawiera TYLKO: strukturę kategorii
(Mały plik! Bez danych osobowych!)
```

---

## 🎯 Kiedy używać?

### ✅ Użyj EKSPORTU STRUKTURY gdy:
- Chcesz podzielić się swoim systemem oceny
- Pracujesz w zespole trenerskim
- Tworzysz standard klubowy
- Chcesz backup BEZ danych zawodników

### ✅ Użyj EKSPORTU DANYCH gdy:
- Robisz pełny backup systemu
- Przenosisz się na inny komputer
- Chcesz zachować wszystko (zawodnicy + oceny)

---

**📱 Pamiętaj:** Po imporcie struktury ZAWSZE kliknij "Zapisz zmiany"! 

**🔴 Czerwone = Nowe** (nie oznacza błędu!)
