# 🧪 Test: Hierarchia w Raporcie (Sekcje i Podsekcje)

## Cel testu
Sprawdzenie czy raport poprawnie wyświetla:
1. **Sekcje główne** ze średnimi ocenami
2. **Podsekcje** (jeśli istnieją) ze średnimi ocenami
3. **Hierarchiczną strukturę** z właściwymi kolorami

---

## Test 1: Raport z prostą strukturą (tylko sekcje) ✅

### Scenariusz: Zawodnik z domyślną strukturą

**Struktura testowa:**
```
- MENTAL (sekcja główna)
  - Zaangażowanie (umiejętność)
  - Koncentracja (umiejętność)
  - Pewność siebie (umiejętność)
- Taktyczne (sekcja główna)
  - Atak (umiejętność)
  - Obrona (umiejętność)
```

**Kroki:**
1. Dodaj zawodnika z domyślną strukturą (MENTAL, Taktyczne, etc.)
2. Oceń kilka umiejętności:
   - MENTAL: Zaangażowanie=8, Koncentracja=7, Pewność=9
   - Pozostałe: zostaw nieocenione
3. Wygeneruj raport

**Oczekiwany rezultat:**
- ✅ **Sekcja MENTAL:**
  - Tytuł: "MENTAL"
  - Gradient: fioletowo-niebieski
  - **Średnia po prawej:** "Średnia: Z=8.00 | T=— | Zesp=—"
    - (8+7+9)/3 = 8.00 dla zawodnika
  - Tabela z 3 umiejętnościami bezpośrednio pod tytułem
- ✅ **Sekcja Taktyczne:**
  - Tytuł: "Taktyczne"
  - **Średnia:** "Średnia: Z=— | T=— | Zesp=—" (nic nie ocenione)
  - Tabela z umiejętnościami (wszystkie czerwone "—")

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## Test 2: Raport z hierarchią (sekcje + podsekcje) 📊

### Scenariusz: Zawodnik ze strukturą Taktyczno/Techniczne

**Struktura testowa:**
```
- Taktyczno/Techniczne (sekcja główna)
  - Atakowanie (podsekcja)
    - Ochrona piłki (umiejętność)
    - Prowadzenie piłki (umiejętność)
    - Przyjęcie (umiejętność)
  - Obrona (podsekcja)
    - Pressing (umiejętność)
    - Wybijanie (umiejętność)
```

**Kroki:**
1. Użyj zawodnika z domyślną strukturą (ma Taktyczno/Techniczne z podsekcjami)
2. Oceń wybrane umiejętności:
   - **Atakowanie:** Ochrona=9, Prowadzenie=8, Przyjęcie=7
   - **Obrona:** Pressing=6, Wybijanie=5
3. Wygeneruj raport

**Oczekiwany rezultat:**

✅ **Sekcja główna: Taktyczno/Techniczne**
- Tytuł: "Taktyczno/Techniczne"
- Gradient: fioletowo-niebieski (główna sekcja)
- **Średnia:** "Średnia: Z=7.00 | T=— | Zesp=—"
  - (9+8+7+6+5)/5 = 7.00 (średnia ze WSZYSTKICH umiejętności w sekcji)

✅ **Podsekcja 1: Atakowanie**
- Tytuł: "Atakowanie" (wcięty pod główną sekcją)
- Gradient: fioletowo-różowy (podsekcja - inny kolor!)
- **Średnia:** "Średnia: Z=8.00 | T=— | Zesp=—"
  - (9+8+7)/3 = 8.00 (średnia TYLKO z Atakowania)
- **Tabela** z 3 umiejętnościami (Ochrona=9, Prowadzenie=8, Przyjęcie=7)

✅ **Podsekcja 2: Obrona**
- Tytuł: "Obrona"
- Gradient: fioletowo-różowy
- **Średnia:** "Średnia: Z=5.50 | T=— | Zesp=—"
  - (6+5)/2 = 5.50 (średnia TYLKO z Obrony)
- **Tabela** z 2 umiejętnościami (Pressing=6, Wybijanie=5)

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## Test 3: Obliczanie średnich dla różnych typów ocen 🎯

### Scenariusz: Pełne oceny we wszystkich typach

**Kroki:**
1. Użyj tego samego zawodnika z poprzedniego testu
2. Wypełnij **wszystkie typy ankiet** dla Atakowania:
   - **Zawodnik:** Ochrona=9, Prowadzenie=8, Przyjęcie=7
   - **Trener:** Ochrona=7, Prowadzenie=8, Przyjęcie=9
   - **Zespół (3 ankiety):** 
     - Ankieta 1: Ochrona=8, Prowadzenie=7, Przyjęcie=8
     - Ankieta 2: Ochrona=9, Prowadzenie=8, Przyjęcie=7
     - Ankieta 3: Ochrona=7, Prowadzenie=9, Przyjęcie=8
3. Wygeneruj raport

**Oczekiwany rezultat:**

✅ **Podsekcja Atakowanie:**
- **Średnia Zawodnika:** Z=8.00 (9+8+7)/3
- **Średnia Trenera:** T=8.00 (7+8+9)/3
- **Średnia Zespołowa:** Zesp=7.89 
  - Ostatnia ankieta zespołowa: (7+9+8)/3 = 8.00
  - (lub średnia ze wszystkich jeśli system tak działa)
- **Format:** "Średnia: Z=8.00 | T=8.00 | Zesp=7.89"

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## Test 4: Średnie z częściowo ocenionymi umiejętnościami 🔢

### Scenariusz: Mix ocenionych i nieocenionych

**Kroki:**
1. Sekcja MENTAL: oceń tylko 2 z 6 umiejętności
   - Zaangażowanie (zawodnik=8, trener=7)
   - Koncentracja (zawodnik=6, trener=—)
   - Pozostałe 4: nieocenione
2. Wygeneruj raport

**Oczekiwany rezultat:**

✅ **Sekcja MENTAL:**
- **Średnia Zawodnika:** Z=7.00
  - (8+6)/2 = 7.00 (uwzględnia tylko ocenione)
- **Średnia Trenera:** T=7.00
  - 7/1 = 7.00 (tylko 1 ocena trenera)
- **Średnia Zespołowa:** Zesp=—
  - Brak ocen zespołowych
- **Format:** "Średnia: Z=7.00 | T=7.00 | Zesp=—"

✅ **W tabeli:**
- Zaangażowanie: 8 (zielone) | 7 (niebieskie) | — (czerwone)
- Koncentracja: 6 (niebieskie) | — (czerwone) | — (czerwone)
- Pozostałe: — | — | — (wszystkie czerwone)

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## Test 5: Kolorowanie nagłówków 🎨

### Scenariusz: Wizualna weryfikacja kolorów

**Kroki:**
1. Wygeneruj raport dla dowolnego zawodnika
2. Sprawdź kolory nagłówków wizualnie

**Oczekiwany rezultat:**

✅ **Sekcje główne** (np. MENTAL, Taktyczne):
- **Kolor tła:** Gradient od fioletu do niebieskiego
- **Wielkość czcionki:** Większa (1.3em)
- **Padding:** Więcej przestrzeni (15px 25px)
- **Cień:** Fioletowy cień pod nagłówkiem

✅ **Podsekcje** (np. Atakowanie, Obrona):
- **Kolor tła:** Gradient od fioletu do różowego (inny niż główne!)
- **Wielkość czcionki:** Mniejsza niż główne (1.1em)
- **Padding:** Mniej przestrzeni (12px 20px)
- **Cień:** Różowy cień pod nagłówkiem

✅ **Wizualna hierarchia:**
- Łatwo odróżnić sekcje główne od podsekcji
- Podsekcje wyglądają jak "dzieci" sekcji głównych
- Średnie są czytelne po prawej stronie nagłówków

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## Test 6: Struktura bez podsekcji vs z podsekcjami 📐

### Scenariusz A: Sekcja BEZ podsekcji

**Struktura:**
```
- MENTAL (sekcja główna)
  - Zaangażowanie (bezpośrednio umiejętność)
  - Koncentracja (bezpośrednio umiejętność)
```

**Oczekiwany rezultat:**
- ✅ Nagłówek sekcji: "MENTAL" z średnią
- ✅ **Bezpośrednio** pod nagłówkiem: tabela z umiejętnościami
- ✅ **Brak** podsekcji (żadnych fioletowo-różowych nagłówków)

---

### Scenariusz B: Sekcja Z podsekcjami

**Struktura:**
```
- Taktyczno/Techniczne (sekcja główna)
  - Atakowanie (podsekcja)
    - Ochrona piłki (umiejętność)
  - Obrona (podsekcja)
    - Pressing (umiejętność)
```

**Oczekiwany rezultat:**
- ✅ Nagłówek sekcji: "Taktyczno/Techniczne" z średnią (fiolet-niebieski)
- ✅ **NIE MA** tabeli bezpośrednio pod nagłówkiem głównym
- ✅ Zamiast tego: 2 podsekcje (fiolet-różowy):
  - "Atakowanie" z średnią + tabela z umiejętnościami
  - "Obrona" z średnią + tabela z umiejętnościami

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## Test 7: Średnie w kartach statystyk (globalne) 🌍

### Scenariusz: Weryfikacja globalnych statystyk

**Kroki:**
1. Wygeneruj raport
2. Sprawdź karty statystyk na górze (pod nagłówkiem)

**Oczekiwany rezultat:**

✅ **Karty statystyk pokazują średnią globalną** (nie zmieniły się):
- Ocena Zawodnika: średnia ze **WSZYSTKICH** umiejętności we **WSZYSTKICH** sekcjach
- Ocena Trenera: średnia ze **WSZYSTKICH** umiejętności we **WSZYSTKICH** sekcjach
- Ocena Zespołowa: średnia ze **WSZYSTKICH** umiejętności we **WSZYSTKICH** sekcjach

✅ **Średnie w sekcjach:**
- **Sekcja główna** = średnia ze wszystkich umiejętności w tej sekcji (włącznie z podsekcjami)
- **Podsekcja** = średnia tylko z umiejętności w tej podsekcji

**Przykład obliczeń:**
```
Struktura:
- MENTAL: Zaangażowanie=8, Koncentracja=6
- Taktyczne: Atak=7, Obrona=9

Globalna średnia zawodnika: (8+6+7+9)/4 = 7.50
Średnia sekcji MENTAL: (8+6)/2 = 7.00
Średnia sekcji Taktyczne: (7+9)/2 = 8.00
```

**Status:** ☐ Zaliczony ☐ Niezaliczony

---

## 📊 Podsumowanie Testów

### Podstawowe funkcje
- [ ] Test 1: Prosta struktura (tylko sekcje)
- [ ] Test 2: Hierarchia (sekcje + podsekcje)
- [ ] Test 3: Wszystkie typy ocen
- [ ] Test 4: Częściowo ocenione

### Wizualizacja
- [ ] Test 5: Kolorowanie nagłówków
- [ ] Test 6: Struktura z/bez podsekcji
- [ ] Test 7: Średnie globalne vs sekcyjne

**Ocena końcowa:** ☐ Wszystkie zaliczone ☐ Wymagane poprawki

---

## 🐛 Znalezione Błędy

### Błąd #1:
- **Opis:**
- **Priorytet:** ☐ Wysoki ☐ Średni ☐ Niski

### Błąd #2:
- **Opis:**
- **Priorytet:** ☐ Wysoki ☐ Średni ☐ Niski

---

## ✅ Checklist Wizualny

Podczas przeglądania raportu sprawdź:
- [ ] Sekcje główne mają gradient fiolet→niebieski
- [ ] Podsekcje mają gradient fiolet→różowy (inny kolor!)
- [ ] Średnie są po prawej stronie nagłówków
- [ ] Format średnich: "Z=X.XX | T=X.XX | Zesp=X.XX"
- [ ] Symbol "—" gdy brak ocen w kategorii
- [ ] Tabele są bezpośrednio pod nagłówkami (sekcje) lub podsekcjami
- [ ] Hierarchia jest wizualnie czytelna
- [ ] Wszystkie oceny mają właściwe kolory (czerwony/żółty/niebieski/zielony)

---

**Data testu:** ___________  
**Tester:** ___________  
**Wersja aplikacji:** 2.5.1  
**Funkcja testowana:** Hierarchia sekcji/podsekcji w raporcie
