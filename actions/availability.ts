"use server";
import { prisma } from "@/lib/db";

// export async function createAvailability(dateTime: Date) {
//   const session = await auth();

//   if (!session?.user || session.user.role !== "DOCTOR") {
//     throw new Error("Unauthorized");
//   }

//   const existingSlot = await prisma.availability.findFirst({
//     where: {
//       doctorId: session.user.id,
//       startDate: dateTime,
//     },
//   });

//   if (existingSlot) {
//     throw new Error("This slot already exists.");
//   }

//   const newAvailability = await prisma.availability.create({
//     data: {
//       endDate: dateTime,
//       doctorId: session.user.id,
//       startDate: dateTime,
//     },
//   });

//   return newAvailability;
// }

export async function addAvailability(
  title: string,
  start: Date,
  end: Date,
  doctorId: string
) {
  console.log("OOOOOOOOOOOOOOOOOO", title);

  try {
    const newAvailability = await prisma.availability.create({
      data: {
        title,
        startDate: start,
        endDate: end,
        doctorId,
      },
    });

    return newAvailability;
  } catch (error) {
    console.error("Error adding availability:", error);
    throw new Error("Error adding availability");
  }
}
