import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding database...");

  // 1. Create a subscription plan
  const plan = await prisma.subscriptionPlan.create({
    data: {
      name: "Starter",
      price: 299,
      maxUsers: 3,
      maxVehicles: 10,
    },
  });

  // 2. Create an agency
  const agency = await prisma.agency.create({
    data: {
      name: "LocAuto Express",
      legal_name: "LocAuto Express SARL",
      ice: "002154789000036",
      rc: "134789-Casa",
      patente: "8450026",
      cnss: "6789001",
      address: "27, Rue Al Qods",
      city: "Casablanca",
      logo_url: "https://autonest.ma/logos/locauto.png",
      email: "contact@locauto.ma",
      phone: "+212661112233",
      subscriptionId: plan.id,
    },
  });

  // 3. Create an admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      firstName: "Youssef",
      lastName: "Admin",
      email: "admin@locauto.ma",
      password: hashedPassword,
      phone: "+212600112233",
      address: "Hay El Falah, Casablanca",
      role: "admin",
      agencyId: agency.id,
    },
  });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
