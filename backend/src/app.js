import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 5555;

dotenv.config();
connectDB(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', contactRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
