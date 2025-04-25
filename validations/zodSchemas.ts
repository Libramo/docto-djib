import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nom invalide",
  }),
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(2, { message: "Password too short " }),
  phone: z.string().min(6, { message: "Numéro de téléphone invalide" }),
  role: z.enum(["USER", "ADMIN", "DOCTOR"]),
});

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(2, { message: "Password too short " }),
});

// ✅ Extract types
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
