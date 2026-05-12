import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const prismaClientSingleton = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'bba_app',
    password: process.env.DB_PASSWORD || 'Sitamvan07!',
    database: process.env.DB_NAME || 'bba_db',
    port: parseInt(process.env.DB_PORT || '3306'),
    connectionLimit: 5
  });

  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
