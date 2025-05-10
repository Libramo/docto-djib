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

async function main() {
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

main().catch((err) => {
  console.error("❌ Error seeding database:", err);
});
