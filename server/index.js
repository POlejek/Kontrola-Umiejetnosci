import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Kontrola Umiejętności Server v3.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.get('/api', (req, res) => {
  res.json({
    message: 'Kontrola Umiejętności API v3.0',
    endpoints: {
      auth: '/api/auth',
      players: '/api/players',
      skills: '/api/skills',
      surveys: '/api/surveys'
    }
  });
});

// TODO: Import routes
// import authRoutes from './routes/auth.js';
// import playerRoutes from './routes/players.js';
// import skillRoutes from './routes/skills.js';
// import surveyRoutes from './routes/surveys.js';

// app.use('/api/auth', authRoutes);
// app.use('/api/players', playerRoutes);
// app.use('/api/skills', skillRoutes);
// app.use('/api/surveys', surveyRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Coś poszło nie tak!',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});
