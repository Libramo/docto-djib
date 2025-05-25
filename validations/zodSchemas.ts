import { Gender, UserRole, User } from "@prisma/client";
import { z } from "zod";

const doctorStatuses = ["liberal", "employed"] as const;

export const registerFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Nom invalide",
    }),

    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(2, { message: "Password too short " }),
    phone: z.string().min(6, { message: "Numéro de téléphone invalide" }),
    role: z.nativeEnum(UserRole),
    specialty: z.string().optional(), // optional here, refined below
    doctorStatus: z.enum(doctorStatuses).optional(), // optional here, refined below
  })
  .refine(
    (data) => {
      if (data.role === "DOCTOR") {
        return !!data.specialty && data.specialty.length > 2;
      }
      return true;
    },
    {
      message: "La spécialité est requise pour les médecins.",
      path: ["specialty"], // error will show under the specialty field
    }
  )
  .refine(
    (data) => {
      if (data.role === "DOCTOR") {
        return !!data.doctorStatus;
      }
      return true;
    },
    {
      message: "Le statut du médecin est invalide ou manquant.",
      path: ["doctorStatus"],
    }
  );

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(2, { message: "Votre de passe est trop court" }),
});

export const profileSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  dateOfBirth: z.string().optional(),
  image: z.string().optional(),
});

// ✅ Extract types
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
