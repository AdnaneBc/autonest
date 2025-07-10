import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  // Create users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@autonest.com',
      password,
      firstName: 'Amine',
      lastName: 'Admin',
    },
  });

  const employee = await prisma.user.create({
    data: {
      email: 'employee@autonest.com',
      password,
      firstName: 'Oussama',
      lastName: 'Employee',
    },
  });

  // Create agencies
  // Create agencies
  const casaAgency = await prisma.agency.create({
    data: {
      name: 'Autonest Casa',
      city: 'Casablanca',
      email: 'casa@autonest.com',
      subscriptionPlan: {
        connectOrCreate: {
          where: { id: 1 }, // or any unique field
          create: {
            name: 'Free Plan',
            maxUsers: 3,
            maxVehicles: 10,
            price: 0,
          },
        },
      },
    },
  });

  const rabatAgency = await prisma.agency.create({
    data: {
      name: 'Autonest Rabat',
      city: 'Rabat',
      email: 'rabat@autonest.com',
      subscriptionPlan: {
        connectOrCreate: {
          where: { id: 1 },
          create: {
            name: 'Free Plan',
            maxUsers: 3,
            maxVehicles: 10,
            price: 0,
          },
        },
      },
    },
  });
  // Link users to agencies with roles
  await prisma.agencyUser.createMany({
    data: [
      {
        userId: admin.id,
        agencyId: casaAgency.id,
        role: 'admin',
      },
      {
        userId: admin.id,
        agencyId: rabatAgency.id,
        role: 'admin',
      },
      {
        userId: employee.id,
        agencyId: casaAgency.id,
        role: 'employee',
      },
    ],
  });

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
