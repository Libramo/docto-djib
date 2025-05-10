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
