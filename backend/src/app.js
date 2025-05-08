import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import updatesRoutes from './routes/updates.js';
import session from 'express-session';
import encontrosRoutes from './routes/encontros.js';
import authAdminRoutes from './routes/authAdmin.js';

const app = express();
const PORT = process.env.PORT || 5555;

dotenv.config();
connectDB(process.env.MONGODB_URI);

app.use(
  cors({
    origin: [
      'https://www.labemunisul.com.br',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  })
);
app.use(express.json());

// Configuração do express-session usando a chave secreta do .env
// SESSION_SECRET deve ser única e nunca compartilhada publicamente
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Chave secreta vinda do .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // obrigatório para HTTPS
      sameSite: 'none', // obrigatório para cross-domain
    },
  })
);

app.use('/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api/updates', updatesRoutes);
app.use('/api/encontros', encontrosRoutes);
app.use('/api/admin', authAdminRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
