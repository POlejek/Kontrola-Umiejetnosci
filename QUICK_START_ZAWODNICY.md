# ⚡ Szybki Start: Import/Export Zawodników

## 📤 EKSPORT ZAWODNIKÓW (bez struktury)

### Kiedy używać?
- ✅ Chcesz przenieść zawodnika do innego systemu
- ✅ Backup zawodników (bez struktury)
- ✅ Współpraca między klubami

### Jak?
```
┌─────────────────────────────────────┐
│ 👥 Tylko Zawodnicy (bez struktury)  │
│                                     │
│ [Eksportuj Zawodników] ← KLIKNIJ   │
└─────────────────────────────────────┘
```

### Plik:
```
zawodnicy-2025-12-04.json
```

---

## 📥 IMPORT ZAWODNIKÓW

### ⚠️ WAŻNE - Przeczytaj przed importem!

Import zawodników:
- ✅ **DODAJE** zawodników (nie usuwa starych)
- ✅ Używa **AKTUALNEJ struktury** (z Twojego systemu)
- ✅ Zachowuje oceny (tam gdzie ID się zgadza)
- 🔴 **Nowe umiejętności → CZERWONE (ocena 5)**

### Kroki:

#### 1️⃣ Przygotuj strukturę
```
Najpierw zaimportuj strukturę jeśli potrzeba!
→ Edytor → [Importuj Strukturę]
```

#### 2️⃣ Importuj zawodników
```
┌─────────────────────────────────────┐
│ 👥 Tylko Zawodnicy (bez struktury)  │
│                                     │
│ [Importuj Zawodników] ← KLIKNIJ    │
│ (wybierz plik zawodnicy-....json)   │
└─────────────────────────────────────┘
```

#### 3️⃣ Potwierdź
```
┌──────────────────────────────────────┐
│ Importować 3 zawodników?             │
│                                      │
│ Zawodnicy otrzymają AKTUALNĄ         │
│ strukturę umiejętności.              │
│                                      │
│ Nowe umiejętności: CZERWONE (5)      │
│                                      │
│      [Anuluj]    [OK]               │
└──────────────────────────────────────┘
```

#### 4️⃣ Oceń czerwone
```
Otwórz profil → Ankieta → Czerwone pytania
                                ↓
                         Oceń i zapisz
                                ↓
                        Czerwone znika! ✅
```

---

## 🔄 Transfer zawodnika między klubami

### **KLUB A** (wysyła):
```
1. [Eksportuj Zawodników]
2. Plik: zawodnicy-klub-a.json
3. 📧 Wyślij do Klubu B
```

### **KLUB B** (odbiera):
```
1. Jeśli Klub B ma inną strukturę:
   → Najpierw [Import struktury Klubu B]
   
2. [Importuj Zawodników]
   → Wybierz zawodnicy-klub-a.json
   
3. Efekt:
   ✅ Zawodnik ma strukturę Klubu B
   ✅ Oceny z Klubu A (tam gdzie ID pasują)
   🔴 Nowe umiejętności Klubu B: czerwone (5)
   
4. Oceń czerwone pytania
   → Gotowe! Pełny profil ✅
```

---

## 🎯 3 Główne Scenariusze

### 1️⃣ **Identyczne struktury** (łatwy)
```
Klub A i Klub B: ta sama struktura
         ↓
Export zawodnika → Import zawodnika
         ↓
✅ Wszystkie oceny zachowane
❌ Nic czerwonego
```

### 2️⃣ **Częściowo różne struktury** (normalny)
```
Klub A: 50 umiejętności
Klub B: 60 umiejętności (10 nowych)
         ↓
Export z A → Import do B
         ↓
✅ 50 ocen zachowanych
🔴 10 nowych czerwonych (ocena 5)
```

### 3️⃣ **Kompletnie różne struktury** (trudny)
```
Klub A: piłka nożna
Klub B: koszykówka
         ↓
Export z A → Import do B
         ↓
🔴 Prawie wszystko czerwone
⚠️  Musisz ocenić ręcznie
```

---

## 💾 Porównanie eksportów

| Co eksportować? | Pełny Backup | Tylko Struktura | Tylko Zawodnicy |
|----------------|-------------|-----------------|----------------|
| **Przycisk** | 💾 Zielony | 📝 Zielony (edytor) | 👥 Niebieski |
| **Plik** | `backup-...` | `struktura-...` | `zawodnicy-...` |
| **Struktura** | ✅ | ✅ | ❌ |
| **Zawodnicy** | ✅ | ❌ | ✅ |
| **Oceny** | ✅ | ❌ | ✅ |
| **Kiedy?** | Pełny backup | Współdzielenie struktury | Transfer zawodników |

---

## 🔴 Co oznacza czerwone?

### W ankiecie zobaczysz:
```
┌─────────────────────────────────────┐
│ 🔴 NOWA - WYMAGA OCENY             │
│ ════════════════════════════════════ │
│ #2.5 Odporność mentalna             │
│                                     │
│ 1 [========●==========] 10    [5]  │
└─────────────────────────────────────┘
```

### Co to znaczy?
- ✅ Ta umiejętność **nie była** w starym systemie
- ✅ System dodał ją z domyślną oceną **5**
- ✅ Musisz ją ocenić (lub zostawić 5)
- ✅ Po zapisaniu ankiety → **czerwone znika**

---

## ⚠️ Najczęstsze błędy

### ❌ "Nieprawidłowy format pliku"
**Problem:** Importujesz pełny backup zamiast zawodników  
**Rozwiązanie:** Użyj pliku `zawodnicy-....json` nie `backup-...json`

### ❌ Zawodnik pojawił się 2 razy
**Problem:** Zaimportowałeś tego samego zawodnika ponownie  
**Rozwiązanie:** Usuń duplikat (przycisk 🗑️)

### ❌ Wszystko czerwone po imporcie
**Problem:** Struktury są kompletnie różne  
**Rozwiązanie:** 
1. Najpierw zaimportuj właściwą strukturę
2. Potem importuj zawodników
3. Jeśli to nie pomaga → oceń ręcznie

### ❌ Oceny zniknęły
**Problem:** ID umiejętności się zmieniły między strukturami  
**To normalne** gdy struktury są różne. System nie może dopasować.

---

## ✅ Checklist przed importem

- [ ] Mam plik `zawodnicy-YYYY-MM-DD.json`
- [ ] Mam zaimportowaną właściwą strukturę
- [ ] Zrobiłem backup aktualnych danych (na wszelki wypadek)
- [ ] Wiem że zawodnicy zostaną DODANI (nie nadpiszą)
- [ ] Jestem gotowy ocenić czerwone pytania

---

## 🚀 Gotowy? Start!

### Eksport:
```
[Eksportuj Zawodników] → Zapisz plik → Wyślij
```

### Import:
```
Otrzymaj plik → [Importuj Zawodników] → Potwierdź → Oceń czerwone
```

---

**📱 Pamiętaj:**
- 🔴 Czerwone = Nowa umiejętność (nie błąd!)
- 📤 Export zawodników ≠ Export struktury
- ➕ Import DODAJE zawodników (nie nadpisuje)
- 🎯 Najpierw struktura, potem zawodnicy

**🎬 Testuj na próbnych danych przed produkcją!**
