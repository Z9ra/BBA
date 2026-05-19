import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const prismaClientSingleton = () => {
  const dbUrl = new URL(
    process.env.DATABASE_URL ||
      'mysql://bba_app:Sitamvan07!@localhost:3306/bba_db?allowPublicKeyRetrieval=true&useSSL=false'
  );

  const isTiDB = dbUrl.hostname.includes('tidbcloud.com');

  const adapter = new PrismaMariaDb({
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port) || 3306,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace(/^\//, ''),
    connectionLimit: 5,
    connectTimeout: 20000, // Increase socket connect timeout to 20s for high-latency Vercel-to-TiDB Cloud connection
    allowPublicKeyRetrieval: true,
    // Enable SSL for TiDB Cloud
    ssl: isTiDB ? { minVersion: 'TLSv1.2' } : undefined,
  });

  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
