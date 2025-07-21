import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const password = await bcrypt.hash('password123', 10);

  // Create Superadmin
  const superadmin = await prisma.user.create({
    data: {
      email: 'superadmin@autonest.com',
      password,
      firstName: 'Super',
      lastName: 'Admin',
      birthDate: new Date('1980-01-01'),
      phone: '+212600000001',
      address: 'Headquarters',
    },
  });

  // Create Owner
  const owner = await prisma.user.create({
    data: {
      email: 'owner@autonest.com',
      password,
      firstName: 'Auto',
      lastName: 'Boss',
      birthDate: new Date('1990-01-01'),
      phone: '+212600000002',
      address: 'Casablanca, Morocco',
    },
  });

  // Create Agencies
  const agency1 = await prisma.agency.create({
    data: {
      name: 'Autonest Rabat',
    },
  });

  const agency2 = await prisma.agency.create({
    data: {
      name: 'Autonest Marrakech',
    },
  });

  // Link Owner to both Agencies
  await prisma.agencyUser.createMany({
    data: [
      {
        userId: owner.id,
        agencyId: agency1.id,
        role: UserRole.owner,
      },
      {
        userId: owner.id,
        agencyId: agency2.id,
        role: UserRole.owner,
      },
    ],
  });

  // Create Employees
  const employee1 = await prisma.user.create({
    data: {
      email: 'employee1@autonest.com',
      password,
      firstName: 'Ali',
      lastName: 'Worker',
      phone: '+212600000003',
    },
  });

  const employee2 = await prisma.user.create({
    data: {
      email: 'employee2@autonest.com',
      password,
      firstName: 'Sara',
      lastName: 'Helper',
      phone: '+212600000004',
    },
  });

  // Assign Employees to different Agencies
  await prisma.agencyUser.create({
    data: {
      userId: employee1.id,
      agencyId: agency1.id,
      role: UserRole.employee,
    },
  });

  await prisma.agencyUser.create({
    data: {
      userId: employee2.id,
      agencyId: agency2.id,
      role: UserRole.employee,
    },
  });

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
