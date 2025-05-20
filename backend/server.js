import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import connectDB from './src/config/db.js';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5555;

connectDB(process.env.MONGODB_URI);

// Configurações de middleware
app.use(
  cors({
    origin: ['https://www.labemunisul.com.br'],
    credentials: true,
  })
);
app.use(express.json());

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

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
