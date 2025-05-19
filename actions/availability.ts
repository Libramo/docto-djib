import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function createAvailability(dateTime: Date) {
  const session = await auth();

  if (!session?.user || session.user.role !== "DOCTOR") {
    throw new Error("Unauthorized");
  }

  const existingSlot = await prisma.availability.findFirst({
    where: {
      doctorId: session.user.id,
      dateTime: dateTime,
    },
  });

  if (existingSlot) {
    throw new Error("This slot already exists.");
  }

  const newAvailability = await prisma.availability.create({
    data: {
      doctorId: session.user.id,
      dateTime: dateTime,
    },
  });

  return newAvailability;
}
