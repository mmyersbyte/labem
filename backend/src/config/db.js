import mongoose from 'mongoose';

export default async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
}
