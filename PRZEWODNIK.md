# Przewodnik: Hierarchiczna Struktura Umiejętności

## 📊 Jak działa system 4-poziomowy?

### Poziom 1 (Root) - Główne Kategorie
- **Przykład**: Technika, Taktyka, Motoryka, Mental
- Na tym poziomie widzisz szerokie obszary umiejętności
- **Wyniki**: Średnie z wszystkich podpoziomów

### Poziom 2 - Podkategorie
- **Przykład dla Mental**: Zaangażowanie, Koncentracja, Pewność siebie, itd.
- Kliknij nazwę kategorii na diagramie lub przycisk → aby wejść głębiej
- Tutaj możesz wypełniać ankiety bezpośrednio

### Poziom 3 - Szczegółowe Umiejętności
- Jeszcze bardziej szczegółowy podział
- Każda umiejętność z poziomu 2 może mieć własne podumiejętności

### Poziom 4 - Maksymalna Szczegółowość
- Najniższy poziom - tutaj nie można już tworzyć podpoziomów
- Idealne do bardzo szczegółowych ocen

## 🎯 Jak tworzyć hierarchię?

### 1. Dodawanie nowej umiejętności
```
1. Wpisz nazwę w pole "Nazwa umiejętności"
2. Kliknij "Dodaj"
3. Umiejętność pojawi się na liście i diagramie
```

### 2. Tworzenie podpoziomu
```
1. Znajdź umiejętność na liście
2. Kliknij zielony przycisk "+ Sub"
3. Zostaniesz przeniesiony do nowego poziomu
4. Dodaj tam nowe umiejętności
```

### 3. Nawigacja między poziomami
```
- Kliknij niebieski tekst na diagramie (kategorie z podpoziomami)
- Lub użyj przycisku → obok nazwy umiejętności
- Wróć: przycisk "Wstecz" lub ikona domu 🏠
```

## 📋 Wypełnianie ankiet

### Zasada kaskadowa
1. **Najlepiej zacząć od najniższych poziomów**
2. Wypełnij ankiety dla szczegółowych umiejętności
3. System automatycznie obliczy średnie dla wyższych poziomów

### Przykład przepływu pracy:
```
ROOT (Poziom 1)
└─ Mental (kliknij aby wejść)
   └─ Koncentracja Uwagi (kliknij "+ Sub" aby utworzyć podpoziomy)
      ├─ Koncentracja podczas treningu (wypełnij ankietę)
      ├─ Koncentracja podczas meczu (wypełnij ankietę)
      └─ Odporność na rozproszenia (wypełnij ankietę)
```

Średnia z tych 3 ankiet = wynik dla "Koncentracja Uwagi"  
Średnia wszystkich umiejętności w Mental = wynik dla "Mental" na poziomie ROOT

## 🎨 Wizualne wskazówki

- **Niebieski tekst** = ma podpoziomy, kliknij aby wejść
- **Czarny tekst** = brak podpoziomów
- **Badge "X pod"** = liczba podumiejętności
- **Zielony przycisk "+ Sub"** = utwórz nowy podpoziom

## 💡 Porady

1. **Planowanie struktury**: Najpierw zastanów się nad całą hierarchią przed wypełnianiem ankiet
2. **Konsystencja**: Staraj się mieć podobną liczbę umiejętności na każdym poziomie (4-8 jest optymalne dla czytelności wykresu)
3. **Nazewnictwo**: Używaj krótkich, jasnych nazw - będą wyświetlane na wykresie
4. **Backup**: Możesz pobrać SVG każdego poziomu jako dokumentację

## 🔄 Obliczanie średnich

### Automatyczne agregowanie:
- Jeśli wypełnisz ankiety na poziomie 3, wyniki pojawią się na poziomie 2 i 1
- Jeśli wypełnisz ankiety na różnych poziomach, system użyje najbardziej szczegółowych dostępnych danych
- Możesz wypełniać ankiety na dowolnym poziomie - nie musisz iść do najniższego

### Trzy perspektywy:
- 🔵 **Zawodnik** (niebieska linia) - samoocena
- 🟢 **Trener** (zielona linia) - ocena przez trenera  
- 🟠 **Zespół** (pomarańczowa linia) - średnia z wielu ankiet członków zespołu

## 📥 Eksport

Na każdym poziomie możesz:
- Pobrać SVG wykresu (przycisk "Pobierz SVG")
- Plik będzie zawierał nazwę poziomu w nazwie
