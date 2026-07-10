import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@smartcrops.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const adminName = process.env.ADMIN_NAME || 'Administrator';

  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    admin = await prisma.user.create({
      data: {
        fullName: adminName,
        email: adminEmail,
        password: passwordHash,
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    });
    console.log(`Created initial admin user: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  const telemetryCount = await prisma.telemetry.count();
  if (telemetryCount === 0) {
    await prisma.telemetry.createMany({
      data: [
        { key: 'solar', value: 4.2, source: 'sensor', userId: admin.id },
        { key: 'battery', value: 85, source: 'sensor', userId: admin.id },
        { key: 'moisture', value: 72, source: 'sensor', userId: admin.id },
        { key: 'temperature', value: 28, source: 'sensor', userId: admin.id },
      ],
    });
    console.log('Seeded initial telemetry values in the database.');
  } else {
    console.log('Telemetry seed already exists.');
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
