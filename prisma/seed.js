const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const bcrypt = require('bcryptjs');

const prismaClientSingleton = () => {
  const adapter = new PrismaMariaDb({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bba_db',
    port: 3306,
    connectionLimit: 5
  });

  return new PrismaClient({ adapter });
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

async function main() {
  // Hash password before storing
  const hashedPassword = await bcrypt.hash('admin123', 12);

  // Create/update admin user with hashed password
  const admin = await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: { password: hashedPassword },
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log(`Admin user updated with hashed password: ${admin.username}`);

  // Create default settings
  const settings = [
    { key: 'backgroundType', value: 'color' },
    { key: 'backgroundColor', value: '#050505' },
    { key: 'backgroundImageUrl', value: '' },
    { key: 'heroTitle', value: 'SOLUSI TEKNOLOGI UNTUK BISNIS ANDA' },
    { key: 'heroSubtitle', value: 'Membangun infrastruktur digital yang kuat, aman, dan efisien melalui perangkat lunak kustom dan integrasi jaringan terbaik.' },
    { key: 'aboutText', value: 'PT. Bersama Berdikari Abadi menyediakan layanan pengembangan perangkat lunak dan aplikasi profesional, menghadirkan alat digital seperti aplikasi seluler dan situs web melalui proses konsultasi, pengkodean, dan pengujian kualitas yang ketat.' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  // Create default projects
  const projects = [
    {
      name: 'ERP System PT. Maju Jaya',
      category: 'Software Development',
      client: 'PT. Maju Jaya',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      status: 'Completed',
    },
    {
      name: 'Network Infrastructure Setup',
      category: 'Networking',
      client: 'Rumah Sakit Sehat',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
      status: 'Completed',
    },
    {
      name: 'Company Profile Website',
      category: 'Web Development',
      client: 'Z9 Digital Solutions',
      imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop',
      status: 'Completed',
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: projects.indexOf(project) + 1 }, // Simple ID logic for seed
      update: project,
      create: project,
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
