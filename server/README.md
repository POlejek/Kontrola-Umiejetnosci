# 🚀 Backend Server - Kontrola Umiejętności v3.0

Backend API dla systemu kontroli umiejętności z autoryzacją, bazą danych i zarządzaniem użytkownikami.

## 📦 Technologie

- **Node.js** + **Express** - Backend framework
- **MongoDB** + **Mongoose** - Baza danych
- **JWT** - Autoryzacja
- **bcryptjs** - Hashowanie haseł

## 🛠️ Instalacja

```bash
cd server
npm install
```

## ⚙️ Konfiguracja

1. Skopiuj `.env.example` do `.env`:
```bash
cp .env.example .env
```

2. Edytuj `.env` i ustaw swoje wartości:
```env
MONGODB_URI=mongodb://localhost:27017/kontrola-umiejetnosci
JWT_SECRET=twoj-super-tajny-klucz
PORT=3000
```

## 🚀 Uruchomienie

### Tryb deweloperski (z auto-reload):
```bash
npm run dev
```

### Tryb produkcyjny:
```bash
npm start
```

Server będzie dostępny na: `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Autentykacja (TODO)
```
POST /api/auth/register - Rejestracja użytkownika
POST /api/auth/login - Logowanie
POST /api/auth/logout - Wylogowanie
GET  /api/auth/me - Pobierz dane zalogowanego użytkownika
```

### Zawodnicy (TODO)
```
GET    /api/players - Lista zawodników
GET    /api/players/:id - Szczegóły zawodnika
POST   /api/players - Dodaj zawodnika
PUT    /api/players/:id - Edytuj zawodnika
DELETE /api/players/:id - Usuń zawodnika
```

### Umiejętności (TODO)
```
GET    /api/skills - Pobierz strukturę umiejętności
PUT    /api/skills - Aktualizuj strukturę umiejętności
```

### Ankiety (TODO)
```
GET    /api/surveys/:playerId - Lista ankiet zawodnika
POST   /api/surveys - Zapisz ankietę
GET    /api/surveys/:playerId/reports - Generuj raport
```

## 🗄️ Struktura Bazy Danych (TODO)

### Kolekcje:
- `users` - Użytkownicy (trenerzy, zawodnicy)
- `organizations` - Organizacje/kluby
- `players` - Zawodnicy
- `skillTrees` - Struktury umiejętności
- `surveys` - Wypełnione ankiety
- `ratings` - Oceny umiejętności

## 🔐 Bezpieczeństwo

- Hasła hashowane z bcryptjs
- Autoryzacja JWT
- CORS skonfigurowany
- Walidacja danych wejściowych
- Rate limiting (TODO)

## 📝 TODO

- [ ] Implementacja autentykacji JWT
- [ ] Modele Mongoose dla bazy danych
- [ ] CRUD endpoints dla zawodników
- [ ] System ról (admin/trener/zawodnik)
- [ ] Websockets dla real-time updates
- [ ] Upload plików (zdjęcia zawodników)
- [ ] Eksport raportów PDF
- [ ] Email notifications
- [ ] Rate limiting
- [ ] API documentation (Swagger)

## 🧪 Testowanie

```bash
# TODO: Dodać testy
npm test
```

## 📦 Deployment

### Docker (TODO)
```bash
docker build -t kontrola-umiejetnosci-server .
docker run -p 3000:3000 kontrola-umiejetnosci-server
```

### PM2 (produkcja)
```bash
npm install -g pm2
pm2 start index.js --name kontrola-server
pm2 save
```

## 🤝 Integracja z Frontendem

Frontend (Vite) jest skonfigurowany z proxy do backendu:
```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true
  }
}
```

Wszystkie requesty do `/api/*` będą przekierowane do backendu.
