import express from 'express';
import cors from 'cors';
import session from 'express-session';
import multer from 'multer';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import updatesRoutes from './routes/updates.js';
import encontrosRoutes from './routes/encontros.js';
import authAdminRoutes from './routes/authAdmin.js';

const app = express();

// Configuração de middlewares
app.use(
  cors({
    origin: ['https://www.labemunisul.com.br', 'https://labemunisul.com.br'],
    credentials: true,
  })
);

// Middleware para processamento de JSON
app.use(express.json());

// Middleware para processamento de formulários urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: 'none',
    },
  })
);

app.use('/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api/updates', updatesRoutes);
app.use('/api/encontros', encontrosRoutes);
app.use('/api/admin', authAdminRoutes);

export default app;
