# Import/Export Struktury Umiejętności

## 📋 Przegląd funkcjonalności

System umożliwia teraz **udostępnianie struktury umiejętności** między trenerami bez konieczności przekazywania całych profili zawodników.

---

## 🎯 Jak to działa?

### 1️⃣ **Eksport struktury umiejętności**

Trener, który opracował strukturę umiejętności może ją wyeksportować:

1. Przejdź do **"Edytuj Strukturę Umiejętności (Trener)"**
2. Kliknij przycisk **"Eksportuj Strukturę"** (zielony)
3. Plik JSON zostanie zapisany na Twoim komputerze

**Plik zawiera:**
- ✅ Całą hierarchię umiejętności (wszystkie poziomy)
- ✅ Nazwy wszystkich kategorii i podkategorii
- ❌ **NIE zawiera** ocen zawodników (tylko struktura!)

---

### 2️⃣ **Import struktury umiejętności**

Inny trener może zaimportować otrzymaną strukturę:

1. Przejdź do **"Edytuj Strukturę Umiejętności (Trener)"**
2. Kliknij przycisk **"Importuj Strukturę"** (pomarańczowy)
3. Wybierz plik JSON otrzymany od innego trenera
4. Potwierdź import
5. Kliknij **"Zapisz zmiany"** aby zastosować

---

## 🔴 Oznaczanie nowych umiejętności

Po zaimportowaniu nowej struktury lub dodaniu nowych umiejętności:

### **Automatyczne oznaczanie:**
- Wszystkie **nowe umiejętności** są automatycznie dodawane do profili zawodników
- Otrzymują **domyślną ocenę 5**
- Są **podświetlone NA CZERWONO** w ankietach

### **Widok w ankiecie:**
```
🔴 NOWA - WYMAGA OCENY
```
- Czerwone tło pytania
- Czerwony pasek suwaka
- Czerwona wartość liczbowa
- Wyraźny napis informujący o nieocenionej umiejętności

### **Usunięcie oznaczenia:**
Czerwone podświetlenie **znika automatycznie** po:
1. Otwarciu ankiety (Zawodnik, Trener lub Zespół)
2. Zapisaniu ankiety (przycisk "Zapisz Ankietę")

---

## 💡 Przypadki użycia

### **Scenariusz 1: Współpraca trenerów**
1. **Trener A** opracowuje szczegółową strukturę umiejętności
2. Eksportuje ją do pliku JSON
3. Wysyła plik **Trenerowi B** (email, cloud, USB)
4. **Trener B** importuje strukturę
5. Nowe umiejętności są czerwone - łatwo je zauważyć
6. Trener B ocenia zawodników w nowych kategoriach

### **Scenariusz 2: Aktualizacja standardów klubowych**
1. Klub opracowuje nowy standard oceny
2. Trener główny eksportuje zaktualizowaną strukturę
3. Wszyscy trenerzy importują nową strukturę
4. Czerwone oznaczenie pokazuje, które obszary wymagają oceny
5. Stopniowo wszyscy uzupełniają oceny

### **Scenariusz 3: Migracja zawodników między zespołami**
1. Zawodnik ma już profil z ocenami
2. Nowy trener ma rozszerzoną strukturę umiejętności
3. Import dodaje nowe kategorie (czerwone)
4. Stare oceny są zachowane
5. Trener ocenia tylko nowe obszary (czerwone)

---

## 🔧 Szczegóły techniczne

### **Format pliku eksportu struktury:**
```json
{
  "version": "1.0",
  "type": "skill-structure",
  "exportDate": "2025-12-04T...",
  "structure": {
    "id": "root",
    "title": "Profil Zawodnika",
    "skills": [...]
  }
}
```

### **Mechanizm oznaczania:**
```javascript
// Nowa umiejętność w ratings:
{
  "skill-id": {
    "player": { "value": 5, "unrated": true },
    "coach": { "value": 5, "unrated": true },
    "team": []
  }
}

// Po zapisaniu ankiety (unrated znika):
{
  "skill-id": {
    "player": { "value": 7, "timestamp": "..." },
    "coach": { "value": 8, "timestamp": "..." },
    "team": []
  }
}
```

---

## ⚠️ Ważne uwagi

1. **Import struktury NIE usuwa istniejących umiejętności** - tylko dodaje nowe
2. **Wszystkie dotychczasowe oceny są zachowane**
3. **Czerwone oznaczenie to tylko wskazówka wizualna** - nie blokuje użytkowania
4. **Jeden zapis ankiety usuwa oznaczenie** - nawet jeśli nie zmienisz wartości
5. **Format pliku: tylko JSON** ze strukturą (nie cały backup!)

---

## 📊 Różnice między typami eksportu

| Funkcja | **Eksportuj Dane** | **Eksportuj Strukturę** |
|---------|-------------------|------------------------|
| Zawodnicy | ✅ TAK | ❌ NIE |
| Oceny | ✅ TAK | ❌ NIE |
| Struktura | ✅ TAK | ✅ TAK |
| Cel użycia | Backup całego systemu | Współdzielenie struktury |
| Przycisk | Zielony (główny widok) | Zielony (w edytorze) |

---

## 🎨 Interfejs użytkownika

### **Przyciski w edytorze struktury:**
```
┌─────────────────────────────────────────────┐
│ [💾 Zapisz]  [⬇️ Eksportuj]  [⬆️ Importuj] │
└─────────────────────────────────────────────┘
```

### **Widok ankiety z nową umiejętnością:**
```
┌────────────────────────────────────────────┐
│ 🔴 NOWA - WYMAGA OCENY                     │
│                                            │
│ #2.5 Gubienie krycia                      │
│                                            │
│ 1 [=========●======] 10     [7]           │
└────────────────────────────────────────────┘
```

---

## 🚀 Workflow krok po kroku

### **Dla eksportującego trenera:**
1. Otwórz edytor struktury
2. Kliknij "Eksportuj Strukturę"
3. Zapisz plik (np. `struktura-umiejetnosci-2025-12-04.json`)
4. Prześlij plik innemu trenerowi

### **Dla importującego trenera:**
1. Otrzymaj plik JSON
2. Otwórz edytor struktury
3. Kliknij "Importuj Strukturę"
4. Wybierz plik
5. Przeczytaj komunikat potwierdzenia
6. Potwierdź import
7. Kliknij "Zapisz zmiany"
8. Otwórz profile zawodników
9. Nowe umiejętności są czerwone w ankietach
10. Wypełnij ankiety - czerwone oznaczenia znikną

---

## 📞 Wsparcie

W razie problemów sprawdź:
- Czy plik ma rozszerzenie `.json`
- Czy plik zawiera właściwą strukturę (`"type": "skill-structure"`)
- Czy przeglądarka nie blokuje pobierania plików
- Czy localStorage nie jest pełny (wyczyść stare dane)

---

**Wersja dokumentacji:** 1.0  
**Data ostatniej aktualizacji:** 4 grudnia 2025
