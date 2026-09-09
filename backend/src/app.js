const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Basic route
app.get('/', (req, res) => {
  res.send('SkillPulse API is running...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const traineeRoutes = require('./routes/traineeRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const consentRoutes = require('./routes/consentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/trainees', traineeRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/consent', consentRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
