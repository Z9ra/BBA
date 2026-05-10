const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const adapter = new PrismaMariaDb({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bba_db',
  port: 3306,
  connectionLimit: 5
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const projects = await prisma.project.findMany();
  console.log('--- ALL PROJECTS ---');
  console.log(JSON.stringify(projects, null, 2));
  
  const customSections = await prisma.customSection.findMany();
  console.log('--- CUSTOM SECTIONS ---');
  console.log(JSON.stringify(customSections, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
