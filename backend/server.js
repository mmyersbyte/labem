import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5555;

connectDB(process.env.MONGODB_URI); // meu tratamento de erro é direto no config/db.js

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
