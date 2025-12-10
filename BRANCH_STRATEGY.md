# 📋 Strategia Branchów - Kontrola Umiejętności

## 🌳 Struktura Repozytoriów

To repozytorium używa strategii wielobranch do zarządzania różnymi wersjami aplikacji.

### **Branche:**

---

## 🌐 `v2.0-webserv` - Wersja GitHub Pages (Publiczna)

**Przeznaczenie:** Wersja statyczna aplikacji webowej bez backendu  
**Deployment:** Automatyczny na GitHub Pages  
**URL:** https://polejek.github.io/Kontrola-Umiejetnosci/

### Konfiguracja:
- **Base path:** `/Kontrola-Umiejetnosci/`
- **Storage:** localStorage (przeglądarka)
- **Workflow:** `.github/workflows/deploy.yml`
- **Dostęp:** Publiczny, bez logowania

### Funkcjonalności:
✅ Zarządzanie zawodnikami  
✅ Edytor struktury umiejętności  
✅ Ankiety ocen (zawodnik/trener/zespół)  
✅ Diagramy radarowe  
✅ Generowanie raportów HTML  
✅ Import/Export (JSON)  
✅ System wykrywania duplikatów  

---

## 🚀 `v3.0-server` - Wersja Serwerowa (Prywatna)

**Przeznaczenie:** Wersja z backendem, bazą danych i systemem logowania  
**Deployment:** Własny serwer (VPS/Cloud)  
**URL:** Do konfiguracji (np. https://your-domain.com)

### Konfiguracja:
- **Base path:** `/` (root)
- **Storage:** Baza danych (PostgreSQL/MongoDB)
- **Workflow:** `.github/workflows/deploy-server.yml`
- **Dostęp:** Wymaga logowania

### Planowane Funkcjonalności v3.0:
🔐 System logowania (JWT/OAuth)  
👥 Multi-tenancy (wiele klubów/organizacji)  
💾 Baza danych (PostgreSQL/MongoDB)  
🔄 Synchronizacja w czasie rzeczywistym  
📊 Zaawansowane raporty i analityka  
🎯 Role użytkowników (admin/trener/zawodnik)  
📧 Powiadomienia email  
🔒 Bezpieczeństwo i szyfrowanie danych  
📱 API REST dla aplikacji mobilnej  

---

## 📦 `main` - Branch Główny

**Przeznaczenie:** Branch bazowy/archiwalny  
**Status:** Podstawowa wersja aplikacji  

---

## 🔄 Workflow Pracy

### Praca z branchami:

```bash
# Przełącz się na wersję GitHub Pages
git checkout v2.0-webserv

# Przełącz się na wersję serwerową
git checkout v3.0-server

# Przenoszenie zmian między branchami (np. bugfix)
git checkout v3.0-server
git cherry-pick <commit-hash>
```

### Synchronizacja wspólnych zmian:

Jeśli naprawiasz bug lub dodajesz funkcję, która powinna być w obu wersjach:

1. Commituj na odpowiednim branchu
2. Użyj `git cherry-pick` do przeniesienia commita na drugi branch
3. Lub merge wspólne zmiany jeśli to sensowne

---

## 🚀 Deployment

### v2.0-webserv (GitHub Pages):
```bash
git push origin v2.0-webserv
# Automatyczny deploy przez GitHub Actions
```

### v3.0-server (Własny serwer):
```bash
git push origin v3.0-server
# Build przez GitHub Actions
# Ręczny deploy na serwer (do skonfigurowania)
```

---

## 📝 Rozwój

### Dodawanie funkcji tylko dla wersji serwerowej:
```bash
git checkout v3.0-server
# Twój kod...
git commit -m "feat: Dodano system logowania"
git push origin v3.0-server
```

### Dodawanie funkcji wspólnej dla obu wersji:
```bash
git checkout v2.0-webserv
# Twój kod...
git commit -m "fix: Naprawiono bug w ankietach"
git push origin v2.0-webserv

# Przenieś do wersji serwerowej
git checkout v3.0-server
git cherry-pick <commit-hash>
git push origin v3.0-server
```

---

## 🎯 Która wersja dla mnie?

| Potrzeba | Branch |
|----------|--------|
| Szybkie demo/prezentacja | `v2.0-webserv` |
| Brak własnego serwera | `v2.0-webserv` |
| Małe kluby/zespoły | `v2.0-webserv` |
| Produkcja z wieloma użytkownikami | `v3.0-server` |
| Bezpieczeństwo danych | `v3.0-server` |
| Integracja z innymi systemami | `v3.0-server` |

---

## 📞 Kontakt

Pytania? Otwórz issue na GitHubie!
