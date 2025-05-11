// prisma/seed.ts
import { prisma } from "../lib/db";

const specialties = [
  "Cardiologie",
  "Dermatologie",
  "Pédiatrie",
  "Gynécologie",
  "Neurologie",
  "Psychiatrie",
  "Radiologie",
  "Orthopédie",
  "Ophtalmologie",
  "Médecine générale",
];

const statuses = ["liberal", "employed"];

async function specialitiesSeed() {
  console.log("🌱 Seeding specialties...");

  for (const name of specialties) {
    await prisma.specialty.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("✅ Specialties seeded");
}

async function statusesSeed() {
  for (const name of statuses) {
    await prisma.employmentStatus.upsert({
      where: { name },
      update: {}, // do nothing if exists
      create: { name },
    });
  }

  console.log("✅ Employment statuses seeded.");
}

specialitiesSeed().catch((err) => {
  console.error("❌ Error seeding specialities:", err);
});

statusesSeed().catch((err) => {
  console.error("❌ Error seeding statuses:", err);
});
