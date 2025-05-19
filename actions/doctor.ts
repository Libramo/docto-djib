"use server";

import { prisma } from "@/lib/db";

export async function getSpecialties() {
  try {
    const specialities = await prisma.specialty.findMany();
    return specialities;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDoctors(query?: string) {
  try {
    const results = await prisma.user.findMany({
      where: {
        role: "DOCTOR",
        OR: [
          {
            name: {
              contains: query || "",
              mode: "insensitive",
            },
          },
          {
            doctorSpecialties: {
              some: {
                specialty: {
                  name: {
                    contains: query || "",
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        doctorSpecialties: {
          include: {
            specialty: true,
          },
        },
        availabilities: {
          include: {
            doctor: true,
          },
        },
      },
    });
    return results;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error; // Re-throw to handle in the component
  }
}
