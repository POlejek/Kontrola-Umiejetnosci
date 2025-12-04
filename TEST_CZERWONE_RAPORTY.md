# 🧪 Test: Czerwone Oznaczenia i Generator Raportów

## Cel testu
Sprawdzenie czy:
1. **WSZYSTKIE nieocenione umiejętności** są czerwone w ankietach
2. **Generator raportów** działa poprawnie i tworzy ładny raport

---

## Test 1: Czerwone oznaczenia dla nieocenionych ✅

### Scenariusz A: Nowy zawodnik (wszystko nieocenione)

**Kroki:**
1. Otwórz aplikację: https://polejek.github.io/Kontrola-Umiejetnosci/
2. Dodaj nowego zawodnika: **"Test Czerwone"**
3. Otwórz jego profil
4. Kliknij **"Rozpocznij Ankietę Zawodnika"**

**Oczekiwany rezultat:**
- ✅ **WSZYSTKIE pytania** mają czerwone tło
- ✅ **WSZYSTKIE pytania** mają czerwoną ramkę
- ✅ **WSZYSTKIE pytania** mają badge "🔴 NOWA - WYMAGA OCENY"
- ✅ **WSZYSTKIE suwaki** są czerwone (nie niebieskie)

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz B: Częściowo oceniony zawodnik

**Kroki:**
1. W ankiecie z poprzedniego scenariusza oceń tylko **5 pierwszych pytań**
2. Kliknij **"Zapisz Ankietę"**
3. Wróć i ponownie kliknij **"Rozpocznij Ankietę Zawodnika"**

**Oczekiwany rezultat:**
- ✅ **Pierwsze 5 pytań** - niebieskie (ocenione)
- ✅ **Pozostałe pytania** - czerwone (nieocenione)
- ✅ Mix kolorów: niebieskie i czerwone w jednej ankiecie
- ✅ Badge "🔴 NOWA" tylko przy czerwonych

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz C: Różne typy ankiet

**Kroki:**
1. Oceń wszystkie pytania w **ankiecie zawodnika** (wszystkie niebieskie)
2. Kliknij **"Rozpocznij Ankietę Trenera"**

**Oczekiwany rezultat:**
- ✅ W ankiecie trenera **WSZYSTKIE pytania** są znowu czerwone
- ✅ Każdy typ ankiety (zawodnik/trener/zespół) ma osobne czerwone oznaczenia
- ✅ Wypełnienie ankiety zawodnika NIE wpływa na kolor w ankiecie trenera

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## Test 2: Generator Raportów 📊

### Scenariusz A: Przycisk "Pobierz raport"

**Kroki:**
1. Otwórz profil dowolnego zawodnika
2. Sprawdź nagłówek (pod imieniem i nazwiskiem)

**Oczekiwany rezultat:**
- ✅ Widoczny przycisk **"Pobierz Raport"**
- ✅ Przycisk ma gradient fioletowo-niebieski
- ✅ Przycisk ma ikonę pobierania (⬇️)
- ✅ Obok jest przycisk "Wróć do Listy Zawodników"

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz B: Generowanie raportu

**Kroki:**
1. Kliknij **"Pobierz Raport"**

**Oczekiwany rezultat:**
- ✅ Otwiera się **nowe okno** (nowa karta przeglądarki)
- ✅ W nowym oknie wyświetla się raport HTML
- ✅ Raport się ładuje w ciągu 1-2 sekund

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz C: Zawartość raportu - Nagłówek

**Kroki:**
1. W oknie raportu sprawdź górną część

**Oczekiwany rezultat:**
- ✅ Gradient background (fiolet-niebieski)
- ✅ Tytuł: **"📊 Raport Zawodnika"**
- ✅ Imię i nazwisko zawodnika
- ✅ Data i godzina wygenerowania (aktualna)

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz D: Karty statystyk

**Kroki:**
1. Przewiń trochę w dół (zaraz pod nagłówkiem)

**Oczekiwany rezultat:**
- ✅ Trzy karty obok siebie:
  - **Ocena Zawodnika** (niebieski pasek u góry)
  - **Ocena Trenera** (zielony pasek u góry)
  - **Ocena Zespołowa** (pomarańczowy pasek u góry)
- ✅ Na każdej karcie:
  - Duża liczba (średnia ocen) lub "Brak"
  - Liczba ocenionych / łączna liczba umiejętności
- ✅ Karty mają białe tło i cienie

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz E: Tabele umiejętności

**Kroki:**
1. Przewiń dalej w dół

**Oczekiwany rezultat:**
- ✅ Dla każdej sekcji (MENTAL, Taktyczne, itp.):
  - **Fioletowy nagłówek** sekcji
  - **Tabela** z kolumnami: Umiejętność | Zawodnik | Trener | Zespół
  - **Kolorowe oceny:**
    - Czerwone "—" dla nieocenionych
    - Żółte (1-4) dla niskich
    - Niebieskie (5-7) dla średnich
    - Zielone (8-10) dla wysokich
- ✅ Każda umiejętność w osobnym wierszu
- ✅ Czytelne czcionki i odstępy

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz F: Stopka

**Kroki:**
1. Przewiń do samego dołu raportu

**Oczekiwany rezultat:**
- ✅ Jasnoszare tło stopki
- ✅ Tekst: **"System Kontroli Umiejętności • Raport wygenerowany automatycznie"**
- ✅ Podpowiedź o nieocenionych umiejętnościach

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz G: Zapis do PDF

**Kroki:**
1. W oknie raportu naciśnij **Ctrl+P** (Windows/Linux) lub **Cmd+P** (Mac)
2. W oknie drukowania wybierz **"Zapisz jako PDF"**
3. Zapisz plik na dysku
4. Otwórz zapisany PDF

**Oczekiwany rezultat:**
- ✅ Okno drukowania się otwiera
- ✅ Podgląd wygląda dobrze (zachowane kolory i układ)
- ✅ Plik PDF zapisuje się poprawnie
- ✅ Otwarcie PDF pokazuje cały raport z kolorami

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## Test 3: Raport z różnymi danymi 📈

### Scenariusz A: Zawodnik z pełnymi ocenami

**Przygotowanie:**
1. Stwórz zawodnika **"Jan Pełny"**
2. Wypełnij WSZYSTKIE ankiety (zawodnik, trener, zespół x3)
3. Oceń WSZYSTKIE umiejętności

**Kroki:**
1. Wygeneruj raport

**Oczekiwany rezultat:**
- ✅ Karty statystyk pokazują rzeczywiste średnie (np. 7.2, 6.8, 7.5)
- ✅ Wszystkie karty mają licznik "24 / 24" (lub inna liczba = pełne)
- ✅ W tabelach **brak czerwonych "—"** (wszystko ocenione)
- ✅ Mix kolorów: żółte, niebieskie, zielone (różne oceny)

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz B: Zawodnik bez żadnych ocen

**Przygotowanie:**
1. Stwórz zawodnika **"Anna Pusta"**
2. NIE wypełniaj żadnych ankiet

**Kroki:**
1. Wygeneruj raport

**Oczekiwany rezultat:**
- ✅ Karty statystyk pokazują **"Brak"** zamiast liczb
- ✅ Liczniki: "0 / 24" (lub inna liczba)
- ✅ W tabelach **WSZYSTKIE oceny czerwone "—"**
- ✅ Brak kolorów żółty/niebieski/zielony

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz C: Zawodnik z mieszanymi ocenami

**Przygotowanie:**
1. Stwórz zawodnika **"Piotr Mix"**
2. Oceń:
   - 10 umiejętności na 1-4 (niskie)
   - 8 umiejętności na 5-7 (średnie)
   - 6 umiejętności na 8-10 (wysokie)
   - Pozostałe zostaw nieocenione

**Kroki:**
1. Wygeneruj raport

**Oczekiwany rezultat:**
- ✅ W tabelach **kolorowy mix:**
  - Czerwone "—" (nieocenione)
  - Żółte liczby (1-4)
  - Niebieskie liczby (5-7)
  - Zielone liczby (8-10)
- ✅ Średnia w kartach uwzględnia tylko ocenione
- ✅ Licznik pokazuje np. "24 / 30" (częściowo wypełnione)

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## Test 4: Responsywność i Wygląd 🎨

### Scenariusz A: Desktop

**Kroki:**
1. Otwórz raport na normalnym ekranie (laptop/desktop)
2. Zmień rozmiar okna (przeciągnij za krawędź)

**Oczekiwany rezultat:**
- ✅ Raport ma **maksymalną szerokość** około 1200px
- ✅ Jest **wycentrowany** na ekranie
- ✅ Ma **białe marginesy** po bokach
- ✅ Przy zmniejszaniu okna elementy się dostosowują

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz B: Mobile (opcjonalnie)

**Kroki:**
1. Otwórz raport na telefonie lub zmniejsz okno do rozmiaru telefonu

**Oczekiwany rezultat:**
- ✅ Tabele są przewijalne poziomo (jeśli za szerokie)
- ✅ Karty statystyk układają się **pionowo** (jedna pod drugą)
- ✅ Tekst jest czytelny (nie za mały)

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

### Scenariusz C: Kolory i Gradienty

**Kroki:**
1. Sprawdź wizualnie cały raport

**Oczekiwany rezultat:**
- ✅ **Nagłówek:** Gradient fiolet → niebieski
- ✅ **Karty statystyk:** Białe z kolorowym topem
- ✅ **Tytuły sekcji:** Gradient fiolet → niebieski
- ✅ **Tabele:** Gradient w nagłówkach, białe wiersze
- ✅ **Wszystko czytelne** (dobry kontrast tekstu)

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## 📊 Podsumowanie Testów

### Czerwone Oznaczenia
- [ ] Scenariusz A: Nowy zawodnik
- [ ] Scenariusz B: Częściowo oceniony
- [ ] Scenariusz C: Różne typy ankiet

**Ocena:** ☐ Wszystkie zaliczone ☐ Wymagane poprawki

---

### Generator Raportów
- [ ] Scenariusz A: Przycisk
- [ ] Scenariusz B: Generowanie
- [ ] Scenariusz C: Nagłówek
- [ ] Scenariusz D: Karty statystyk
- [ ] Scenariusz E: Tabele
- [ ] Scenariusz F: Stopka
- [ ] Scenariusz G: Zapis PDF

**Ocena:** ☐ Wszystkie zaliczone ☐ Wymagane poprawki

---

### Różne Dane
- [ ] Scenariusz A: Pełne oceny
- [ ] Scenariusz B: Brak ocen
- [ ] Scenariusz C: Mix ocen

**Ocena:** ☐ Wszystkie zaliczone ☐ Wymagane poprawki

---

### Responsywność
- [ ] Scenariusz A: Desktop
- [ ] Scenariusz B: Mobile (opcjonalnie)
- [ ] Scenariusz C: Kolory

**Ocena:** ☐ Wszystkie zaliczone ☐ Wymagane poprawki

---

## 🐛 Znalezione Błędy

### Błąd #1:
- **Opis:**
- **Kroki reprodukcji:**
- **Priorytet:** ☐ Wysoki ☐ Średni ☐ Niski

### Błąd #2:
- **Opis:**
- **Kroki reprodukcji:**
- **Priorytet:** ☐ Wysoki ☐ Średni ☐ Niski

---

**Data testu:** ___________  
**Tester:** ___________  
**Wersja aplikacji:** 2.5  
**Funkcje testowane:** Czerwone oznaczenia + Generator raportów
