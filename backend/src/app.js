import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import updatesRoutes from './routes/updates.js';
import encontrosRoutes from './routes/encontros.js';
import authAdminRoutes from './routes/authAdmin.js';
import swaggerRoute from './routes/swaggerRoute.js';
const app = express();

// Configuração de middlewares
const cors = require('cors');

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [/^https:\/\/(www\.)?labemunisul\.com\.br$/];

      if (!origin || allowedOrigins.some((regex) => regex.test(origin))) {
        return callback(null, true);
      }

      return callback(new Error('Não permitido pelo CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware para processamento de JSON
app.use(express.json());
// Middleware para processamento de forms urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/updates', updatesRoutes);
app.use('/api/encontros', encontrosRoutes);
app.use('/api/admin', authAdminRoutes);
app.use(swaggerRoute);

export default app;
