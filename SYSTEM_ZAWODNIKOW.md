# Przewodnik: System Zarządzania Zawodnikami i Linki do Ankiet

## 👥 Zarządzanie Zawodnikami

### Dodawanie zawodnika
1. Na ekranie głównym kliknij **"Dodaj Zawodnika"**
2. Wpisz imię i nazwisko zawodnika
3. Kliknij **"Dodaj"**
4. Zawodnik pojawi się na liście z własnym profilem

### Otwieranie profilu
- Kliknij **"Otwórz Profil"** na karcie zawodnika
- Zobaczysz pełny diagram umiejętności i możliwość zarządzania strukturą
- Wszystkie zmiany są automatycznie zapisywane

### Usuwanie zawodnika
- Kliknij ikonę 🗑️ na karcie zawodnika
- Potwierdź usunięcie
- ⚠️ **UWAGA**: Wszystkie dane zostaną trwale usunięte!

## 🔗 System Linków do Ankiet

### Jak działają linki?

Każdy zawodnik ma **3 unikalne linki** do ankiet:
- 👤 **Zawodnik** - do samooceny
- 👨‍🏫 **Trener** - dla trenera
- 👥 **Zespół** - dla członków zespołu

### Generowanie linku

1. Na liście zawodników znajdź sekcję **"Linki do ankiet"**
2. Kliknij odpowiedni przycisk (Zawodnik/Trener/Zespół)
3. Link zostanie automatycznie **skopiowany do schowka**
4. Pojawi się potwierdzenie: "Link skopiowany do schowka!"

### Przykładowe linki

```
http://localhost:5173/?playerId=player-1234567890&survey=player
http://localhost:5173/?playerId=player-1234567890&survey=coach
http://localhost:5173/?playerId=player-1234567890&survey=team
```

### Wysyłanie linków

**Email:**
```
Cześć Jan,

Proszę wypełnij ankietę oceny umiejętności dla Adama Kowalskiego:
[WKLEJ LINK]

Dzięki!
```

**Messenger/WhatsApp:**
```
Hej! Wypełnij proszę ankietę dla Adama:
[WKLEJ LINK]
```

## 🎯 Jak to działa w praktyce?

### Scenariusz 1: Ocena zawodnika przez trenera

1. **Trener** dodaje zawodnika: "Adam Kowalski"
2. Kopiuje link dla trenera (👨‍🏫)
3. Otwiera link w innej zakładce
4. Wypełnia ankietę oceniając umiejętności
5. Zapisuje ankietę
6. Wraca do profilu zawodnika → **wyniki są już widoczne!**

### Scenariusz 2: Samoocena zawodnika

1. **Trener** kopiuje link dla zawodnika (👤)
2. Wysyła SMS/email do zawodnika
3. **Zawodnik** otwiera link na swoim urządzeniu
4. Wypełnia ankietę (samoocena)
5. Zapisuje
6. **Trener** widzi wyniki w profilu zawodnika

### Scenariusz 3: Ocena przez zespół

1. **Trener** kopiuje link dla zespołu (👥)
2. Wysyła link do 5 członków drużyny
3. Każdy członek wypełnia ankietę niezależnie
4. System automatycznie oblicza **średnią z wszystkich ocen zespołu**
5. Wszystkie 3 perspektywy widoczne na jednym wykresie

## 💾 Przechowywanie Danych

### localStorage
- Wszystkie dane zapisywane **lokalnie w przeglądarce**
- Nie wymaga serwera ani połączenia internetowego
- Dane są trwałe (nie giną po zamknięciu przeglądarki)

### Ważne informacje:
- ✅ Dane są **prywatne** - tylko w Twojej przeglądarce
- ✅ Nie są wysyłane do żadnego serwera
- ⚠️ Dane są **przypisane do przeglądarki** - nie synchronizują się między urządzeniami
- ⚠️ Wyczyszczenie danych przeglądarki **usuwa wszystko**

### Backup danych:
Niestety obecnie nie ma automatycznego backupu. Planowane funkcje:
- Export danych do JSON
- Import danych z pliku
- Synchronizacja chmurowa (przyszła wersja)

## 🔐 Prywatność i Bezpieczeństwo

### Czy dane są bezpieczne?
- ✅ Tak - wszystko działa lokalnie
- ✅ Brak wysyłania danych przez internet
- ✅ Brak rejestracji/logowania

### Czy linki są bezpieczne?
- ⚠️ Linki zawierają ID zawodnika
- ⚠️ Każdy z linkiem może wypełnić ankietę
- ⚠️ Nie wysyłaj linków publicznie

### Dobre praktyki:
1. **Nie udostępniaj linków publicznie** (np. na social media)
2. **Wysyłaj linki bezpośrednio** konkretnym osobom
3. **Regularnie rób kopie zapasowe** (screenshot wyników)
4. **Używaj jednej przeglądarki** dla spójności danych

## 📊 Interpretacja Wyników

### Kolory na wykresie:
- 🔵 **Niebieski** - ocena zawodnika (samoocena)
- 🟢 **Zielony** - ocena trenera
- 🟠 **Pomarańczowy** - średnia ocen zespołu

### Legenda:
- **"Zawodnik"** - bezpośrednia ocena
- **"Zawodnik (średnia)"** - obliczona z podpoziomów

### Przykład odczytu:
```
Mental:
- Zawodnik: 7.5 (samoocena)
- Trener: 6.0 (ocena trenera)
- Zespół: 6.8 (średnia z 5 ankiet kolegów)

Interpretacja: Zawodnik ocenia siebie wyżej niż inni
```

## 🆘 Rozwiązywanie Problemów

### Nie widzę zapisanych danych
- Sprawdź czy używasz tej samej przeglądarki
- Sprawdź czy nie włączony tryb incognito
- Sprawdź czy nie wyczyszczono danych przeglądarki

### Link nie działa
- Sprawdź czy link jest kompletny (z ?playerId=...)
- Sprawdź czy zawodnik nie został usunięty
- Spróbuj odświeżyć stronę (F5)

### Dane się nie zapisują
- Sprawdź czy przeglądarka zezwala na localStorage
- Sprawdź czy dysk nie jest pełny
- Sprawdź konsolę przeglądarki (F12) pod kątem błędów

## 💡 Wskazówki Pro

1. **Organizacja**: Twórz zawodników w alfabetycznej kolejności nazw
2. **Nazewnictwo**: Używaj pełnych imion i nazwisk
3. **Dokumentacja**: Rób screenshoty ważnych wykresów
4. **Testy**: Przed wysłaniem linków przetestuj je sam
5. **Backup**: Co tydzień rób kopię ekranu listy zawodników

## 🚀 Przyszłe Funkcje (Roadmap)

Planowane ulepszenia:
- [ ] Export/Import danych JSON
- [ ] Porównywanie zawodników
- [ ] Historia zmian w czasie
- [ ] Raporty PDF
- [ ] Synchronizacja w chmurze
- [ ] Aplikacja mobilna
- [ ] System powiadomień
- [ ] Autoryzacja dla linków
