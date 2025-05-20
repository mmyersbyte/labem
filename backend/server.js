import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5555;

connectDB(process.env.MONGODB_URI);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
