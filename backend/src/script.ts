import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';
import UserAdmin from './models/UserAdmin.js';

dotenv.config();

// Tipos para as credenciais dos usuários
interface UserCredentials {
  email: string;
  password: string;
}

// Validação de variáveis de ambiente
const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.error('ERRO: MONGODB_URI não encontrada no arquivo .env');
  process.exit(1);
}

// Configurações dos usuários de teste
const TEST_USERS: {
  ligante: UserCredentials;
  professor: UserCredentials;
} = {
  ligante: {
    email: 'ligante@example.com',
    password: '123456',
  },
  professor: {
    email: 'professor@example.com',
    password: 'admin123',
  },
};

async function createUsers(): Promise<void> {
  try {
    console.log(' Conectando ao MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log(' Conectado com sucesso!\n');

    // Verificar se já existem usuários
    const existingUsers: number = await User.countDocuments();
    const existingAdmins: number = await UserAdmin.countDocuments();

    if (existingUsers > 0 || existingAdmins > 0) {
      console.log(' Usuários já existem no banco de dados.');
      console.log('  Removendo usuários existentes...\n');
      await Promise.all([User.deleteMany({}), UserAdmin.deleteMany({})]);
    }

    console.log('Criando usuários de teste...\n');

    // Hash das senhas
    const [hashedPassword, hashedAdminPassword] = await Promise.all([
      bcrypt.hash(TEST_USERS.ligante.password, 10),
      bcrypt.hash(TEST_USERS.professor.password, 10),
    ]);

    // Criação dos usuários
    const userPromises = [
      new User({
        email: TEST_USERS.ligante.email,
        password: hashedPassword,
      }).save(),
      new UserAdmin({
        email: TEST_USERS.professor.email,
        password: hashedAdminPassword,
      }).save(),
    ];

    await Promise.all(userPromises);

    // Exibir credenciais
    console.log(' USUÁRIOS CRIADOS COM SUCESSO!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(' LIGANTE:');
    console.log(`    Email: ${TEST_USERS.ligante.email}`);
    console.log(`    Senha: ${TEST_USERS.ligante.password}`);
    console.log('');
    console.log('PROFESSOR:');
    console.log(`     Email: ${TEST_USERS.professor.email}`);
    console.log(`     Senha: ${TEST_USERS.professor.password}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log(
      ' Agora você pode iniciar o backend e simular login, upload de arquivos, etc...'
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('DEU RUIM!!:', errorMessage);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log(' Desconectado do MongoDB');
    process.exit(0);
  }
}

createUsers();
