import { prisma } from '../src/utils/database-util';
import bcrypt from 'bcrypt';

async function main() {
  console.log(`Start seeding ...`);
  
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fasttray.com' },
    update: {
      password: adminPassword,
      role: 'ADMIN',
    },
    create: {
      name: 'Super Admin',
      email: 'admin@fasttray.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log(`Seeding finished. Admin user created/updated:`);
  console.log(`Email: ${admin.email}`);
  console.log(`Password: admin123`);
  console.log(`Role: ${admin.role}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
