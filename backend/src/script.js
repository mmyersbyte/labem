import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';
import UserAdmin from './models/UserAdmin.js';

dotenv.config();

async function createUsers() {
  try {
    console.log(' Conectando ao MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' Conectado com sucesso!\n');

    // Verificar se já existem usuários
    const existingUsers = await User.countDocuments();
    const existingAdmins = await UserAdmin.countDocuments();

    if (existingUsers > 0 || existingAdmins > 0) {
      console.log('Usuários já existem no banco de dados.');
      console.log('  Removendo usuários existentes...\n');
      await User.deleteMany({});
      await UserAdmin.deleteMany({});
    }

    console.log(' Criando usuários de teste...\n');

    // Usuário ligante
    const hashedPassword = await bcrypt.hash('123456', 10);
    const user = new User({
      email: 'ligante@example.com',
      password: hashedPassword,
    });
    await user.save();

    // Usuário admin
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const admin = new UserAdmin({
      email: 'professor@example.com',
      password: hashedAdminPassword,
    });
    await admin.save();

    console.log(' USUÁRIOS CRIADOS COM SUCESSO!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('LIGANTE:');
    console.log('    Email: ligante@example.com');
    console.log('    Senha: 123456');
    console.log('');
    console.log('PROFESSOR:');
    console.log('    Email: professor@example.com');
    console.log('    Senha: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log(
      'Agora você pode iniciar o backend e simular login, upload de arquivos, etc...'
    );
  } catch (error) {
    console.error(' ERRO:', error.message);
    process.exit(1);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
}

createUsers();
