# 🧪 Test Wykrywania Duplikatów

## Cel testu
Sprawdzenie czy system poprawnie wykrywa i obsługuje duplikaty zawodników podczas importu i ręcznego tworzenia.

---

## 📋 Przygotowanie

1. **Otwórz aplikację**: https://polejek.github.io/Kontrola-Umiejetnosci/
2. **Upewnij się że masz domyślną strukturę umiejętności** (Mental, Technical, Tactical, Physical)
3. **Przygotuj plik testowy**: `test-duplikaty-zawodnicy.json` (dostępny w repozytorium)

---

## Test 1: Blokada przy ręcznym tworzeniu 🚫

### Kroki:
1. Dodaj zawodnika ręcznie: **"Jan Kowalski"**
2. Spróbuj dodać ponownie: **"Jan Kowalski"** (dokładnie tak samo)
3. Spróbuj dodać: **"jan kowalski"** (małe litery)
4. Spróbuj dodać: **"JAN KOWALSKI"** (wielkie litery)
5. Spróbuj dodać: **" Jan Kowalski "** (ze spacjami)

### Oczekiwany rezultat:
- ❌ Każda próba 2-5 powinna wyświetlić alert:
  ```
  ⚠️ Zawodnik o imieniu i nazwisku "[Nazwa]" już istnieje!
  ```
- ✅ Zawodnik **NIE zostaje dodany**
- ✅ Lista zawodników ma tylko **1 Jana Kowalskiego**

### Status: ☐ Zaliczony ☐ Niezaliczony

---

## Test 2: Import bez duplikatów ✅

### Kroki:
1. **Usuń wszystkich zawodników** (jeśli masz jakichś)
2. Kliknij **"Import zawodników"**
3. Wybierz plik: `test-duplikaty-zawodnicy.json`
4. Wybierz tryb: **DODAJ**
5. Potwierdź

### Oczekiwany rezultat:
- ✅ Import przechodzi **bez modalu duplikatów**
- ✅ Dodani zostają wszyscy 3 zawodnicy:
  - Jan Kowalski
  - Anna Nowak
  - Piotr Wiśniewski
- ✅ Alert potwierdzający: "Dodano 3 zawodników!"

### Status: ☐ Zaliczony ☐ Niezaliczony

---

## Test 3: Import z duplikatami w trybie DODAJ 🔄

### Przygotowanie:
1. Upewnij się że masz 3 zawodników z poprzedniego testu
2. **Usuń Piotra Wiśniewskiego** (zostają Jan i Anna)

### Kroki:
1. Kliknij **"Import zawodników"**
2. Wybierz plik: `test-duplikaty-zawodnicy.json`
3. Wybierz tryb: **DODAJ**
4. Potwierdź

### Oczekiwany rezultat - Modal:
```
┌───────────────────────────────────────────────┐
│ ⚠️ Znaleziono duplikaty                      │
│ Poniżsi zawodnicy już istnieją...            │
├───────────────────────────────────────────────┤
│ Tabela z duplikatami:                        │
│                                              │
│ Jan Kowalski:                                │
│   Obecny | Importowany                       │
│   (data) | (data)                            │
│   Ocen   | Ocen                              │
│   ● Zachowaj | ○ Zastąp                      │
│                                              │
│ Anna Nowak:                                  │
│   Obecny | Importowany                       │
│   (data) | (data)                            │
│   Ocen   | Ocen                              │
│   ● Zachowaj | ○ Zastąp                      │
└───────────────────────────────────────────────┘
```

- ✅ Modal pojawia się
- ✅ Wyświetlone są **dokładnie 2 duplikaty** (Jan, Anna)
- ✅ **Domyślnie zaznaczone** "Zachowaj obecnego" dla obu
- ✅ Widoczne daty utworzenia i liczba ocen
- ✅ Przyciski: "Anuluj import" i "Zastosuj wybory i kontynuuj"

### Status: ☐ Zaliczony ☐ Niezaliczony

---

## Test 4: Zachowanie obecnych zawodników ✅

### Kontynuacja Test 3:
1. W modalu **zostaw domyślne** "Zachowaj obecnego" dla obu
2. Kliknij **"Zastosuj wybory i kontynuuj"**

### Oczekiwany rezultat:
- ✅ Modal znika
- ✅ Alert podsumowujący:
  ```
  ✅ Import zakończony!
  
  Duplikaty rozwiązane: 2
  - Zachowane: 2
  - Zastąpione: 0
  
  Nowi zawodnicy dodani: 1
  Łącznie zawodników: 3
  ```
- ✅ Lista zawodników:
  - Jan Kowalski (STARY - z poprzedniego importu)
  - Anna Nowak (STARA - z poprzedniego importu)
  - Piotr Wiśniewski (NOWY - dodany z importu)
- ✅ Oceny Jana i Anny **NIE zostały nadpisane**

### Weryfikacja ocen:
1. Otwórz profil **Jana Kowalskiego**
2. Sprawdź oceny - **powinny być takie jak przed importem**

### Status: ☐ Zaliczony ☐ Niezaliczony

---

## Test 5: Zastąpienie importowanymi 🔄

### Przygotowanie:
1. Usuń **Piotra Wiśniewskiego**
2. **Zmodyfikuj ocenę** Jana Kowalskiego (np. zmień Mental → Zaangażowanie na 10)

### Kroki:
1. Kliknij **"Import zawodników"**
2. Wybierz plik: `test-duplikaty-zawodnicy.json`
3. Wybierz tryb: **DODAJ**
4. Potwierdź
5. W modalu duplikatów:
   - **Jan Kowalski** → zaznacz **"Zastąp importowanym"**
   - **Anna Nowak** → zostaw **"Zachowaj obecnego"**
6. Kliknij **"Zastosuj wybory i kontynuuj"**

### Oczekiwany rezultat:
- ✅ Alert podsumowujący:
  ```
  ✅ Import zakończony!
  
  Duplikaty rozwiązane: 2
  - Zachowane: 1
  - Zastąpione: 1
  
  Nowi zawodnicy dodani: 1
  Łącznie zawodników: 3
  ```
- ✅ Lista zawodników:
  - Jan Kowalski (NOWY - zastąpiony)
  - Anna Nowak (STARA - zachowana)
  - Piotr Wiśniewski (NOWY - dodany)

### Weryfikacja:
1. Otwórz profil **Jana Kowalskiego**
2. Sprawdź oceny - **powinny być z pliku importu** (np. Mental → Zaangażowanie: 8, nie 10)
3. Otwórz profil **Anny Nowak**
4. Sprawdź oceny - **powinny być stare** (niezmodyfikowane)

### Status: ☐ Zaliczony ☐ Niezaliczony

---

## Test 6: Anulowanie importu ❌

### Kroki:
1. **Zapamiętaj** aktualną liczbę zawodników
2. Kliknij **"Import zawodników"**
3. Wybierz plik: `test-duplikaty-zawodnicy.json`
4. Wybierz tryb: **DODAJ**
5. Potwierdź
6. W modalu duplikatów kliknij **"Anuluj import"**

### Oczekiwany rezultat:
- ✅ Modal znika
- ✅ **NIE pojawia się żaden alert**
- ✅ Lista zawodników **nie zmienia się** (ta sama liczba i nazwy)
- ✅ Oceny zawodników **nie zostały zmodyfikowane**

### Status: ☐ Zaliczony ☐ Niezaliczony

---

## Test 7: Tryb NADPISZ (bez wykrywania duplikatów) 🔄

### Przygotowanie:
1. Upewnij się że masz kilku zawodników (np. Jan, Anna, Piotr)
2. Zapamiętaj ich oceny

### Kroki:
1. Kliknij **"Import zawodników"**
2. Wybierz plik: `test-duplikaty-zawodnicy.json`
3. Wybierz tryb: **NADPISZ** (Anuluj w pierwszym oknie)
4. Potwierdź **drugie okno ostrzegawcze**

### Oczekiwany rezultat:
- ❌ **Modal duplikatów NIE pojawia się**
- ✅ Wszyscy poprzedni zawodnicy zostają **USUNIĘCI**
- ✅ Lista zawodników:
  - Jan Kowalski (z pliku)
  - Anna Nowak (z pliku)
  - Piotr Wiśniewski (z pliku)
- ✅ Oceny są **z pliku importu** (nie ma starych ocen)

### Status: ☐ Zaliczony ☐ Niezaliczony

---

## Test 8: Case-insensitive matching 🔤

### Kroki:
1. Usuń wszystkich zawodników
2. Dodaj ręcznie: **"Jan Kowalski"**
3. Spróbuj importować plik gdzie zawodnik ma nazwę:
   - Modyfikuj plik tymczasowo: zmień "Jan Kowalski" na **"jan kowalski"**
4. Importuj z trybem **DODAJ**

### Oczekiwany rezultat:
- ✅ **Modal duplikatów pojawia się**
- ✅ "jan kowalski" z pliku jest wykryty jako duplikat "Jan Kowalski"
- ✅ Można wybrać którą wersję zachować

### Status: ☐ Zaliczony ☐ Niezaliczony

---

## 📊 Podsumowanie testów

### Wyniki:
- [ ] Test 1: Blokada ręcznego tworzenia
- [ ] Test 2: Import bez duplikatów
- [ ] Test 3: Modal duplikatów pojawia się
- [ ] Test 4: Zachowanie obecnych zawodników
- [ ] Test 5: Zastąpienie importowanymi
- [ ] Test 6: Anulowanie importu
- [ ] Test 7: Tryb NADPISZ
- [ ] Test 8: Case-insensitive

### Ocena końcowa:
- ✅ **Wszystkie testy zaliczone** - system działa poprawnie
- ⚠️ **Część testów niezaliczona** - wymagane poprawki
- ❌ **Większość testów niezaliczona** - poważne problemy

---

## 🐛 Znalezione błędy

### Błąd #1:
- **Opis:**
- **Kroki reprodukcji:**
- **Oczekiwany rezultat:**
- **Faktyczny rezultat:**

### Błąd #2:
- **Opis:**
- **Kroki reprodukcji:**
- **Oczekiwany rezultat:**
- **Faktyczny rezultat:**

---

**Data testu:** ___________  
**Tester:** ___________  
**Wersja aplikacji:** 2.4
