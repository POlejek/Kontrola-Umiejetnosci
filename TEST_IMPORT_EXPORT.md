# 🧪 Testowanie Importu/Exportu Struktury

## Szybki Test Funkcjonalności

### 📥 Test Importu

1. **Pobierz przykładowy plik:**
   - W repozytorium znajdziesz plik: `przykladowa-struktura-import.json`
   - Zawiera on 3 nowe kategorie umiejętności:
     - MENTAL (Rozszerzone) - 3 umiejętności
     - Technika Zaawansowana - 3 umiejętności  
     - Sprawność Fizyczna - 4 umiejętności

2. **Zaimportuj strukturę:**
   ```
   Otwórz aplikację → Edytuj Strukturę Umiejętności
   → Kliknij "Importuj Strukturę"
   → Wybierz plik przykladowa-struktura-import.json
   → Potwierdź
   → Kliknij "Zapisz zmiany"
   ```

3. **Sprawdź efekt:**
   - Otwórz profil dowolnego zawodnika
   - Przejdź do ankiety (np. ankieta trenera)
   - Zobaczysz **10 nowych pytań** oznaczonych **CZERWONYM** kolorem
   - Każde będzie miało domyślną wartość 5
   - Nad każdym będzie napis: 🔴 NOWA - WYMAGA OCENY

4. **Oceń i zapisz:**
   - Zmień kilka wartości (lub zostaw 5)
   - Kliknij "Zapisz Ankietę"
   - Otwórz ankietę ponownie
   - **Czerwone zniknęło!** ✅ Umiejętności są teraz ocenione

### 📤 Test Exportu

1. **Po zaimportowaniu powyższej struktury:**
   ```
   Edytuj Strukturę Umiejętności
   → Kliknij "Eksportuj Strukturę"
   → Plik zostanie zapisany na dysku
   ```

2. **Sprawdź plik:**
   - Otwórz go w edytorze tekstu
   - Powinieneś zobaczyć JSON ze strukturą
   - **Brak ocen zawodników** - tylko hierarchia!

3. **Możesz go wysłać innemu trenerowi:**
   - Email, Messenger, Google Drive, etc.
   - Drugi trener zaimportuje go u siebie
   - Dostanie dokładnie taką samą strukturę

---

## 🔴 Co Testować - Checklist

### Import Struktury:
- [ ] Plik JSON importuje się poprawnie
- [ ] Nowe kategorie pojawiają się w edytorze
- [ ] Po zapisaniu - nowe kategorie w profilach zawodników
- [ ] Nowe umiejętności są CZERWONE w ankietach
- [ ] Stare oceny są zachowane (nie zginęły)
- [ ] Domyślna wartość nowych to 5

### Czerwone Oznaczenie:
- [ ] Pytanie ma czerwone tło
- [ ] Napis "🔴 NOWA - WYMAGA OCENY" widoczny
- [ ] Suwak jest czerwony (accent-red-600)
- [ ] Wartość liczbowa jest czerwona
- [ ] Po zapisaniu ankiety - czerwone ZNIKA
- [ ] Po ponownym otwarciu - już bez czerwonego

### Export Struktury:
- [ ] Przycisk "Eksportuj Strukturę" działa
- [ ] Plik zapisuje się na dysk
- [ ] Nazwa pliku: `struktura-umiejetnosci-YYYY-MM-DD.json`
- [ ] JSON jest poprawny (można otworzyć w edytorze)
- [ ] Zawiera tylko strukturę (brak danych zawodników)

### Zachowanie Ocen:
- [ ] Stare oceny NIE znikają po imporcie
- [ ] Tylko nowe umiejętności są nieocenione
- [ ] Średnie na diagramach są poprawne
- [ ] Historia zespołowa zachowana

---

## 🐛 Możliwe Problemy i Rozwiązania

### Problem: Czerwone nie znika po zapisaniu
**Rozwiązanie:** Sprawdź czy:
- Kliknąłeś "Zapisz Ankietę" (nie "Anuluj")
- Ankieta faktycznie się zapisała (sprawdź localStorage)
- Odświeżyłeś stronę po zapisaniu

### Problem: Import nie działa
**Rozwiązanie:** Sprawdź czy:
- Plik ma właściwy format JSON
- Plik zawiera pole `"type": "skill-structure"`
- Plik nie jest uszkodzony (otwórz w edytorze)
- Kliknąłeś "Zapisz zmiany" po imporcie

### Problem: Stare oceny zniknęły
**Rozwiązanie:**
- To nie powinno się zdarzyć - błąd!
- Przywróć backup z "Eksportuj Dane"
- Zgłoś problem

---

## 📊 Porównanie Dwóch Eksportów

| Co eksportować | "Eksportuj Dane" | "Eksportuj Strukturę" |
|----------------|------------------|----------------------|
| **Lokalizacja** | Główny ekran | W edytorze struktury |
| **Kolor przycisku** | Zielony | Zielony |
| **Zawiera zawodników** | ✅ TAK | ❌ NIE |
| **Zawiera oceny** | ✅ TAK | ❌ NIE |
| **Zawiera strukturę** | ✅ TAK | ✅ TAK |
| **Rozmiar pliku** | Duży | Mały |
| **Cel** | Backup | Współdzielenie |

---

## 🎯 Scenariusz Testowy - Krok po Kroku

### Przygotowanie (5 min):
1. Otwórz aplikację w przeglądarce
2. Dodaj testowego zawodnika (np. "Jan Kowalski")
3. Wypełnij kilka ocen w podstawowej strukturze
4. Sprawdź diagram - zapisz screenshot

### Import (5 min):
1. Pobierz `przykladowa-struktura-import.json`
2. Edytor → Importuj Strukturę
3. Potwierdź i zapisz
4. Sprawdź edytor - czy są nowe kategorie?

### Weryfikacja Czerwonego (10 min):
1. Otwórz profil "Jan Kowalski"
2. Kliknij ankietę trenera
3. Przewiń w dół - znajdź czerwone pytania
4. Zrób screenshot (dla dokumentacji)
5. Zmień kilka wartości
6. Zapisz ankietę
7. Otwórz ponownie - czerwone zniknęło?

### Export (3 min):
1. Edytor → Eksportuj Strukturę
2. Otwórz plik w edytorze tekstu
3. Sprawdź czy NIE ma danych Jana Kowalskiego
4. Sprawdź czy JEST struktura

### Re-Import (Bonus):
1. Zrób kopię aktualnego stanu
2. Zaimportuj własny wyeksportowany plik
3. Sprawdź czy wszystko się zgadza
4. Porównaj z kopią

---

## ✅ Test Zakończony Sukcesem Gdy:

- [x] Import działa bez błędów
- [x] Nowe umiejętności są czerwone
- [x] Stare oceny zachowane
- [x] Po zapisaniu ankiety czerwone znika
- [x] Export tworzy poprawny plik
- [x] Re-import działa
- [x] Żadne dane nie zginęły

---

**Powodzenia w testowaniu!** 🚀

Jeśli znajdziesz błąd - zgłoś issue na GitHub!
